"use client";

import { useState } from "react";

export default function wordPage() {

    const [formData, setFormData] = useState({
        kanji: "",
        kana: "",
        meaning: "",
        audio_url: "",
        level: 5,
    });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/admin/serviceManagement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.status === 201) {
            setFormData({
                kanji: "",
                kana: "",
                meaning: "",
                audio_url: "",
                level: 5,
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select name="level" onChange={handleChange} value={formData.level}>
                    <option value="5" defaultChecked>N5</option>
                    <option value="4">N4</option>
                    <option value="3">N3</option>
                    <option value="2">N2</option>
                    <option value="1">N1</option>
                </select>
                <input
                    type="text"
                    name="kanji"
                    value={formData.kanji}
                    placeholder="한자 단어를 입력하세요"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="kana"
                    value={formData.kana}
                    placeholder="카나를 입력하세요"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="meaning"
                    value={formData.meaning}
                    placeholder="뜻을 입력하세요"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="audio_url"
                    value={formData.audio_url}
                    onChange={handleChange}
                    placeholder="오디오 주소를 입력하세요"
                />
                <button type="submit">추가</button>
            </form>
            {message && <p>{message}</p>}
        </>
    )
}