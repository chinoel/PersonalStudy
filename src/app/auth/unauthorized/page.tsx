// pages/unauthorized.tsx
import styles from '@/styles/404.module.css';

// Admin Page 401 Error
function CustomUnauthorized() {
    return (
        <div className={styles.container}>
            <div className={styles.errorCode}>401</div>
            <div className={styles.pageNotFound}>UNAUTHORIZED</div>
            <div className={styles.errorMessage}>
                You are not authorized to view this page.<br />
                Please login with the correct credentials.
                이 페이지에 반복적인 접근을 시도하면 계정이 차단될 수 있습니다.
            </div>
        </div>
    );
}

export default CustomUnauthorized;
