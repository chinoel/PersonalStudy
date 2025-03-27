import { Session } from "next-auth";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import KakaoProvider, { KakaoProfile } from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { base64url } from "jose";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        UserData?: {
            id: string;
            name: string;
            email?: string;
            image?: string;
        };
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "user",
            name: "user",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: credentials?.username,
                        hashed_password: credentials?.password
                    }),
                })
                const user = await res.json()
                if (user) {
                    return {
                        id: user.uuid,
                        name: user.user_name,
                    }
                } else {
                    return null
                }
            }
        }),

        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.kakao_account.profile.nickname,
                    email: profile.kakao_account.email,
                    image: profile.kakao_account.profile.profile_image_url,
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 12 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            if (!user) {
                return false;
            }
            
            const existingUser = await prisma.users.findUnique({
                where: { user_id: user.id }
            });

            if (!existingUser) {
                await prisma.users.create({
                    data: {
                        user_id: user.id,
                        user_name: randomInt(100000, 999999).toString(),
                        hashed_password: base64url.encode(randomInt(100000, 999999).toString())
                    }
                })
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, account, user }) {
            if (user) {
                token.UserData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            }
            if (account) {
                token.accessToken = account.access_Token as string;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.accessToken = token.accessToken as string;

                session.UserData = token.UserData as {
                    id: string;
                    name: string;
                    email?: string;
                    image?: string;
                };
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };