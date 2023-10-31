import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../authApi';

type ifLogin_props = {
    nickname : string
}

class ifLogin extends Component<ifLogin_props>{
    constructor(props){
        super(props);
    }

    render(){
        ///mypage/${this.props.nickname}
        return(
            <div className="btn__container">
                <div className="login-btn" onClick={logout}>로그아웃</div>
                <Link to="/select">
                    <div className="sign-btn">게임시작</div>
                </Link>
            </div>
        );
    }
}

export default ifLogin;