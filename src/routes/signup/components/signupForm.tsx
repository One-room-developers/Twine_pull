import * as React from 'react';
import {Link} from 'react-router-dom'
import x from '../../../styles/image/x.svg';
import './signupForm.css';
import {idCheck, nicknameCheck} from '../../authApi';
import {useForm} from "react-hook-form";

type SignupForm_props = {
    closeForm() : void,
    submitForm(e : any) : void,
    emailDefault : string,
};

interface IFormData{
    error:{
        id:{
            message:string;
        }
    }
    id:string;
    nick:string;
    pwd1:string;
    pwd2:string;
};

function SignupForm (props:SignupForm_props){

    const {register, handleSubmit, formState:{errors}, setError} = useForm()

    function onValid(data: IFormData){
        if(data.pwd1 !== data.pwd2){
            setError("pwd2", {message:"비밀번호가 서로 다릅니다."});
        }
    }

    console.log(errors);
    return(
        <div className='signup-background'>
            <form className='signup-info' onSubmit={handleSubmit(onValid)}>
                <div className='signup-header'>
                    <div></div>
                    <h1 className='font-game-thick'>
                        회원가입
                    </h1>
                    <div className='signup-close' onClick={function(){props.closeForm()}}><img src={x}/></div>
                </div>
                <div className='signup-title font-game-thick'>
                    <h1>모험에 도전하시는 여러분, 환영합니다.</h1>
                </div>
                <div className='signup-line signup-id-line font-game-thin'>
                    <div className='signup-id-container'>

                        <label htmlFor='email'>아이디</label>
                        <input {...register("id", {required: "필수 입력 항목입니다.", 
                        pattern:{value:/^[A-Za-z0-9._%+-]/,
                                message: "영문, 숫자로만 조합 가능합니다."},
                        minLength:{
                            value: 4,
                            message:"4-16 글자 사이이어야 합니다."
                        },
                        maxLength:{
                            value: 16,
                            message:"4-16 글자 사이이어야 합니다."
                        },
                        validate:{duplication: async (value) => 
                                    await idCheck(value) === false ? "이미 사용중인 아이디입니다." : true}})}
                        type="text" />

                    </div>
                   <h2 className='valid-info-no'>{errors?.id?.message}</h2>
                    {/*<h2 className='valid-info-yes'>사용 가능한 아이디입니다.</h2>*/}
                </div>
                
                <div className='signup-line signup-id-line font-game-thin'>
                    <div className='signup-id-container'>
                        <label htmlFor='pwd1'>비밀번호</label>
                        <input {...register("pwd1", {required: "필수 입력 항목입니다.", 
                        minLength:{
                            value: 4,
                            message:"4-16 글자 사이이어야 합니다."
                        },
                        maxLength:{
                            value: 16,
                            message:"4-16 글자 사이이어야 합니다."
                        },
                        })}
                        type="password"/>
                    </div>
                    <h2 className='valid-info-no'>{errors?.pwd1?.message}</h2>
                </div>

                <div className='signup-line signup-id-line font-game-thin'>
                    <div className='signup-id-container'>
                        <label htmlFor='pwd2'>비밀번호 확인</label>
                        <input
                        {...register("pwd2", {required: "필수 입력 항목입니다.", 
                        })}
                        type="password" />
                    </div>
                    <h2 className='valid-info-no'>{errors?.pwd2?.message}</h2>
                </div>

                <div className='signup-line signup-id-line font-game-thin'>
                    <div className='signup-id-container'>
                        <label htmlFor='nick'>별명</label>
                        <input {...register("nick", {required: "필수 입력 항목입니다.",
                        minLength:{
                            value: 2,
                            message:"2-16 글자 사이이어야 합니다."
                        },
                        maxLength:{
                            value: 16,
                            message:"2-16 글자 사이이어야 합니다."
                        },
                        validate:{duplication: async (value) => 
                                    await nicknameCheck(value) === false ? "이미 사용중인 닉네임입니다." : true}})}
                        type="text"   />

                    </div>
                    <h2 className='valid-info-no'>{errors?.nick?.message}</h2>
                </div>
                <div className='signup-line font-game-thin input-checkbox'>
                    {/* <label htmlFor='check'>게임 이용 약관 동의 <a className='terms-a' href='/'> 자세히</a></label> */}
                    <label htmlFor='check'>베타 기간 이용 안내 <Link className='terms-a' target="_blank" to='/beta'> 자세히</Link></label>
                    <input type="checkbox" id="check" />
                </div>
                <button className='signup-form-submit-btn'>가입하기</button>

            </form>
        </div>
    );
}

export default SignupForm;