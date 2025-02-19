import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "@/lib/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");

async function generateToken(username: string, loginStay: boolean, isAdmin: boolean) {
    return new SignJWT({ username, isAdmin })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(loginStay ? "7d" : "1h")
    .sign(secret);
}

export async function POST(req: Request) {
    const { username, password, loginStay } = await req.json();

    // 인증 로직
    interface User {
        id: number;
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

    const admin = db.prepare('SELECT * FROM admins WHERE user_id = ?').get(user.id);
    const isAdmin = !!admin;

    const token = await generateToken(username, loginStay, isAdmin);

    const response = NextResponse.json({message: '로그인 성공' });
    response.headers.set(
        "Set-Cookie",
        `auth_token=${token}; HttpOnly; Path=/; ${
          process.env.NODE_ENV === "production" ? "Secure; SameSite=None" : "SameSite=Lax"
        }`
    )

    return response;
}