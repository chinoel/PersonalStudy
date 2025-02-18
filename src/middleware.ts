import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");

const publicPaths = ['/'];

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/|static/|logo/).*)',
};