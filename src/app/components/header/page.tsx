"use client";

import styles from '@/styles/header.module.css';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    }

    const handleLoginClick = () => {
        router.push('/login');
    }

    const handleRegisterClick = () => {
        router.push('/register');
    }


    return (
        <div data-layer="header" className={styles.HeaderGuest}>
            <div data-layer="logo" className={styles.Group4} onClick={handleHomeClick}>
                <div data-layer="icon" className={styles.Ellipse5} />
                <div data-layer="PS JAPAN" className={styles.PsJapan}>PS JAPAN</div>
            </div>
            <div data-layer="login" className={styles.Frame19} onClick={handleLoginClick}>
                <div data-layer="로그인" className={styles.Frame19Text}>로그인</div>
            </div>
            <div data-layer="register" className={styles.Frame20} onClick={handleRegisterClick}>
                <div data-layer="회원가입" className={styles.Frame20Text}>회원가입</div>
            </div>
            <div data-layer="Group 1" className={styles.Group1}>


                <div data-layer="문장 암기" className={styles.MenuText}>문장 암기</div>
                <div data-svg-wrapper data-layer="Vector" className={`${styles.Vector} ${styles.Vector1}`}>
                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.972501 0.0301546L6.4725 5.50001L11.9727 3.21865e-06L13 1.02228L6.5 7.50001L0 1.02228L0.972501 0.0301546Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div data-layer="Group 2" className={styles.Group2}>
                <div data-layer="게시판" className={styles.MenuText}>게시판</div>
                <div data-svg-wrapper data-layer="Vector" className={`${styles.Vector} ${styles.Vector2}`}>
                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.972501 0.0301546L6.4725 5.50001L11.9727 3.21865e-06L13 1.02228L6.5 7.50001L0 1.02228L0.972501 0.0301546Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div data-layer="Group 3" className={styles.Group3}>
                <div data-layer="여행용 회화" className={styles.MenuText}>여행용 회화</div>
                <div data-svg-wrapper data-layer="Vector" className={`${styles.Vector} ${styles.Vector3}`}>
                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.972501 0.0301546L6.4725 5.50001L11.9727 3.21865e-06L13 1.02228L6.5 7.50001L0 1.02228L0.972501 0.0301546Z" fill="black" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
