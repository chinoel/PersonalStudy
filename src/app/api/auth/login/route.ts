import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { username, password } = await req.json();
    const secret = process.env.JWT_SECRET || "err_secret";

    // 인증 로직
    interface User {
        username: string;
        password: string;
        display_name: string;
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User;

    if (!user) {
        return NextResponse.json({ message: "아이디가 존재하지 않습니다."}, {status : 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: "비밀번호가 일치하지 않습니다."}, {status : 401});
    }

    const token = jwt.sign({ username }, secret , { expiresIn: '1h' });

    const response = NextResponse.json({message: '로그인 성공' });
    response.cookies.set('auth_token', token, { httpOnly: true, path: '/' });

    return response;
}