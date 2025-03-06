export default function Home() {
  return (
    <>
      <div data-layer="main" className="Main" style={{ width: 1024, height: 1204, position: 'relative', background: 'white' }}>
        <div data-svg-wrapper data-layer="service2" className="Service2" style={{ left: 0, top: 816, position: 'absolute' }}>
          <svg width="1024" height="388" viewBox="0 0 1024 388" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="388" fill="#CAE1D4" />
          </svg>
        </div>
        <div data-svg-wrapper data-layer="ads" className="Ads" style={{ left: 0, top: 614, position: 'absolute' }}>
          <svg width="1024" height="202" viewBox="0 0 1024 202" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="202" fill="black" />
          </svg>
        </div>
        <div data-svg-wrapper data-layer="service1" className="Service1" style={{ left: 0, top: 243, position: 'absolute' }}>
          <svg width="1024" height="369" viewBox="0 0 1024 369" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="369" fill="#CAE1D4" />
          </svg>
        </div>
        <div data-layer="header1" className="Header1" style={{ width: 1024, height: 200, left: 0, top: 43, position: 'absolute' }}>
          <div data-layer="일본어" style={{ left: 0, top: 67, position: 'absolute', color: 'black', fontSize: 55, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>일본어</div>
          <div data-layer="공부하는 사이트입니다" style={{ left: 788, top: 85, position: 'absolute', color: 'black', fontSize: 25, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>공부하는 사이트입니다</div>
        </div>
        <div data-layer="notification" className="Notification" style={{ width: 1024, height: 43, left: 0, top: 0, position: 'absolute', background: '#E3E3E3' }}>
          <div data-layer="공지 : 현재 서비스가 제공되지 않으며, 구축 단계입니다." style={{ left: 339, top: 12, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>공지 : 현재 서비스가 제공되지 않으며, 구축 단계입니다.</div>
        </div>
      </div>
    </>
  );
}
