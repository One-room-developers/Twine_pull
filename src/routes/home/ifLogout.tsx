import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';

type ifLogout_props = {
}

class ifLogout extends Component<ifLogout_props>{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="btn__container">
                <Link to="/login">
                    <div className="font-hambak login-btn">로그인</div>
                </Link>
                <Link to="/signup">
                    <div className="font-hambak sign-btn">회원가입</div>
                </Link>
            </div>
        );
    }
}

export default ifLogout;