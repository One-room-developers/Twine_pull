import * as React from 'react';
import '../game-play-route.css';
import bookLogo from '../../../styles/image/book-svgrepo-com.svg';
import { GameManager } from '../gameManager';


export default function Main(props) {

    let episode_text_div = React.useRef(null);
    let text_view_div = React.useRef(null);
    let main_text_view_div = React.useRef(null);
    let episode_option_div = React.useRef(null);
    let episode_result_text_div = React.useRef(null);
    let episode_result_option_div = React.useRef(null);
    let header_text_view_div = React.useRef(null);
    const [episodeNumberText, setEpisodeNumberText] = React.useState(0);
    const [episodeTitle, setEpisodeTitle] = React.useState("불러오는 중");
    const [episodeText, setEpisodeText] = React.useState("");
    const [episodeResultText, setEpisodeResultText] = React.useState("");

    return (
        <>
            <GameManager 
                episode_text_div = {episode_text_div}
                text_view_div = {text_view_div}
                main_text_view_div = {main_text_view_div}
                episode_option_div = {episode_option_div}
                episode_result_text_div = {episode_result_text_div}
                episode_result_option_div = {episode_result_option_div}
                header_text_view_div = {header_text_view_div}
                episodeNumberTextState={[episodeNumberText, setEpisodeNumberText]}
                episodeTitleState={[episodeTitle, setEpisodeTitle]}
                episodeTextState={[episodeText, setEpisodeText]}
                episodeResultText = {[episodeResultText, setEpisodeResultText]}>
            </GameManager>
            <main className="main">
                <div className="episode_logo">
                    <img className="icon-book" src={bookLogo} alt="" />
                </div>
                <div className="episode_logo_line"></div>
                <div className="text_view" ref={text_view_div}>
                    <div className="header_text_view" ref={header_text_view_div}>
                        <div className="episode_number font-game-thick">
                            <span className="episode_number_text" >
                                {"#" + episodeNumberText}
                            </span>
                        </div>
                        <div className="episode_title font-game-thick">
                            {episodeTitle}
                        </div>
                    </div>
                    <div className="main_text_view" ref={main_text_view_div}>
                        <div className="episode_text" ref={episode_text_div}>
                            {episodeText}
                        </div>
                        <div className="episode_option hidden font-game-thick" ref={episode_option_div}>
                            {/* 선택지 */}
                        </div>
                        <div className="episode_result_text hidden" ref={episode_result_text_div}>
                            {episodeResultText}
                        </div>
                        <div className="episode_result_option hidden" ref={episode_result_option_div}>
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