import * as React from 'react';
import '../../../routes/game-play/game-play-route.css';
import bookLogo from '../../../styles/image/book-svgrepo-com.svg';
import { GameTestManager } from './gameTestManager';
import { useHistory } from 'react-router-dom';

export function vibration(){
    document.getElementById("main").classList.add("vibration");

    setTimeout(function() {
        document.getElementById("main").classList.remove("vibration");
    }, 400);
}

export default function GameTest(props) {
    const history = useHistory();
    let story = props.story;
    let passage_text_div = React.useRef(null);
    let text_view_div = React.useRef(null);
    let main_text_view_div = React.useRef(null);
    let options_div = React.useRef(null);
    let result_text_div = React.useRef(null);
    let result_option_div = React.useRef(null);
    let header_text_view_div = React.useRef(null);
    
    const [storyTitle, setStoryTitle] = React.useState("#");
    const [passageTitle, setpassageTitle] = React.useState("");
    const [passageText, setpassageText] = React.useState("");
    const [resultText, setResultText] = React.useState("");

    return (
        <div className='game_test_body'>
            <GameTestManager 
                passage_text_div = {passage_text_div}
                text_view_div = {text_view_div}
                main_text_view_div = {main_text_view_div}
                options_div = {options_div}
                result_text_div = {result_text_div}
                result_option_div = {result_option_div}
                header_text_view_div = {header_text_view_div}
                storyTitleState={[storyTitle, setStoryTitle]}
                passageTitleState={[passageTitle, setpassageTitle]}
                passageTextState={[passageText, setpassageText]}
                resultTextState = {[resultText, setResultText]}>
            </GameTestManager>
            <main id="testMain" className="testMain">
                <div className="test_text_view" ref={text_view_div}>
                    <div className="header_text_view" ref={header_text_view_div}>
                        <div className="passage_number font-game-thick">
                            <span className="story-title" >
                                {"#" + storyTitle}
                            </span>
                        </div>
                        <div className="passage_title font-game-thick">
                            {passageTitle}
                        </div>
                    </div>
                    <div className="main_text_view" ref={main_text_view_div}>
                        <div className="passage_text" ref={passage_text_div}>
                            {passageText}
                        </div>
                        <div className="options hidden font-game-thick" ref={options_div}>
                        </div>
                        <div className="result_text hidden" ref={result_text_div}>
                            {resultText}
                        </div>
                        <div className="result_option hidden" ref={result_option_div}>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};