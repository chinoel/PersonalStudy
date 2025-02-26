import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { username, password, display_name } = await req.json();

        // 빈 값 체크
        if (!username || !password || !display_name) {
            return NextResponse.json({ message: "필수 항목을 입력해주세요" }, { status: 400 });
        }

        // 중복 체크
        const userExist = await prisma.users.findUnique({
            where: {
                user_id: username
            }
        });
        
        if (userExist) {
            return NextResponse.json({ message: "이미 존재하는 아이디입니다." }, { status: 400 });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 회원가입
        await prisma.users.create({
            data: {
                user_id: username,
                hashed_password: hashedPassword,
                user_name: display_name
                 
            }
        });

        return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });

    } catch (err) {
        console.log("회원가입 오류 : " + err);
        return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
    }
}