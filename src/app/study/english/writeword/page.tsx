"use client";

import React, { useState } from "react";

export default function Page() {


    const [word, setWord] = useState<string>("사과");

    const clickWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            clickCheck();
        }
    }

    const clickCheck = () => {
        if (word === "apple") {
            alert("정답입니다.");
        } else {
            alert("틀렸습니다.");
        }
    }

    return (
        <>
            <h1>English Write Word</h1>
            <div>
                해당하는 단어를 영어로 적어주세요.
            </div>
            <div>
                사과
            </div>
            <input 
                type="text" 
                onChange={clickWord} 
                value={word}
                onKeyDown={handleKeyDown}/>

            <div>
                <div className="move">
                    <button>이전</button>
                    <button onClick={clickCheck}>힌트 확인하기</button>
                    <button>다음</button>
                </div>
            </div>
        </>
    );
}