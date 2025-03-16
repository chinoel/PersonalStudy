import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        let { kanji, kana, meaning, audio_url, level } = await req.json();

        if (!kanji || !kana || !meaning || !level) {
            return NextResponse.json({ message: "필수 항목을 입력해주세요" }, { status: 400 });
        }

        kanji = kanji.replace(/\s/g, "");
        kana = kana.replace(/\s/g, "");
        level = parseInt(level);

        const wordExist = await prisma.words.findUnique({
            where: {
                kanji: kanji
            }
        });

        if (wordExist) {
            return NextResponse.json({ message: "이미 존재하는 단어입니다." }, { status: 400 });
        }

        await prisma.words.create({
            data: {
                kanji: kanji,
                kana: kana,
                meaning: meaning,
                audio_url: audio_url,
                level: level
            }
        });

        return NextResponse.json({ message: "단어 추가 성공" }, { status: 201 });
    } catch (err) {
        console.log("단어 추가 오류 : " + err);
        return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
    }
}