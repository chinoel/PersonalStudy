import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "err_secret");


// 루트 경로
const rootPaths = ['/'];
const adminPaths = ['/admin'];

export async function middleware(req: NextRequest) {

    // 로그인 사용자 분류
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('auth_token')?.value;

    // 루트 경로
    if (rootPaths.includes(pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // 관리자 경로
    if (adminPaths.includes(pathname)) {
        const token = req.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try {
            const decode = await jwtVerify(token, secret);

            // 관리자 확인
            if (decode.payload.isAdmin !== true) {
                return NextResponse.redirect(new URL('/unauthorized', req.url));
            }

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth/|static/|logo/).*)',
};