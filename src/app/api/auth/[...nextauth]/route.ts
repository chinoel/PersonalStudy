import { Session } from "next-auth";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import KakaoProvider, { KakaoProfile } from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
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
                    return user
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
        async signIn({ profile }) {
            if (profile) {
                console.log((profile as KakaoProfile).id);
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_Token as string;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.accessToken = token.accessToken as string;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };