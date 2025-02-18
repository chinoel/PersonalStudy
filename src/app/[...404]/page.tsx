// pages/404.tsx
import styles from '@/styles/404.module.css'

function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <div className={styles.pageNotFound}>PAGE NOT FOUND</div>
      <div className={styles.errorMessage}>
        The requested URL was not found on<br />
        this server.
      </div>
    </div>
  );
}

export default Custom404;