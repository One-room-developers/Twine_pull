import * as React from 'react';
import './game-play-route.css';
import bookLogo from '../../styles/image/book-svgrepo-com.svg';

export const GamePlayRoute: React.FC = () => {

    React.useEffect(() => 
    {
        var moduleA = require('./game-play-write-text.js');    
        moduleA.main()
    }, []);
    
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
                    </span>
                </div>
                <div className="episode_name font-game-thick">
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