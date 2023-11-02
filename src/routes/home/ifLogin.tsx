import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../authApi';
import {useRecoilValue} from "recoil";
import {userNameAtom} from "../login/userInfoAtom";


function IfLogin() {
    const userName = useRecoilValue(userNameAtom);

    return(
        <div className="btn__container">
            <div className="login-btn" onClick={logout}>로그아웃</div>
            <Link to={`/mypage/${userName}`}>
                <div className="sign-btn">내 에피소드</div>
            </Link>
        </div>
    );
    
}

export default IfLogin;