import * as React from 'react';
import './game-play-route.css';
import { current_status } from './game-play-write_text'


export const GamePlayStatUI: React.FC = () => {
    return (
        <div className='stat-ui'>
            힘 : {current_status.strength}<br/>
            민첩 : {current_status.agility}
        </div>
    );
};