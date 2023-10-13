import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Body = styled.div`
    position: fixed;
    top : 0;
    left : 0;
    right : 0;
    bottom: 0;
    margin : auto;
    width : 100%;
    height : 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display:flex;
    justify-content: center;
    align-items: center;
`
const LoginInfo = styled.div`
    width: 400px;
    height: 210px;
    background-color: var(--main-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 34px 34px 20px 34px;
    border-radius: 5px;
`
const Title = styled.h1`
    font-family: "godicM";
    font-size: 20px;
    margin-bottom: 20px;
`
const Context = styled.div`
    font-family: "godicThin";
    font-size: 18px;
    margin-bottom: 18px;
    line-height: 130%;
`
const BtnContainer = styled.div`
    font-family: "godicM";
    display: flex;
    width: 100%;
    justify-content: space-between;
    
`
const GuestBtn = styled.div`
    font-family: "godicM";
    font-size: 18px;
    border: 1px solid black;
    width: 144px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
    }
    
`
const LoginBtn = styled.div`
    font-family: "godicM";
    font-size: 18px;
    background-color: var(--main-blue);
    color: var(--main-white);
    width: 144px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
    }
    
`

abstract class IProps {
    context1: string;
    context2: string;
}

export default function RequestLoginInfo(props){

    return(
    <Body>
        <LoginInfo>
            <Title>현재 로그아웃 상태입니다.</Title>
            <Context>{props.context1}<br/>{props.context2}</Context>
            <BtnContainer>
                <GuestBtn onClick={function(e){
                    e.preventDefault();
                    props.onGuestMode();
                    }}>{props.firstBtnText}</GuestBtn>
                <Link to={'/login'}>
                    <LoginBtn>{props.secondBtnText}</LoginBtn>
                </Link>
            </BtnContainer>
        </LoginInfo>
    </Body>
    )
}