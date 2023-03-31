import * as React from 'react';
import {Component} from 'react';
import SignupForm from './signupForm';
import './emailContainer.css';

type Modes_props = {
    onFormSubmit : void,
}

class EmailContainer extends Component<Modes_props>{
    
    constructor(props){
        super(props);
        this.state = {
            mode: 'default',
            email: ''
        }
    }
    
    render() {

        let _signUpForm = <SignupForm></SignupForm>
        //if 문을 써서 signUpForm 안에 태그를 지우면 아무것도 출력 안 되도록 가능
        return(
            <div className="email-container">
                {_signUpForm}
                <input className="email-input" type="email" placeholder="이메일 주소" required />
                <button className="font-game-thin signup-button">시작하기</button>
            </div>
        );
    }
}

export default EmailContainer;