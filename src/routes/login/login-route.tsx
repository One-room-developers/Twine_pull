import * as React from 'react';
import './login-route.css';
import googleLogo from '../../styles/image/google-logo.png';
import arrow from '../../styles/image/arrow-right-svgrepo-com.svg';
import axios from 'axios';
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
import {useRecoilValue, useRecoilState} from "recoil";
import {userIdAtom, userNameAtom} from "./userInfoAtom";

export const LoginRoute: React.FC = () => {

    const history = useHistory();

    const [email, setEmail] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [errorInfo, setErrorInfo] = React.useState("");
    //recoil 사용
    const [userId, setUserId] = useRecoilState(userIdAtom);
    const [userName, setUserName] = useRecoilState(userNameAtom);

    const onChangeEmail = React.useCallback((e) => {
        setErrorInfo("");
        setEmail(e.target.value);
    }, []);
    const onChangePwd = React.useCallback((e) => {
        setErrorInfo("");
        setPwd(e.target.value);
    }, []);

    const authorizedUser = {
        email: String,
        nickname: String,
    };

    function login() {
        if(email === ""){
            setErrorInfo("아이디를 입력해주세요.");
        }
        else if(pwd === ""){
            setErrorInfo("비밀번호를 입력해주세요.");
        }
        else{
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
                console.log(res.data);
                if(res.data.errorMsg === 14 || res.data.errorMsg == 15) {
                    alert('잘못된 비밀번호이거나 존재하지 않는 사용자입니다.');
                    history.push("/login");
                    return;
                }
    
                //리프레시 토큰과 생사를 같이 해야 하므로 쿠키에 저장
                authorizedUser.email = res.data.user.id;
                authorizedUser.nickname = res.data.user.nickname;
                // toUTCString() 으로 변환해야 함
                const currentTime = new Date().getTime();
                const targetTime = currentTime + res.data.refreshOption.maxAge;
                const expireTime = new Date(targetTime);
    
                //seesion에 토큰을 저장해도 되는가?
                //쿠키 저장 : setCookies("userNickname", authorizedUser.nickname, "/", expireTime.toUTCString());
                setUserId(authorizedUser.email);
                setUserName(authorizedUser.nickname);

                history.push("/");
            });
        }
    }

    function googleLogin(e) {
        e.preventDefault();
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/googleAuth`;
    }

    function handleEnter(e){
        if(e.keyCode === 13){ //javascript에서는 13이 enter키를 의미함
            login();
        }
    }

    return(
        <body className="login-img">
            <main className="login-main">
                <header className="login-header">
                    <Link to="/">
                        <div>
                            <span className="font-hambak login__title">
                                TEXT ADVENTURE
                                <br />
                                PROJECT
                            </span>
                        </div>
                    </Link>
                    <div></div>
                </header>

                <div className="login-div">
                
                    <div className="grid-1 font-game-thick">로그인</div>
                    <div className="grid-2 ">
                        <form action="">
                            <input type="email" placeholder="계정" onChange={onChangeEmail} onKeyDown={handleEnter}/>
                            <input type="password" placeholder="비밀번호" onChange={onChangePwd} onKeyDown={handleEnter} />              
                            <div className='errorInfo'>{errorInfo}</div>
                        </form>
                        <form className='google-login-form'>
                                <button disabled className="google-login" onClick={googleLogin}> <img src={googleLogo} />구글 로그인</button>
                        </form>

                        <div className="autoLogin-container">
                            <input disabled type="checkbox" id="autoLogin" name="autoLogin" />
                            <label className="font-game-thin" htmlFor="autoLogin">로그인 상태 유지</label>
                        </div>
                    </div>
                    <div className="grid-3">
                        <button className="login-enter-btn" onClick={login}>
                            <img src={arrow} alt="" />
                        </button>
                    </div>
                    <div className="grid-4 font-game-thin">
                        <Link to="">아이디/비밀번호 찾기</Link>
                        <br />
                        <Link to="/signup">회원가입</Link>
                    </div>
                    
                </div>

                <div></div>
            </main>
            <footer className="login-footer font-game-thin">
                <div className="footer-link-container">
                    <Link to="/">홈</Link>
                    <Link to="/board/suggestion/1">고객센터</Link>
                    <Link to="">쿠키설정</Link>
                    <Link to="">언어</Link>
                </div>
            </footer>
        </body>
    );
};
