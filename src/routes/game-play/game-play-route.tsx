import Stat_Window from './component/stat_window'
import Main from './component/main'
import Left_Ui from './component/left_ui'
import Right_Ui from './component/right_ui'
import * as React from 'react';
import './game-play-route.css';



export default function GamePlayRoute(){
    var [statUIOn, setStatUIOn] = React.useState(false);
    var body = React.useRef(null);

    function stat_window(){
        if(statUIOn){
            return <Stat_Window/>
        }
        else{
            return
        }
    }

    function stat_window_event(){
        setStatUIOn((statUIOn ? false : true))
    }
    
    // React.useEffect(game_start, [])
    return (
        <div className="game_play_body" >
            <Left_Ui></Left_Ui>
            <Main stat_window_event = {function(){stat_window_event()} }></Main>
            <Right_Ui></Right_Ui>

            {stat_window()}
        </div>
    );
};