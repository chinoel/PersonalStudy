// pages/unauthorized.tsx
import styles from '@/styles/404.module.css'; // 404 스타일 그대로 사용

function CustomUnauthorized() {
    return (
        <div className={styles.container}>
            <div className={styles.errorCode}>401</div>
            <div className={styles.pageNotFound}>UNAUTHORIZED</div>
            <div className={styles.errorMessage}>
                You are not authorized to view this page.<br />
                Please log in with the correct credentials.
            </div>
        </div>
    );
}

export default CustomUnauthorized;
