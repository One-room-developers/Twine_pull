import * as React from 'react';
import {Component} from 'react';

type ifLogout_props = {
}

class ifLogout extends Component<ifLogout_props>{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="btn__container">
                <a href="/#/login">
                    <div className="font-hambak login-btn">LOGIN</div>
                </a>
                <a href="/#/signup">
                    <div className="font-hambak sign-btn">SIGN UP</div>
                </a>
            </div>
        );
    }
}

export default ifLogout;