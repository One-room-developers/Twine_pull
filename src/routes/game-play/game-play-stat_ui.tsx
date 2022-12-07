import * as React from 'react';
import './game-play-route.css';
import { current_status } from './game-play-write_text'
import { GamePlayRoute } from './game-play-route';


export const GamePlayStatUI: React.FC = (
) => {
    return (
        <div className='stat-ui'>
            힘 : {current_status.strength}<br/>
            민첩 : {current_status.agility}<br/>
            방어력 :{current_status.armour}<br/>
            정신력 : {current_status.mental}<br/>
        </div>
    );
};