import * as React from 'react';
import '../game-play-route.css';
import bookLogo from '../../../styles/image/book-svgrepo-com.svg';
import { GamePlay } from '../gamePlay';


export default function Main(props) {

    let episode_text = React.useRef(null);
    let text_view = React.useRef(null);
    let main_text_view = React.useRef(null);
    let episode_option = React.useRef(null);
    let episode_result_text = React.useRef(null);
    let episode_result_option = React.useRef(null);
    let header_text_view = React.useRef(null);
    let episode_title = React.useRef(null);
    let episode_number_text = React.useRef(null);

    return (
        <>
            <GamePlay 
                episode_text = {episode_text}
                text_view = {text_view}
                main_text_view = {main_text_view}
                episode_option = {episode_option}
                episode_result_text = {episode_result_text}
                episode_result_option = {episode_result_option}
                header_text_view = {header_text_view}
                episode_title = {episode_title}
                episode_number_text = {episode_number_text}>
            </GamePlay>
            <main className="main">
                <div className="episode_logo">
                    <img className="icon-book" src={bookLogo} alt="" />
                </div>
                <div className="episode_logo_line"></div>
                <div className="text_view" ref={text_view}>
                    <div className="header_text_view" ref={header_text_view}>
                        <div className="episode_number font-game-thick">
                            <span className="episode_number_text" ref={episode_number_text}>
                                {/* #n */}
                                #0
                            </span>
                        </div>
                        <div className="episode_title font-game-thick" ref={episode_title}>
                            {/* 제목 */}
                            불러오는 중...
                        </div>
                    </div>
                    <div className="main_text_view" ref={main_text_view}>
                        <div className="episode_text" ref={episode_text}>
                            {/* 내용 */}
                        </div>
                        <div className="episode_option hidden font-game-thick" ref={episode_option}>
                            {/* 선택지 */}
                        </div>
                        <div className="episode_result_text hidden" ref={episode_result_text}>
                        </div>
                        <div className="episode_result_option hidden" ref={episode_result_option}>
                        </div>
                    </div>
                </div>
                <div className="main_ui">
                    <button className="main-ui-btn font-game-thin" onClick={function () { props.stat_window_event() }}>능력치</button>
                    <button className="main-ui-btn font-game-thin">SAVE</button>
                    <button className="main-ui-btn font-game-thin">인벤토리</button>
                    <button className="main-ui-btn font-game-thin">환경설정</button>
                </div>
            </main>
        </>
    );
};