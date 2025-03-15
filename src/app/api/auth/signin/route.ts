import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RequestBody {
    user_id: string;
    hashed_password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const user = await prisma.users.findFirst({
        where: {
            user_id: body.user_id,
        },
    })

    if (user && (await bcrypt.compare(body.hashed_password, user.hashed_password))) {
        const { hashed_password, ...userWithoutPass } = user;
        return new Response(JSON.stringify(userWithoutPass));
    }
    else {
        return new Response(JSON.stringify(null));
    }
}