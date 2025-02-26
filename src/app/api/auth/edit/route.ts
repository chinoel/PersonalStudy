import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");

// 비밀번호 변경
export async function PUT(req: Request) {
    try {
        const { password, newPassword } = await req.json();

        if (!password || !newPassword) {
            return NextResponse.json({ message: "비밀번호를 입력해주세요" }, { status: 400 });
        }

        const cookies = req.headers.get("Cookie");
        const token = cookies?.split('; ').find(c => c.startsWith('access_token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
        }

        let uuid: string;
        try {
            const { payload } = await jwtVerify(
                token,
                secret
            );
            uuid = payload.uuid as string;
        } catch (err) {
            console.log(err)
            return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
        }

        console.log(uuid);
        const user = await prisma.users.findUnique({
            where: {
                uuid: uuid
            }
        });

        if (!user) {
            return NextResponse.json({ message: "서버 오류" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.users.update({
            where: {
                uuid: uuid
            },
            data: {
                hashed_password: hashedPassword
            }
        });

        // 로그아웃
        const response = NextResponse.json({ message: '비밀번호가 변경되었습니다' });
        response.headers.set(
            "Set-Cookie",
            `access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${process.env.NODE_ENV === "production" ? "Secure; SameSite=None" : "SameSite=Lax"}`
        );

        return response;
        
    } catch {
        return NextResponse.json({ message: "서버 오류" }, { status: 500 });
    }
}