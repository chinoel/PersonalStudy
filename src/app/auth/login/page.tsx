import styles from "@/styles/login.module.css";

const LoginPage = () => {
    return (
        <div className={styles.LoginPc}>
            <div className={styles.PageTitle}>로그인</div>
            <div className={styles.PcLogin}>
                <div className={styles.LoginBtn}>
                    <div className={styles.LoginBtnText}>회원가입</div>
                </div>
                <div className={styles.LoginBtnGreen}>
                    <div className={styles.LoginBtnText}>로그인</div>
                </div>
                <div className={styles.Option}>
                    <div className={`${styles.OptionText} ${styles.OptionTextLeft}`}>
                        로그인 상태 유지
                    </div>
                    <div className={`${styles.OptionText} ${styles.OptionTextRight}`}>
                        아이디/비밀번호 찾기
                    </div>
                    <div className={styles.Ellipse1} />
                </div>
                <div className={styles.Frame2}>
                    <div className={styles.Frame2Text}>아이디를 입력하세요</div>
                </div>
                <div className={styles.Password}>
                    <div className={styles.Frame1}>
                        <div className={styles.Frame1Text}>비밀번호를 입력하세요</div>
                    </div>
                    <div className={styles.ErrorMessage}>비밀번호가 일치하지 않습니다.</div>
                </div>

                <div className={styles.Sns}>SNS로 간편하게 시작하기</div>
                <img className={styles.Ellipse2} src="/logo/naver.png" />
                <img className={styles.Ellipse3} src="/logo/kakao.png" />
                <img className={styles.Ellipse4} src="/logo/google.png" />
            </div>
        </div>
    );
};

export default LoginPage;