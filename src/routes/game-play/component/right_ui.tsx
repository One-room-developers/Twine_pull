import * as React from 'react';
import '../game-play-route.css';

export var health_class;
export var hungry_class;
export var money_class;

export default function Right_Ui(){
    health_class = React.useRef(null);
    hungry_class = React.useRef(null);
    money_class = React.useRef(null);

    return (
            <div className="right_ui">
                <div className='health' ref={health_class}></div>
                <div className='hungry' ref={hungry_class}></div>
                <div className='money' ref={money_class}></div>
            </div>
    );
};