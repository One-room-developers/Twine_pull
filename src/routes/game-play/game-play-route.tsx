import { main } from './game-play-write_text'
import Stat_UI from './game-play-stat_ui'
import Main from './component/main'
import Left_Ui from './component/left_ui'
import Right_Ui from './component/right_ui'
import * as React from 'react';
import './game-play-route.css';



export default function GamePlayRoute(){
    var [statUIOn, setStatUIOn] = React.useState(false);

    function StatUi(){
        if(statUIOn){
            document.querySelector("body").addEventListener('click', StatUiEvent);
            return <Stat_UI/>
        }
        else{
            document.querySelector("body").removeEventListener('click', StatUiEvent);
            return
        }
    }

    function StatUiEvent(){
        setStatUIOn((statUIOn ? false : true))
    }

    React.useEffect(main, [])
    return (
        <body className="game_play_body" >
            
            <Left_Ui></Left_Ui>
            <Main></Main>
            <Right_Ui></Right_Ui>
            
            {StatUi()};
        </body>
    );
};