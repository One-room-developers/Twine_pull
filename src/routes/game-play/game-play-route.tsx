
import Main from './component/main'
import Right_Ui from './component/right_ui'
import * as React from 'react';
import { useParams } from 'react-router-dom';
import './game-play-route.css';
import styled from 'styled-components';
import apoImg from '../game-upload/img/mode-apo.png';
//로그인 관련
import RequestLoginInfo from '../select/components/requestLoginInfo';
import { BottomStatUI } from './component/bottomStatUI';



const LeftUI = styled.div`
    width: 380px;
    display: flex;
    align-items: center;
`;
const GameIllustContainer = styled.div`
    width: 330px;
    height: 190px;
    background: content-box radial-gradient(rgba(255, 191, 139, 0.2), rgb(0,0,0,0.5));
    border-radius: 3px;
    display: flex;
    position: relative;
    border-top: 3px solid var(--main-dark);
    border-bottom: 3px solid var(--main-dark);
    margin-left: 40px;
    margin-bottom: 150px;
`;
const Line1 = styled.div`
    background-color: rgba(54, 35, 20, 0.4);
    width:1px;
    height: 100%;
    z-index: 5;
    margin-left: 70px;
    position: absolute;
`
const Line2 = styled.div`
    background-color: rgba(54, 35, 20, 0.2);
    width:1px;
    height: 100%;
    z-index: 5;
    margin-left: 115px;
    position: absolute;
`
const Line3 = styled.div`
    background-color: rgba(54, 35, 20, 0.1);
    width:2px;
    height: 100%;
    z-index: 5;
    margin-left: 115px;
    position: absolute;
`
const Line4 = styled.div`
    background-color: rgba(54, 35, 20, 0.1);
    width:2px;
    height: 100%;
    z-index: 5;
    margin-left: 195px;
    position: absolute;
`
const Line5 = styled.div`
    background-color: rgba(54, 35, 20, 0.2);
    width:1px;
    height: 100%;
    z-index: 5;
    margin-left: 235px;
    position: absolute;
`
const Line6 = styled.div`
    background-color: rgba(54, 35, 20, 0.1);
    width:1px;
    height: 100%;
    z-index: 5;
    margin-left: 305px;
    position: absolute;
`

const GameIllustration = styled.img.attrs({src:apoImg})`
    width: 330px;
    border-radius: 3px;
    z-index: -1;
    object-fit: cover;
`;

export const GamePlayRoute: React.FC = () => {
    var [statUIOn, setStatUIOn] = React.useState(false);
    var body = React.useRef(null);

    function stat_window_event(){
        setStatUIOn((statUIOn ? false : true))
    }

    //url의 값 긁어오기
    interface IGenre{
        genre: string;
    }
    const { genre } = useParams<IGenre>();
    console.log(genre);
    
    // React.useEffect(game_start, [])
    return (
        <div className="game_play_body" >
            <LeftUI>
                <GameIllustContainer>
                    <Line1 />
                    <Line2 />
                    <Line3 />
                    <Line4 />
                    <Line5 />
                    <Line6 />
                    <GameIllustration />
                </GameIllustContainer>
            </LeftUI>
            <Main stat_window_event = {function(){stat_window_event()} }></Main>
            <Right_Ui></Right_Ui>
            <BottomStatUI statUIOn = {statUIOn}></BottomStatUI>
        </div>
    );
};