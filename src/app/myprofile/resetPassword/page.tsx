"use client"

import styles from '@/styles/resetPW.module.css';
import { useState } from 'react';

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }

    return (
        <div className={styles.editPassword}>
            <form className={styles.pcLogin} onSubmit={handleSubmit}>
                <div className={styles.title}>비밀번호 변경</div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        name='password'
                        onChange={handleChange}
                        className={styles.inputField}
                        placeholder="기존 비밀번호를 입력하세요"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        name='newPassword'
                        onChange={handleChange}
                        className={styles.inputField}
                        placeholder="새 비밀번호를 입력하세요"
                        required
                    />
                </div>
                {message && <div className={styles.errorMessage}>{message}</div>}
                <button type="submit" className={styles.loginBtn}>변경</button>
            </form>
        </div>
    );
}
