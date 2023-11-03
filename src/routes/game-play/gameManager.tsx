import React, { MutableRefObject, useState } from "react";
import { Status, MainProps, NextStoryAndPassages, NextStory, NextPassage, NextOption} from "../../store/stories/gameManager.types";
import { current_status, default_status, getNextStoryAndPassages, changeStatus, getStatusChange, getCurrentPassageAndOptions } from "./gameDataManager";
import { makeRightUI } from "./component/right_ui";
import { useHistory } from "react-router";
import { startEpisode, BadEndEpisodeByHungry, BadEndEpisodeByHealth, HappyEndEpisode } from "./mainepisode";
import { Passage } from "../../store/stories";

let lastStoryArr : string[] = [];
let story : NextStory = null;
let passages : NextPassage[] = null;
let options : NextOption[][] = null; ;
let currentOptions : NextOption[] = null;
let currentPassage : NextPassage = null;
let nextPassageName : string = null;
let statusChange: Status[];
let isGameStart = true;
let isGameOver = false;
let isStoryEnd = false;
let happyEndTime = 5;

export const GameManager : React.FC<MainProps> = (props) => {
    let passage_text_div = props.passage_text_div
    let text_view_div = props.text_view_div
    let main_text_view_div = props.main_text_view_div
    let options_div = props.options_div
    let result_text_div = props.result_text_div
    let result_option_div = props.result_option_div
    let header_text_view_div = props.header_text_view_div
    const [passageTitle, setPassageTitle] = props.passageTitleState;
    const [storyName, setStoryName] = props.storyTitleState
    const [passageText, setPassageText] = props.passageTextState
    const [resultText, setResultText] = props.resultTextState
    
    const [isPassageEnd, setIsPassageEnd] = useState(false);
    const history = useHistory();

    let isTypingEnd : boolean = false;
    let isClickToSkipText: boolean = false;

    
    let print_txt : string = "";
    let height_multiple: number = 1;
    let basicSize_of_textViewDiv : number = 0;
    let basicSize_of_mainTextViewDiv: number = 0;


    async function game_start(){
        isGameStart = false;

        [story, passages, options] = startEpisode;
        story_start(true);

        await wait(1500);
        makeRightUI()
    }

    async function story_start(start ?: boolean){
        isStoryEnd = false;

        if(start !== true && isGameOver !== true){ //game start때는 따로 데이터를 가져옴
            [story, passages, options] = await getNextStoryAndPassages(current_status.health, lastStoryArr);
        }
        let startPassage : NextPassage = passages.find(passage => story.startPassage === passage.id);
        [currentPassage, currentOptions, statusChange] = getCurrentPassageAndOptions(passages, options, startPassage.name);
        setStoryName(story.name);
        setPassageTitle(currentPassage.name);

        passage_start();
    }

    async function passage_start() {
        setIsPassageEnd(false);
        await wait(2000);

        print_txt = passageText;
        basicSize_of_textViewDiv = text_view_div.current.clientHeight;
        basicSize_of_mainTextViewDiv = main_text_view_div.current.clientHeight;

        //클릭하면 텍스트 한번에 출력되는 이벤트 리스너 추가
        text_view_div.current.addEventListener("click", click_on);

        //passage의 텍스트 타이핑 시작
        let promise = async function () {
            let typingIndex = 0;
            debugger;
            while(isTypingEnd === false) {
                await new Promise<void>((resolve, reject) => {
                    
                    //episode 타이핑 시작
                    setTimeout(async function () {
                        try{
                            await typing_text(typingIndex, currentPassage.visibleText, 'passage');
                            typingIndex++;
                            resolve();
                        }
                        catch{
                            return;
                        }
                    }, 20);
                })
            }
            await wait(100)
            //promise 쓴 이유
            //episode 타이핑이 끝난 후 옵션 div 생성
            if(!isGameOver){
                let optionTexts = currentOptions.map(option => {
                    return option.optionVisibleName
                })
                makeOptionDiv(optionTexts);
            }
            else{
                makeOptionDiv(["로비로..."]);
            }
        }
        promise();
    }

    async function typing_text(typingIndex : number, text_ : string, mode : string) { //텍스트 한 글자 타이핑
        let text = text_
        //클릭을 안했다면 수행
        if (isClickToSkipText !== true) {
            if (typingIndex < text.length) {
                // 타이핑될 텍스트 길이만큼 반복
                print_txt += text[typingIndex]
                
                if(mode === 'passage')
                    setPassageText(print_txt)
                else if(mode === 'result')
                    setResultText(print_txt)
                if (text[typingIndex] === ".") {
                    await wait(100);
                }

                //글자가 페이지를 넘어간다면
                if(mode === 'passage'){
                    if (text_view_div.current.clientHeight * height_multiple < passage_text_div.current.clientHeight + header_text_view_div.current.clientHeight) {
                        main_text_view_div.current.style.height = `${(text_view_div.current.clientHeight * height_multiple + basicSize_of_mainTextViewDiv)}px`;
                        moveScrollBottom();
                        height_multiple++;
                        await wait(100);
                    }
                }
            }
            else {
                isTypingEnd =true
            }
        }
        //클릭을 했다면 탈출
        else {
            isTypingEnd =true
            if(mode === 'passage'){
                setPassageText(text);
                text_view_div.current.removeEventListener("click", click_on);
            }
            else if(mode === 'result'){
                setResultText(text);
                text_view_div.current.removeEventListener("click", click_on);
            }
        }
    }

    function makeOptionDiv(optionTexts : string[]) {

        optionTexts.forEach((optionText, i) => {
            let optionDiv = document.createElement('div');
            optionDiv.className = "option_div";
            optionDiv.innerText = optionText;
            optionDiv.id = i.toString()
            optionDiv.addEventListener('click', (e: any) => {  
                if(!isGameOver){
                makeResultText(i);
                }
                else{history.push("/select");} 
            }); //result div를 누르면 이번 passage를 끝냄
            options_div.current.appendChild(optionDiv);
        })
        //hidden 풀어서 option Div가 보이게 해줌
        options_div.current.classList.remove("hidden");
        //text div의 높이를 설정해줘서 option div가 맨 아래에 위치하도록 하는 코드 코드
        const passageTextDivHeight = passage_text_div.current.clientHeight
        const optionsDivHeight = options_div.current.clientHeight
        const headerTextViewDivHeight = header_text_view_div.current.clientHeight
        if(basicSize_of_textViewDiv < headerTextViewDivHeight+passageTextDivHeight+optionsDivHeight){
            main_text_view_div.current.style.height = `${passageTextDivHeight+optionsDivHeight}px`;
            moveScrollBottom()
        }
        else{
            passage_text_div.current.style.height = `${basicSize_of_textViewDiv - optionsDivHeight - headerTextViewDivHeight}px`;
        }
    }

    async function makeResultText(optionIndex: number) {
        //다음 passage 미리 설정
        nextPassageName = currentOptions[optionIndex].nextNormalPassage;
        // 선택지를 고른 후 캐릭터 스테이터스 업데이트

        let result_txt = '\n'+currentOptions[optionIndex].afterStory+'\n'
        let isStatChanged = false;

        //stat 증가량 텍스트 입력
        for (let statName in statusChange[optionIndex]) {
            if (statusChange[optionIndex][statName] != 0) {
                isStatChanged = true;
                let statMessage;
                switch(statName){
                    case 'health':
                        statMessage="생명력이"
                        break;
                    case 'money':
                        statMessage="돈이"
                        break;
                    case 'hungry':
                        statMessage="포만감이"
                        break;
                }
                if (statusChange[optionIndex][statName] < 0){
                    result_txt += statMessage + " " + statusChange[optionIndex][statName] + "만큼 줄었습니다\n"
                }
                else{
                    result_txt += statMessage + statusChange[optionIndex][statName] + "만큼 늘었습니다\n"
                }
            }
        }
        let promise = async function () {
            let typingIndex = 0;
            print_txt = ""
            isTypingEnd = false;
            isClickToSkipText = false;
            main_text_view_div.current.style.height = `${main_text_view_div.current.clientHeight+basicSize_of_textViewDiv}px`;
            result_text_div.current.classList.remove("hidden");
            moveScrollBottom()
            await wait(500)
            while(isTypingEnd === false) {
                if(typingIndex>5)
                    text_view_div.current.addEventListener("click", click_on);
                await new Promise<void>((resolve, reject) => {
                    //episode 타이핑 시작
                    setTimeout(async function () {
                        try{
                            await typing_text(typingIndex, result_txt, 'result');
                            typingIndex++;
                            resolve();
                        }
                        catch{
                            return;
                        }
                    }, 20);
                })
            }

            await wait(100)
            // setResultText(result_txt);
            changeStatus(statusChange[optionIndex])
            //result div를 만들어줌
            
            makeResultOptionDiv();
            
            moveScrollBottom();
            //ui 업데이트
            if(isStatChanged)
                makeRightUI(); 
        }
        promise();
    }

    function makeResultOptionDiv() {
        let resultDiv: any;
        resultDiv = document.createElement('div');
        resultDiv.className = "result_div font-game-thick";

        if (!isGameOver) {
            resultDiv.innerText += "다음으로 . . .";
            resultDiv.addEventListener('click', (e: any) => { passageEnd() }); //result div를 누르면 이번 passage를 끝냄
        }
        result_option_div.current.appendChild(resultDiv);
        result_option_div.current.classList.remove("hidden");

        const resultTextDivHeight = result_text_div.current.clientHeight
        const resultOptionsDivHeight = result_option_div.current.clientHeight
        const headerTextViewDivHeight = header_text_view_div.current.clientHeight
        if(basicSize_of_textViewDiv < resultTextDivHeight+resultOptionsDivHeight){
            main_text_view_div.current.style.height = `${main_text_view_div.current.clientHeight-basicSize_of_textViewDiv+resultTextDivHeight+resultOptionsDivHeight}px`;
        }
        else{
            result_text_div.current.style.height = `${basicSize_of_textViewDiv-resultOptionsDivHeight}px`;
        }
        height_multiple++;
    }

    function passageEnd() {
        
        resetTextDiv();

        //배고픔이 0이면
        if(current_status.hungry <= 0){
            //체력 1깎음
            changeStatus({health : -1})
        }

        if(current_status.hungry <= 0){
            gameEnd('bad', 'hungry')
        }
        else if (current_status.health <= 0){//배고픔이 0이 아닌 상태에서 체력이 0이되었거나, 유저가 체력1 배고픔0에서 체력-1을 선택한 경우
            gameEnd('bad', 'health')
        }
        else{
            if (nextPassageName === null || nextPassageName === ""){ // story가 끝
                storyEnd()
            }
            else{
                [currentPassage, currentOptions, statusChange] = getCurrentPassageAndOptions(passages, options, nextPassageName)
                setStoryName(story.name);
                setPassageTitle(currentPassage.name);
            }
        }
        if(happyEndTime <= 0){  //게임이 종료되지 않았다면
            gameEnd('happy', '')
        }
        //passage를 끝내면 useEffect가 다시 실행됨
        setIsPassageEnd(true)
    }

    function storyEnd(){
        happyEndTime -= 1;
        isStoryEnd = true
        lastStoryArr.push(story.pk)
    }

    function gameEnd(endingType : string, endingCause : string){
        isGameOver = true

        if(endingType === 'happy'){
            [story, passages, options] = HappyEndEpisode;
            debugger;
        }
        else if(endingType === 'bad'){
            switch(endingCause){
                case 'hungry' : 
                    [story, passages, options] = BadEndEpisodeByHungry;
                    break;
                case 'health' :
                    [story, passages, options] = BadEndEpisodeByHealth;
                    break;
                default :
                    alert("endingType 입력 실패");
                    break;
            }
        }
        else{
            alert("ending type 입력 실패")
        }
        debugger;
        [currentPassage, currentOptions, statusChange] = getCurrentPassageAndOptions(passages, options, story.startPassage);
        setStoryName(story.name);
        setPassageTitle(currentPassage.name);
        debugger;
    }


    function click_on() {
        isClickToSkipText = true
    }

    function moveScrollBottom() {
        let location = text_view_div.current.scrollHeight;
        text_view_div.current.scrollTo({ top: location, behavior: "smooth" });
    }

    function resetTextDiv() {
        setPassageText("");
        setPassageTitle("")
        setResultText("");
        options_div.current.innerHTML = "";
        result_option_div.current.innerHTML = "";
        main_text_view_div.current.style.height = "auto";
        result_text_div.current.style.height = "auto"
        options_div.current.classList.add("hidden");
        result_text_div.current.classList.add("hidden");
        result_option_div.current.classList.add("hidden");
    }


    async function wait(timeToDelay){
        return new Promise((resolve) => setTimeout(resolve, timeToDelay))
    } //timeToDelay만큼 코드를 대기시키는 함수



    React.useEffect(() => 
        {
            
            if(isGameStart === true){
                game_start()
            }
            else if(isStoryEnd === true){
                story_start()
            }
            else if(isPassageEnd === true){
                passage_start()
            }
        }, [isPassageEnd]) 

    return (
        <></>
    );  
};

