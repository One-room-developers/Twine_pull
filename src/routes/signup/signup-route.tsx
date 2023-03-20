import * as React from 'react';
import './signup-route.css';
import googleLogo from '../../styles/image/google-logo.png';


export const SignupRoute: React.FC = () => {

    return(
        <body>
            <div className="signup-background-img"></div>
            <main className="signup-main">
                <h1 className="welcome-title font-game-thick">끝 없는 이야기 속으로.</h1>
                <h2 className="welcome-title-2 font-game-thin">다양한 장르의 텍스트 어드벤처 게임을 즐기세요. 누구나 자신이 원하는 이야기를 만들수도 있습니다.</h2>
                <h3 className="welcome-title-3 font-game-thin">모험을 떠날 준비가 되었나요? 게임을 플레이하거나 스토리를 제작하려면 이메일 주소를 입력하세요.</h3>
            
                <div className="signup-form-container">
                    <form className="email-form" action="">
                        <input className="email-input" type="email" placeholder="이메일 주소" required />
                        <button className="font-game-thin signup-button">시작하기</button>
                    </form>
            
                    <button className="google-signup-btn"><img src={googleLogo} alt="" /></button>
                </div>

            </main>
            <footer className="signup-footer">
                <a href="/">
                    <h1 className="signup-footer-logo font-game-thick">Endless Adventure StorY</h1>
                </a>
                <div className="signup-footer-menu">
                    <select name="" id="">
                        <option value="kr">한국어</option>
                        <option value="en">English</option>
                    </select>
                    <button>로그인</button>
                </div>
            </footer>
        </body>
    );
};