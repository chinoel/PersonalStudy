"use client";

import styles from '@/styles/header.module.css';
import { useAppRouter } from '@/utils/routes';

export default function Header() {
    const router = useAppRouter();

    const handleHomeClick = () => {
        router.home();
    }

    const handleLoginClick = () => {
        router.login();
    }

    const handleRegisterClick = () => {
        router.signup();
    }


    return (
        <div className={styles.header}>
            <div className='logo'>
                LOGOs
            </div>
            <div className='option'>
                test
            </div>
            <div>user status</div>
        </div>
    );
}
