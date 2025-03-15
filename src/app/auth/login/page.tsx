"use client";

import styles from "@/styles/login.module.css";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        loginStay: false
    });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const register = async () => {
        window.location.href = "/register";
    }

    const handleSubmit = async (e: { preventDefault: () => void;}) => {
        e.preventDefault();

        const result = await signIn("user", {
            redirect: false,
            username: formData.username,
            password: formData.password
        })

        if (result?.error) {
            setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        else {
            window.location.href = "/";
        }
    }

    return (
        <div className={styles.LoginPc}>
            <div className={styles.PageTitle}>로그인</div>
            <form onSubmit={handleSubmit} className={styles.PcLogin}>

                <div className={styles.Frame2}>
                    <input
                        className={styles.Frame2Text}
                        type="text"
                        name="username"
                        placeholder="아이디를 입력하세요"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.Password}>
                    <div className={styles.Frame1}>
                        <input
                            className={styles.Frame1Text}
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {message && <div className={styles.ErrorMessage}>{message}</div>}
                </div>
                <div className={styles.Option}>
                    <input
                        type="checkbox"
                        name="loginStay"
                        className={styles.loginStay}
                        onChange={handleChange}
                    />
                    <div className={`${styles.OptionText} ${styles.OptionTextLeft}`}>
                        로그인 상태 유지
                    </div>
                    <div className={`${styles.OptionText} ${styles.OptionTextRight}`}>
                        아이디/비밀번호 찾기
                    </div>
                </div>
                <button type="submit" className={styles.LoginBtnGreen}>
                    <div className={styles.LoginBtnText}>로그인</div>
                </button>


                {/* 현재는 구현하지 않음 */}
                <div className={styles.Sns}>SNS로 간편하게 시작하기</div>
                <Image className={styles.Ellipse2} src="/logo/naver.png" alt={""} width={32} height={32} />
                <Image className={styles.Ellipse3} src="/logo/kakao.png" alt={""} width={32} height={32} />
                <Image className={styles.Ellipse4} src="/logo/google.png" alt={""} width={32} height={32} />

                <button onClick={register} className={styles.LoginBtn}>
                    <div className={styles.LoginBtnText}>회원가입</div>
                </button>
            </form>
        </div>
    );
};