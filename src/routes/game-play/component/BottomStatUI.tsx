import * as React from 'react';
import '../game-play-route.css';
import { current_status } from './main'
import cristal from "../../../styles/image/cristal.png"
import cristalB from "../../../styles/image/cristal_b.png"
import '../game-play-route.css';

type StatProps = {
    statUIOn : boolean
}

const InnerBottomStatUI : React.FC = () => {
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

    return ( 
        <div className="stat-ui font-game-thick">

            <div className="stat-ui-title">
            <h1>캐릭터 정보</h1>
            </div>

            <div className="stat-ui-div">
                <div className="stat-img-container">
                    <div className="stat-ui-div-text">힘</div>
                </div>
                <div className="stat-all-container">
                    <div className="cristal-div">
                    {StatIconPusher(20, current_status.strength)}
                    </div>
                </div>
            </div>

            <div className="stat-ui-div">
                <div className="stat-img-container">
                    <div className="stat-ui-div-text">민첩</div>
                </div>
                <div className="stat-all-container">
                    <div className="cristal-div">
                    {StatIconPusher(20, current_status.agility)}
                    </div>
                </div>
            </div>

            <div className="stat-ui-div">
                <div className="stat-img-container">
                    <div className="stat-ui-div-text">방어력</div>
                </div>
                <div className="stat-all-container">
                    <div className="cristal-div">
                    {StatIconPusher(20, current_status.armour)}
                    </div>
                </div>
            </div>

            <div className="stat-ui-div">
                <div className="stat-img-container">
                    <div className="stat-ui-div-text">정신력</div>
                </div>
                <div className="stat-all-container">
                    <div className="cristal-div">
                    {StatIconPusher(20, current_status.mental)}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export const BottomStatUI : React.FC<StatProps> = (props) => {
    return (
        (props.statUIOn === true) ? (<InnerBottomStatUI/>) : (<></>)
    );
};