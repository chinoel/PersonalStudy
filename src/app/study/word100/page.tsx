

export default function Word100Page() {

    return (
        <div>
            <h1>Word100</h1>
            <p>100개의 단어를 외워봅시다.</p>
            <p>단어를 외우면서 뜻을 맞춰보세요.</p>
            <h3>시스템 구현 후 디자인 예정</h3>
            <div>Level: N5</div>
            <div>Study Code : 001</div>
            <div>진행 단계 : 1/100</div>

            {/* 단어 폼 */}
            <div>
                <div>단어 : こんにちは！</div>
                <div>가나 : こんにちは！</div>
                <div>뜻 : 안녕하세요!</div>

                <div className="select">
                    <button>가나 확인하기</button>
                    <button>소리 들어보기</button>
                    <button>뜻 확인하기</button>
                    <button>전체 확인하기</button>
                </div>
                <div>
                    <button>완전히 알고 있음</button>
                    <button>어느 정도 알고 있음</button>
                    <button>모르겠음</button>
                </div>
            </div>
        </div>
    )
}