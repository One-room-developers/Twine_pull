import { reduce } from 'lodash';
import axios from 'axios';
import * as React from 'react';
import './game-play-route.css';
import bookLogo from '../../styles/image/book-svgrepo-com.svg';

export const GamePlayRoute: React.FC = () => {

    interface Episode {
        id: number;
        title: string;
        mainText: string;
    }

    interface Options {
        text: string;
        health_change: number;
        money_change: number;
        hungry_change: number;
        strength_change: number;
        agility_change: number;
        armour_change: number;
        mental_change: number;
    }

    interface Character {
        health: number;
        money: number;
        hungry: number;
        strength: number;
        agility: number;
        armour: number;
        mental: number;
    }

    axios.get<Episode>('http://localhost:3001/game_play/episode/1')
        .then((res) => {
            console.log(res.data.mainText);
            console.log(res.data.title);
        });

    axios.get<Options[]>('http://localhost:3001/game_play/options/1')
        .then((res) => {
            console.log(res.data);
        });

    axios.get<Character>('http://localhost:3001/game_play/character/1')
        .then((res) => {
            console.log(res.data.health);
        })

    React.useEffect(() => 
    {
        var moduleA = require('./game-play-write-text.js');    
        moduleA.main()
    }, [])
    

    return(
    <body className="game_play_body">
    <div className="game_play-left_ui"></div>
    
    <main className="game_play-main">
        <div className="episode_logo">
            <img className="icon-book" src={bookLogo} alt=""/>
        </div>
        <div className="episode_logo_line"></div>
        <div className="text_view">
            <div className="text_view-header">
                <div className="episode_number font-game-thick">
                    <span className="episode_number_text">
                        #0 서막    
                    </span>
                </div>
                <div className="episode_name font-game-thick">
                        모험의 시작
                </div>
            </div>
            <div className="text_view-main">
                <div className="episode_text">
                </div>
                <div className="episode_option hidden font-game-thick">
                </div>
                <div className="episode_result_text hidden">
                </div>
                <div className="episode_result_option hidden">
                </div>
            </div>
        </div>
        <div className="game_play-main_ui">
            <button className="main-ui-btn font-game-thin">능력치</button>
            <button className="main-ui-btn font-game-thin">SAVE</button>
            <button className="main-ui-btn font-game-thin">인벤토리</button>
            <button className="main-ui-btn font-game-thin">환경설정</button>
        </div>
    </main>

    <div className="game_play-right_ui"></div>
</body>
    );
};