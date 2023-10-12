import * as React from 'react';
import './select-route.css';
import swordLogo from '../../styles/image/sword-svgrepo-com.svg';
import writeLogo from '../../styles/image/write-svgrepo-com.svg';
import GameMode from './game_mode'
import UserDialog from './components copy/UserDialog';

//function
import {checkAccessToken} from '../authApi';
//component

export const SelectRoute: React.FC = () => {
    var [modeHidden, setmodeHidden] = React.useState(true);

    return(
        <body className="select-body">
            <main className="select-main">
                <div className="game__section">
                    <div></div>
                    <div className="display-flex flex-direction-column justify-align-center introduce-game-animation">
                        <div className="svg-container1">
                            <img className="icon-sword" src={swordLogo} alt="" />
                        </div>
                        <div className="center-line1"></div>
                        <h1 className="font-game-thick introduce-game">
                            당신의 선택이 만들어나가는 모험
                        </h1>
                    </div>
                    <div className="appear-animation" onClick={function(){setmodeHidden(false)}}>
                        <div className="game-start-btn" >
                            <h1 className="font-game-thick">게임 시작하기</h1>
                        </div>
                    </div>

                    <div></div>
                </div>
                <div className="create__section">
                    <div></div>
                    <div className="display-flex flex-direction-column justify-align-center introduce-create-animation">
                        <div className="svg-container2">
                            <img className="icon-write" src={writeLogo} alt="" />
                        </div>
                        <div className="center-line2"></div>
                        <h1 className="font-game-thick introduce-create">
                            나만의 스토리를 만들어 게임 제작에 참여하세요
                        </h1>
                    </div>
                    <a href="/#/story-list">
                        <div className="appear-animation2">
                            <div className="episode-make-btn">
                                <h1 className="font-game-thick">에피소드 만들기</h1>
                            </div>
                        </div>
                    </a>
                    <div></div>
                </div>
            </main>
            <footer className="select-footer"></footer>
            
            <GameMode hidden = {modeHidden}
                hiddenOff = {
                    function(){
                        setmodeHidden(true);
                    }
                }
            />
        </body>
    );
};