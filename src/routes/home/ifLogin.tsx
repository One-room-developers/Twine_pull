import * as React from 'react';
import {Component} from 'react';

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
                <a href="/select">
                    <div className="font-hambak sign-btn">Play Game</div>
                </a>
                <a href="/">
                    <div className="font-hambak login-btn">MyPage</div>
                </a>
            </div>
        );
    }
}

export default ifLogin;