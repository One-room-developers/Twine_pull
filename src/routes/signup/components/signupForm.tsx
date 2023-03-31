import * as React from 'react';
import {Component} from 'react';
import x from '../../../styles/image/x.svg';
import './signupForm.css';

type SignupForm_props = {}

class SignupForm extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className='signup-background'>
                <form className='signup-info'>
                    <div className='signup-header'>
                        <div></div>
                        <h1 className='font-game-thick'>
                            회원가입
                        </h1>
                        <div className='signup-close'><img src={x}/></div>
                    </div>
                    <div className='signup-title font-game-thick'>
                        <h1>모험에 도전하시는 여러분, 환영합니다.</h1>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='email'>아이디(이메일)</label>
                        <input type="email" id="email" required/>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='pw'>비밀번호</label>
                        <input type="password" id="pw" required/>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='pwc'>비밀번호 확인</label>
                        <input type="password" id="pwc" required/>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='nic'>별명</label>
                        <input type="text" id="nic" required/>
                    </div>
                    <div className='signup-line font-game-thin input-checkbox'>
                        <label htmlFor='check'>게임 이용 약관 동의 <a className='terms-a' href='/'> 자세히</a></label>
                        <input type="checkbox" id="check" required/>
                    </div>
                    <button className='signup-form-submit-btn'>가입하기</button>

                </form>
            </div>
        );
    }
}

export default SignupForm;