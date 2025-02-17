"use client";

import { useState } from "react";
import styles from '@/styles/register.module.css';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        display_name: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }
    }

    return (
        <div>
            <div className={styles.Register}>
                <div className={styles.RegisterText}>회원가입</div>
                <form onSubmit={handleSubmit} className={styles.PcLogin}>
                    <div className={`${styles.Frame} ${styles.Frame1}`}>
                        <input
                            className={styles.FrameText}
                            type="text"
                            name="username"
                            placeholder="아이디를 입력하세요"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`${styles.Frame} ${styles.Frame2}`}>
                        <input
                            className={styles.FrameText}
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`${styles.Frame} ${styles.Frame3}`}>
                        <input
                            className={styles.FrameText}
                            type="text"
                            name="display_name"
                            placeholder="사용자 이름을 입력하세요"
                            value={formData.display_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {message && <div className={styles.ErrorMessage}>{message}</div>}

                    <button className={styles.LoginBtn} type="submit">
                        <div>회원가입</div>
                    </button>
                </form>
            </div>
        </div>
    )
}