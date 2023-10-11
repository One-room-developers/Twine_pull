import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import x from '../../../styles/image/x.svg';
import './signupForm.css';
import {idCheck} from '../../authApi';
import SessionStorageAPI from '../../login/session';
import { valid } from 'semver';

type SignupForm_props = {
    closeForm() : void,
    submitForm(e : any) : void,
    emailDefault : string,
};

type SignupForm_states={
    id:string;
    idValid:number
};

class SignupForm extends Component<SignupForm_props, SignupForm_states>{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.emailDefault,
            idValid: 0,
        };
    }
    render() {

        return(
            <div className='signup-background'>
                <form className='signup-info' onSubmit={function(e){
                    if(this.state.idValid === 0){
                        alert("아이디 중복 검사를 해주세요.");
                    }else{
                        this.props.submitForm(e);
                    }
                }.bind(this)}>
                    <div className='signup-header'>
                        <div></div>
                        <h1 className='font-game-thick'>
                            회원가입
                        </h1>
                        <div className='signup-close' onClick={function(){this.props.closeForm()}.bind(this)}><img src={x}/></div>
                    </div>
                    <div className='signup-title font-game-thick'>
                        <h1>모험에 도전하시는 여러분, 환영합니다.</h1>
                    </div>
                    <div className='signup-line signup-id-line font-game-thin'>
                        <div className='signup-id-container'>
                            <label htmlFor='email'>아이디</label>
                            <input type="text" id="email" name='email' value={this.state.id} onChange={
                                function(e){
                                    this.setState({id: e.target.value})
                                }.bind(this)}
                            required/>
                            <div onClick={async function(e){
                                if(await idCheck(this.state.id) === false){
                                    this.setState({idValid: 1});
                                }
                                else{
                                    this.setState({idValid: 2});
                                }
                                console.log(this.state.id, await idCheck(this.state.id));
                            }.bind(this)} className='valid-check-btn'>중복검사</div>
                        </div>
                        {
                            this.state.idValid === 0 ?(<h2 className='valid-info'>중복검사를 해주세요</h2>) :
                            this.state.idValid === 1 ?(<h2 className='valid-info-no'>사용할 수 없는 아이디입니다.</h2>):
                            this.state.idValid === 2 ?(<h2 className='valid-info-yes'>사용 가능한 아이디입니다.</h2>):(<></>)
                        }
                    </div>
                    
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='pw'>비밀번호</label>
                        <input type="password" id="pw" name='pw' required/>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='pwc'>비밀번호 확인</label>
                        <input type="password" id="pwc" name='pwc' required/>
                    </div>
                    <div className='signup-line font-game-thin'>
                        <label htmlFor='nic'>별명</label>
                        <input type="text" id="nic" name='nic' required/>
                    </div>
                    <div className='signup-line font-game-thin input-checkbox'>
                        {/* <label htmlFor='check'>게임 이용 약관 동의 <a className='terms-a' href='/'> 자세히</a></label> */}
                        <label htmlFor='check'>베타 기간 이용 안내 <Link className='terms-a' target="_blank" to='/beta'> 자세히</Link></label>
                        <input type="checkbox" id="check" required/>
                    </div>
                    <button className='signup-form-submit-btn'>가입하기</button>

                </form>
            </div>
        );
    }
}

export default SignupForm;