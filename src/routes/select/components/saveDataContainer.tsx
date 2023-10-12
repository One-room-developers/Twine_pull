import * as React from 'react';
import styled from 'styled-components';
//function
import {checkAccessToken} from '../../authApi';

//component
import RequestLoginInfo from './requestLoginInfo';

const SaveDataDiv = styled.div`
    width: 25%;
    height: 100%;
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    //color: #ffe4a5;
    padding-top: 48px;
    right: 0;
    background-color: white;
`

export function SaveDataContainer(){
    const [isLogin, setIsLogin] = React.useState(false);
    const [isGuestMode, setIsGuestMode] = React.useState(false);

    React.useEffect(() => {
        async function checkLogin() {
            if(await checkAccessToken() === true){
                setIsLogin(true);
            }
            else{
                setIsLogin(false);
            }
        }

        checkLogin();  
    }, []);

    return (<SaveDataDiv>
        {(isLogin === true) ? <>사용자</> : 
        (isGuestMode === false) ? <RequestLoginInfo context1="Guest로 플레이하실 경우 게임의 진행사항이"
        context2="저장되지 않습니다." 
        onGuestMode={function(e){
            setIsGuestMode(true);
        }}/> : <>게스트모드로 이용</>}
        //여기에 세이브 데이터 관련 코드들
    </SaveDataDiv>)
}