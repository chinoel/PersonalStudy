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
                Please log in with the correct credentials.
            </div>
        </div>
    );
}

export default CustomUnauthorized;
