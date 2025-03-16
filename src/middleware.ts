import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET || "err_secret";

// 루트 경로
const rootPaths = ['/'];
const adminPaths = ['/admin'];

export async function middleware(req: NextRequest) {

    // 로그인 사용자 분류
    const { pathname } = req.nextUrl;

    // 루트 경로 허용
    if (rootPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret });

    if (!token) {
        const redirectUrl = new URL('/auth/login', req.url);
        redirectUrl.searchParams.set('prevURL', encodeURIComponent(pathname));

        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/|static/|logo/).*)',
};