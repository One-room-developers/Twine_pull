import * as React from 'react';
import '../game-play-route.css';

import heartLogo from "../../../styles/image/heart.png"
import heartBLogo from "../../../styles/image/heart_b.png"
import hungryLogo from "../../../styles/image/hungry.png"
import hungryBLogo from "../../../styles/image/hungry_b.png"
import moneyLogo from "../../../styles/image/money.png"
import money5Logo from "../../../styles/image/money5.png"

import { current_status, maxStatus } from '../gameDataManager';

export var health_class;
export var hungry_class;
export var money_class;

export function makeRightUI() { //우측에 있는 생명력 등의 ui를 업데이트함
    health_class.current.innerHTML = "";
    hungry_class.current.innerHTML = "";
    money_class.current.innerHTML = "";
    
    //helath의 개수가 0보다 작거나 current_status.maxHealth보다 클 수 없게 설정
    if (current_status.health < 0)
        current_status.health = 0;
    else if (current_status.health > maxStatus.health)
        current_status.health = maxStatus.health

    if (current_status.hungry < 0)
        current_status.hungry = 0;
    else if (current_status.hungry > maxStatus.hungry)
        current_status.hungry = maxStatus.hungry

    let health = current_status.health;
    let hungry = current_status.hungry;
    let money = current_status.money

    let helathImg = [];
    let helathBImg = [];
    let moneyImg = [];
    let hungryImg = [];
    let hungryBImg = [];
    let money5 = Math.floor(money / 5);

    let i = 0;


    for (i = 0; i < health; i++) {
        helathImg[i] = new Image();
        helathImg[i].className = "right-ui-img"
        helathImg[i].src = heartLogo;
        helathImg[i].width = 30;
        health_class.current.appendChild(helathImg[i]);
    }
    for (i = 0; i < maxStatus.health - health; i++) {
        helathBImg[i] = new Image();
        helathBImg[i].className = "right-ui-img"
        helathBImg[i].src = heartBLogo;
        helathBImg[i].width = 30;
        health_class.current.appendChild(helathBImg[i]);
    }

    for (i = 0; i < hungry; i++) {
        hungryImg[i] = new Image();
        hungryImg[i].className = "right-ui-img"
        hungryImg[i].src = hungryLogo;
        hungryImg[i].width = 30;
        hungry_class.current.appendChild(hungryImg[i]);
    }
    for (i = 0; i < maxStatus.hungry - hungry; i++) {
        hungryBImg[i] = new Image();
        hungryBImg[i].className = "right-ui-img"
        hungryBImg[i].src = hungryBLogo;
        hungryBImg[i].width = 30;
        hungry_class.current.appendChild(hungryBImg[i]);
    }

    if (money <= 5) {
        for (i = 0; i < money; i++) {
            moneyImg[money5 + i] = new Image();
            moneyImg[money5 + i].className = "money_img"
            moneyImg[money5 + i].src = moneyLogo;
            moneyImg[money5 + i].width = 30;
            money_class.current.appendChild(moneyImg[money5 + i]);
        }
    }
    else {
        for (i = 0; i < money5; i++) {
            moneyImg[i] = new Image();
            moneyImg[i].className = "money5_img"
            moneyImg[i].src = money5Logo;
            moneyImg[i].width = 30;
            money_class.current.appendChild(moneyImg[i]);
        }
        for (i = 0; i < money % 5; i++) {
            moneyImg[money5 + i] = new Image();
            moneyImg[money5 + i].className = "money_img"
            moneyImg[money5 + i].src = moneyLogo;
            moneyImg[money5 + i].width = 30;
            money_class.current.appendChild(moneyImg[money5 + i]);
        }
    }
}

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