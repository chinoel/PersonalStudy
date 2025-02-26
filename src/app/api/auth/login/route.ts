import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function generateToken(uuid: string, loginStay: boolean) {
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return new SignJWT({ uuid })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(loginStay ? "7d" : "1h")
    .sign(secret);
}

export async function POST(req: Request) {
    const { username, password, loginStay } = await req.json();

    const user = await prisma.users.findUnique({
        where: {
            user_id: username
        },
    });

    if (!user) {
        return NextResponse.json({ message: "아이디가 존재하지 않습니다."}, {status : 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: "비밀번호가 일치하지 않습니다."}, {status : 401});
    }

    const token = await generateToken(user.uuid, loginStay);

    const response = NextResponse.json({message: '로그인 성공' });
    response.headers.set(
        "Set-Cookie",
        `access_token=${token}; HttpOnly; Path=/; ${
          process.env.NODE_ENV === "production" ? "Secure; SameSite=None" : "SameSite=Lax"
        }`
    )

    return response;
}