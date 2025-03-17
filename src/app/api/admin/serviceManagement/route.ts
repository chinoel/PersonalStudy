import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { kanji, kana, meaning, audio_url, level } = await req.json();

        if (!kanji || !kana || !meaning || !level) {
            return NextResponse.json({ message: "필수 항목을 입력해주세요" }, { status: 400 });
        }

        const fixKanji = kanji.replace(/\s/g, "");
        const fixKana = kana.replace(/\s/g, "");
        const fixLevel = parseInt(level);

        const wordExist = await prisma.words.findUnique({
            where: {
                kanji: kanji
            }
        });

        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/.test(fixKanji)) {
            return NextResponse.json({ message: "한글 또는 영어는 입력할 수 없습니다." }, { status: 400 });
        }

        if (wordExist) {
            return NextResponse.json({ message: "이미 존재하는 단어입니다." }, { status: 400 });
        }

        await prisma.words.create({
            data: {
                kanji: fixKanji,
                kana: fixKana,
                meaning: meaning,
                audio_url: audio_url,
                level: fixLevel
            }
        });

        return NextResponse.json({ message: "단어 추가 성공" }, { status: 201 });
    } catch (err) {
        console.log("단어 추가 오류 : " + err);
        return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
    }
}