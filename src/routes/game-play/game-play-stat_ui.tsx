import * as React from 'react';
import './game-play-route.css';
import { current_status } from './game-play-write_text'
import { GamePlayRoute } from './game-play-route';
import cristal from "../../styles/image/cristal.png"
import cristalB from "../../styles/image/cristal_b.png"
import './game-play-route.css';


// function StatIconPusher(){
//     return(
//         <img src={cristal} width='30px'/>
//     )
// }
function StatIconPusher(maxWidth : number, currentWidth : number){
    var cristal_arr = [];
    for(var i = 0; i< currentWidth; i++){
        cristal_arr.push(<img src={cristal} className = "cristal"/>)
    }
    for(var i = 0; i< maxWidth-currentWidth; i++){
        cristal_arr.push(<img src={cristalB} className = "cristal"/>)
    }
    return cristal_arr
}
export const GamePlayStatUI: React.FC = (
) => {
    return (
    <div className="stat-ui font-game-thick">

        <div className="stat-ui-title">
        <h1>캐릭터 정보</h1>
        </div>

        <div className="stat-ui-div">
        <div className="stat-img-container">

        </div>
        <div className="stat-all-container">
            <div className="stat-ui-div-text">힘</div>
            <div className="cristal-div">
            {StatIconPusher(20, current_status.strength)}
            </div>
        </div>
        </div>

        <div className="stat-ui-div">민첩 : {current_status.agility}</div>
        <div className="stat-ui-div">방어력 :{current_status.armour}</div>
        <div className="stat-ui-div">정신력 : {current_status.mental}</div>

    </div>
    );
};