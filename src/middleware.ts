import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch(err) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/SentenceStudy'],
};