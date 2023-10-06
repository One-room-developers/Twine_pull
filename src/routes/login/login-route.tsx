import * as React from 'react';
import './login-route.css';
import googleLogo from '../../styles/image/google-logo.png';
import arrow from '../../styles/image/arrow-right-svgrepo-com.svg';
import axios from 'axios';
import { useHistory } from "react-router";
import SessionStorageAPI from "./session";

export const LoginRoute: React.FC = () => {

    const history = useHistory();
    
    const [email, setEmail] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const onChangeEmail = React.useCallback((e) => setEmail(e.target.value), []);
    const onChangePwd = React.useCallback((e) => setPwd(e.target.value), []);

    const authorizedUser = {
        email: String,
        nickname: String,
        accessToken: String
    };

    function login() {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/login`,
            data: {
                id: email,
                password: pwd,
            },
            withCredentials: true,
        })
        .then((res) => {
            if(res.data.errorMsg == 14) {
                // 존재하지 않는 사용자라는 알림창 띄우기 필요
                console.log('존재하지 않는 사용자입니다.');
            }
            else if(res.data.errorMsg == 15) {
                // 비밀번호가 잘못됐다는 알림창 띄우기 필요
                console.log('잘못된 비밀번호입니다.');
            }

            authorizedUser.email = res.data.user.email;
            authorizedUser.nickname = res.data.user.nickname;
            authorizedUser.accessToken = res.data.accessToken;

            const sesstionStorage = new SessionStorageAPI();

            //seesion에 토큰을 저장해도 되는가?
            sesstionStorage.setItem("userToken", authorizedUser.accessToken);
            sesstionStorage.setItem("userNickname", authorizedUser.nickname);

            history.push("/");
        });
    }

    function googleLogin(e) {
        e.preventDefault();
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/googleAuth`;
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
                        
                        <form className='google-login-form'>
                                <button className="google-login" onClick={googleLogin}> <img src={googleLogo} />구글 로그인</button>
                        </form>

                        <div className="autoLogin-container">
                            <input type="checkbox" id="autoLogin" name="autoLogin" />
                            <label className="font-game-thin" htmlFor="autoLogin">로그인 상태 유지</label>
                        </div>
                    </div>
                    <div className="grid-3">
                        <button className="login-enter-btn" onClick={login}>
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
