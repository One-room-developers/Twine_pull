import * as React from 'react';
import './game-play-route.css';
import {stat} from './game-play-write_text'


export const GamePlayStatUI: React.FC = () => {
    return (
        <div className='stat-ui'>
            힘 : {stat.str}<br/>
            민첩 : {stat.dex}
        </div>
    );
};