import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/types";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");

// 비밀번호 변경
export async function PUT(req: Request) {
    try {
        const { password, newPassword } = await req.json();

        if (!password || !newPassword) {
            return NextResponse.json({ message: "비밀번호를 입력해주세요" }, { status: 400 });
        }

        const cookies = req.headers.get("Cookie");
        const token = cookies?.split('; ').find(c => c.startsWith('auth_token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
        }

        let username: string;
        try {
            const { payload } = await jwtVerify(
                token,
                secret
            );
            username = (payload as { username: string }).username;
        } catch (err) {
            console.log(err)
            return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
        }

        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User;

        if (!user) {
            return NextResponse.json({ message: "서버 오류" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, username);

        // 로그아웃
        const response = NextResponse.json({ message: '비밀번호가 변경되었습니다' });
        response.headers.set(
            "Set-Cookie",
            `auth_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${process.env.NODE_ENV === "production" ? "Secure; SameSite=None" : "SameSite=Lax"}`
        );

        return response;
        
    } catch (err) {
        return NextResponse.json({ message: "서버 오류" }, { status: 500 });
    }
}