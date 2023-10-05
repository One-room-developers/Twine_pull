import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';

type ifLogin_props = {
    nickname : string
}

class ifLogin extends Component<ifLogin_props>{
    constructor(props){
        super(props);

    }

    render(){

        return(
            <div className="btn__container">
                <Link to="/select">
                    <div className="font-hambak sign-btn">Play Game</div>
                </Link>
                <Link to="/">
                    <div className="font-hambak login-btn">MyPage</div>
                </Link>
            </div>
        );
    }
}

export default ifLogin;