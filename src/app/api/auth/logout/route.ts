import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.json({ message: "로그아웃 되었습니다." }, { status: 200 });
    response.headers.set(
        "Set-Cookie",
        `access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${process.env.NODE_ENV === "production" ? "Secure; SameSite=None" : "SameSite=Lax"}`
    )

    return response;
}