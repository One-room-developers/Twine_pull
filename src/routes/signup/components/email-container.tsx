import * as React from 'react';
import {Component, createRef } from 'react';
import SignupForm from './signupForm';
import './emailContainer.css';
import axios from 'axios';

type Modes_props = {
    onFormSubmit(email : string) : void,
}

type EmailContainerState = {
    mode: string;
    email: string;
    password: string;
    password_con: string;
    nickname: string;
};

class EmailContainer extends Component<Modes_props , EmailContainerState>{ // <props 제너릭, state 제너릭>
    
    //private로 형식 선언
    private inputRef: React.RefObject<HTMLInputElement> = createRef();

    constructor(props){
        super(props);
        this.state = {
            mode: 'default',
            email: '',
            password: '',
            password_con: '',
            nickname: '',
        };
        this.inputRef = React.createRef();
    }
    
    render() {

        let default_email : string = "";
        
        //null 값일 때 참조하지 않도록 오류 방지
        if(this.inputRef.current === null){
            
        }
        else{
            default_email = this.inputRef.current.value;
        }

        const signUpComponent = <SignupForm closeForm={
            function(){this.setState({mode: 'default'})}.bind(this)} 
            submitForm={function(e){
                //state에 회원 가입에 필요한 값들을 전달함.
                e.preventDefault();
                this.state.email = e.target.email.value;
                this.state.password = e.target.pw.value;
                this.state.password_con = e.target.pwc.value;
                this.state.nickname = e.target.nic.value;

                axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_API_URL}/auth/signup`,
                    data: {
                        id: this.state.email,
                        nickname: this.state.nickname,
                        password: this.state.password
                    },
                })
                .then((res) => {
                    if(res.data.errorMsg == 13) {
                        // 이미 있는 아이디입니다.
                    }
                    else if(res.data.errorMsg == 11) {
                        console.log('서버 문제로 회원가입 실패');
                    }

                    if(res.data.successMsg == 10) {
                        window.location.href=`${process.env.REACT_APP_LOCAL_HOME_URL}/#/login`;
                    }
                });

            }.bind(this)}
            emailDefault={default_email}></SignupForm>;
        
        let _signUpForm = signUpComponent;
        //if 문을 써서 signUpForm 안에 태그를 지우면 아무것도 출력 안 되도록 가능
        
        if(this.state.mode === 'default'){
            _signUpForm = null;
        }
        else if(this.state.mode === 'signup'){
            _signUpForm = signUpComponent;
        }
        
        return(
            <div className="email-container">
                {_signUpForm}
                <input className="email-input" type="text" ref={this.inputRef} placeholder="아이디" required />
                <button className="font-game-thin signup-button" onClick={function(e){
                    this.setState({mode: 'signup'});
                }.bind(this)}>시작하기</button>
            </div>
        );
    }
}

export default EmailContainer;