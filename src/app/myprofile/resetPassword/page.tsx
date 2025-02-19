

export default function ResetPasswordPage() {
    return (
        <div>
            <div data-layer="edit-password" className="EditPassword" style={{ width: 1024, height: 1036, position: 'relative', background: 'white' }}>
                <div data-layer="PC-Login" className="PcLogin" style={{ width: 543, height: 684, left: 240, top: 186, position: 'absolute', border: '1px black solid' }}>
                    <div data-layer="login_btn" className="LoginBtn" style={{ width: 364, height: 56, left: 90, top: 388, position: 'absolute', background: '#BFFF00' }}>
                        <div data-layer="변경" style={{ left: 168, top: 19, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word' }}>변경</div>
                    </div>
                    <div data-layer="Frame 1" className="Frame1" style={{ width: 364, height: 56, left: 90, top: 235, position: 'absolute', background: 'white', borderBottom: '1px #767676 solid' }}>
                        <div data-layer="비밀번호를 다시 입력하세요" style={{ left: 0, top: 19, position: 'absolute', color: '#767676', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word' }}>비밀번호를 다시 입력하세요</div>
                    </div>
                    <div data-layer="Frame 1" className="Frame1" style={{ width: 364, height: 56, left: 90, top: 159, position: 'absolute', background: 'white', borderBottom: '1px #767676 solid' }}>
                        <div data-layer="비밀번호를 입력하세요" style={{ left: 0, top: 19, position: 'absolute', color: '#767676', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word' }}>비밀번호를 입력하세요</div>
                    </div>
                    <div data-layer="이미 가입된 계정이거나 사용할 수 없는 계정입니다." style={{ left: 90, top: 318, position: 'absolute', color: '#FE0000', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word' }}>이미 가입된 계정이거나 사용할 수 없는 계정입니다.</div>
                </div>
                <div data-layer="비밀번호 변경" style={{ left: 435, top: 128, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 28, fontFamily: 'Pretendard', fontWeight: '500', wordWrap: 'break-word' }}>비밀번호 변경</div>
            </div>
        </div>
    )
}