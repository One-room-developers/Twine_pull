import * as React from 'react';
import './login-route.css';
import googleLogo from '../../styles/image/google-logo.png';
import arrow from '../../styles/image/arrow-right-svgrepo-com.svg';
import axios from 'axios';
import { useHistory } from "react-router";

export const LoginRoute: React.FC = () => {

    const history = useHistory();

    const [email, setEmail] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const onChangeEmail = React.useCallback((e) => setEmail(e.target.value), []);
    const onChangePwd = React.useCallback((e) => setPwd(e.target.value), []);

    const user = {
        providerId: String,
        email: String,
        name: String,
        accessToken: String
    }

    function login() {
        axios({
            method: "POST",
            url: `http://localhost:3001/auth/login`,
            data: {
                email: email,
                password: pwd,
            },
        })
        
        history.push("/");
    }

    function googleLogin() {
        console.log('hi');
        axios({
            method: "GET",
            url: `http://localhost:3001/auth/googleAuth`,
        })
        .then((res) => {
            user.providerId = res.data.providerid;
            user.email = res.data.email;
            user.name = res.data.name;
            user.accessToken = res.data.accessToken;

            console.log(user);
        });
    }

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

                <div className="login-div">
                
                    <div className="grid-1 font-game-thick">로그인</div>
                    <div className="grid-2 ">
                        <input type="email" placeholder="계정 이메일" required onChange={onChangeEmail}/>
                        <input type="password" placeholder="비밀번호" required onChange={onChangePwd}/>
                        
                        <form className='google-login-form' action='http://localhost:3001/auth/googleAuth' method="get">
                                <button className="google-login"> <img src={googleLogo} />구글 로그인</button>
                        </form>

                        <div className="autoLogin-container">
                            <input type="checkbox" id="autoLogin" name="autoLogin" />
                            <label className="font-game-thin" htmlFor="autoLogin">로그인 상태 유지</label>
                        </div>
                    </div>
                    <div className="grid-3">
                        <button type='submit' className="login-enter-btn" onSubmit={login}>
                            <img src={arrow} alt="" />
                        </button>
                    </div>
                    <div className="grid-4 font-game-thin">
                        <a href="">아이디/비밀번호 찾기</a>
                        <br />
                        <a href="/#/signup">회원가입</a>
                    </div>
                    
                </div>

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