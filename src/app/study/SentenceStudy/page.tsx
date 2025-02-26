import styles from '@/styles/sentenceStudy.module.css';
import Image from 'next/image';

export default function Page() {
    return (
        <div>
            <div className={styles.Quiz}>
                <div className={styles.Frame17}>
                    <div className={styles.title}>아래 문장을 보고 읽거나 뜻을 말해보세요</div>
                    <div className={styles.Frame11}>
                        <Image className={styles.Voice} src="https://placehold.co/38x38" alt="Voice Icon" />
                        <div className={styles.layerTextLong}>
                            一年は365日です。一年は365日です。一年は365日です。
                        </div>
                    </div>
                    <div className={styles.Frame15}>
                        <div className={styles.layerText}>해석이 현재 숨겨져 있습니다.</div>
                    </div>
                    <div className={styles.Frame12}>
                        <div>해석 보기</div>
                    </div>
                    <div className={styles.Frame13}>
                        <div>단어장에 추가</div>
                    </div>
                    <div className={styles.Frame14}>
                        <div>넘기기</div>
                    </div>
                    <div className={styles.Frame16}>
                        <div className={styles.JlptLV}>JLPT N5</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
