import * as React from 'react';
import './login-route.css';
import googleLogo from '../../styles/image/google-logo.png';
import arrow from '../../styles/image/arrow-right-svgrepo-com.svg';

export const LoginRoute: React.FC = () => {

    return(
        <body className="login-img">
            <main className="login-main">
                <header className="login-header">
                    <a href="/">
                        <div>
                            <span className="font-hambak login__title">
                                TEXT ADVENTURE
                                <br />
                                PROJECT
                            </span>
                        </div>
                    </a>
                    <div></div>
                </header>

                <form className="login-form" action="http://localhost:3001/auth/login" method="post">
                
                    <div className="grid-1 font-game-thick">로그인</div>
                    <div className="grid-2 ">
                        <input type="text" placeholder="계정 이메일" />
                        <input type="password" placeholder="비밀번호" />
                        <form className='google-login-form' action="http://localhost:3001/auth/google" method="get">
                            <button className="google-login"> <img src={googleLogo} />구글 로그인</button>
                        </form>
                        <div className="autoLogin-container">
                            <input type="checkbox" id="autoLogin" name="autoLogin" />
                            <label className="font-game-thin" htmlFor="autoLogin">로그인 상태 유지</label>
                        </div>
                    </div>
                    <div className="grid-3">
                        <button className="login-enter-btn">
                            <img src={arrow} alt="" />
                        </button>
                    </div>
                    <div className="grid-4 font-game-thin">
                        <a href="">아이디/비밀번호 찾기</a>
                        <br />
                        <a href="/#/signup">회원가입</a>
                    </div>
                    
                </form>

                <div></div>
            </main>
            <footer className="login-footer font-game-thin">
                <div className="footer-link-container">
                    <a href="/">홈</a>
                    <a href="">고객센터</a>
                    <a href="">쿠키설정</a>
                    <a href="">언어</a>
                </div>
            </footer>
        </body>
    );
};