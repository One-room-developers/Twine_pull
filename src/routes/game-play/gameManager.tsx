import React, { MutableRefObject, useState } from "react";
import { Status, MainProps, NextStoryAndPassages, NextStory, NextPassage, NextOption , current_status, default_status} from "../../store/stories/gameManager.types";
import { makeRightUI } from "./component/right_ui";
import axios from 'axios';
import { useHistory } from "react-router";

let lastStoryArr : string[] = [];
let story : NextStory = null;
let passages : NextPassage[] = null;
let options : NextOption[][] = null; ;
let currentOptions : NextOption[] = null;
let currentPassage : NextPassage = null;
let nextPassageName : string = null;
let status_change: Status[];
let isGameStart = true;
let isGameOver = false;
let isStoryEnd = false;



export const GameManager : React.FC<MainProps> = (props) => {
    let passage_text_div = props.passage_text_div
    let text_view_div = props.text_view_div
    let main_text_view_div = props.main_text_view_div
    let options_box_div = props.options_box_div
    let result_text_div = props.result_text_div
    let result_option_div = props.result_option_div
    let header_text_view_div = props.header_text_view_div
    const [optionDivs, setOptionDivs] = props.optionDivs;
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

        story_start();
        await wait(1500);
        makeRightUI()
    }
    async function story_start(){
        isStoryEnd = false;

        await getNextStoryAndPassages(current_status, lastStoryArr);
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
            while(isTypingEnd === false) {
                await new Promise<void>((resolve, reject) => {
                    //episode 타이핑 시작
                    setTimeout(async function () {
                        try{
                            await typing_text(typingIndex);
                            typingIndex++;
                            resolve();
                        }
                        catch{
                            return;
                        }
                    }, 20);
                })
            }

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

    async function typing_text(typingIndex : number) { //텍스트 한 글자 타이핑
        let text = currentPassage.visibleText
        //클릭을 안했다면 수행
        if (isClickToSkipText !== true) {
            if (typingIndex < text.length) {
                // 타이핑될 텍스트 길이만큼 반복
                print_txt += text[typingIndex]
                setPassageText(print_txt)
                if (text[typingIndex] === ".") {
                    await wait(100);
                }

                //글자가 페이지를 넘어간다면
                if (text_view_div.current.clientHeight * height_multiple < passage_text_div.current.clientHeight + header_text_view_div.current.clientHeight) {
                    main_text_view_div.current.style.height = `${(text_view_div.current.clientHeight * height_multiple + basicSize_of_mainTextViewDiv)}px`;
                    moveScrollBottom();
                    height_multiple++;
                    await wait(100);
                }
            }
            else {
                isTypingEnd =true
            }
        }
        //클릭을 했다면 탈출
        else {
            isTypingEnd =true
            setPassageText(text);
            text_view_div.current.removeEventListener("click", click_on);
        }
    }

<<<<<<< HEAD
    function makeOptionDiv(optionTexts : string[]) {
        let lists = [];
=======
    function makeOptionDiv() {
        
        let optionDiv = [];
>>>>>>> 0d3b0cba4a7a42dcdf9119857bf50e1151b7d852

        optionTexts.forEach((optionText, i) => {
            lists.push(
                <div 
                    className="option_div" 
                    id={i.toString()}
                    onClick={
                        function(){
                            if(!isGameOver){
                                makeResultText(i);
                            }
                            else{history.push("/select");}
                        }
                    }>
                        {optionText}
                </div>
            ) 
        })
        setOptionDivs(lists) 
        //hidden 풀어서 option Div가 보이게 해줌
        options_box_div.current.classList.remove("hidden");
        //text div의 높이를 설정해줘서 option div가 맨 아래에 위치하도록 하는 코드 코드
        const optionsDivHeight = options_box_div.current.clientHeight
        const headerTextViewDivHeight = header_text_view_div.current.clientHeight
        passage_text_div.current.style.height = `${basicSize_of_textViewDiv - optionsDivHeight - headerTextViewDivHeight}px`;
    }

    function makeResultText(optionIndex: number) {
        result_text_div.current.classList.remove("hidden");
        //다음 passage 미리 설정
        nextPassageName = currentOptions[optionIndex].nextNormalPassage;
        // 선택지를 고른 후 캐릭터 스테이터스 업데이트

        let result_txt = "\n" + currentOptions[optionIndex].afterStory + "\n\n"
        let isStatChanged = false;

        //stat 증가량 텍스트 입력
        for (let statName in status_change[optionIndex]) {
            if (status_change[optionIndex][statName] != 0) {
                isStatChanged = true;
                let statMessage;
                switch(statName){
                    case 'health':
                        statMessage="체력이"
                        break;
                    case 'money':
                        statMessage="돈이"
                        break;
                    case 'hungry':
                        statMessage="허기가"
                        break;
                }
                if (status_change[optionIndex][statName] < 0){
                    result_txt += statMessage + " " + status_change[optionIndex][statName] + "만큼 줄었습니다\n"
                    setResultText(result_txt);
                }
                else{
                    result_txt += statMessage + status_change[optionIndex][statName] + "만큼 늘었습니다\n"
                    setResultText(result_txt);
                }
            }
        }
        changeStatus(status_change[optionIndex])

        //result div를 만들어줌
        makeResultOptionDiv();
        result_text_div.current.style.height = `${(basicSize_of_textViewDiv) - (result_option_div.current.clientHeight)}px`;
        moveScrollBottom();
        //ui 업데이트
        if(isStatChanged)
            makeRightUI(); 
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

        moveScrollBottom();
        height_multiple++;
    }

    function passageEnd() {
        debugger;
        resetTextDiv();

        //배고픔이 0이면
        if(current_status.hungry <= 0){
            //체력 1깎음
            changeStatus({hungry : -1})
        }

        //배고픔이 0이하고 체력이 정확히 0이면, 유저가 체력이 1남은 상태에서 배고픔으로 죽었다는 것.
        if(current_status.hungry <= 0 && current_status.health === 0){
            isGameOver = true
            setPassageTitle("허기를 이기지 못하고");
            currentPassage.visibleText = "식량이 부족한 결과 당신은 모든 기력을 소진했습니다. 당신은 굶주렸지만 까마귀들은 포식하겠군요."
        }
        else if (current_status.health <= 0){//배고픔이 0이 아닌 상태에서 체력이 0이되었거나, 유저가 체력1 배고픔0에서 체력-1을 선택한 경우
            isGameOver = true
<<<<<<< HEAD
            setPassageTitle("끝은 갑작스럽게");
            currentPassage.visibleText = "몸이 움직이지 않습니다. 눈앞이 아득해지고, 몹시 추워집니다. 당신은 죽었습니다"
=======
            setPassageTitle("끝은 언제나 갑작스럽게");
            body_text = "몸이 움직이지 않습니다. 눈앞이 아득해지고, 몹시 추워집니다. 당신은 죽었습니다"
>>>>>>> 0d3b0cba4a7a42dcdf9119857bf50e1151b7d852
        }else{  //게임이 종료되지 않았다면
            if (nextPassageName !== null && nextPassageName !== ""){
                currentPassage = passages.find(passage => (passage.name === nextPassageName))
                currentOptions = getCurrentOptions(passages, currentPassage, options);        
                setValues();
            }
            else{
                isStoryEnd = true
                lastStoryArr.push(story.pk)
            }
        }
        debugger;
        //passage를 끝내면 useEffect가 다시 실행됨
        setIsPassageEnd(true)
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
        options_box_div.current.innerHTML = "";
        result_option_div.current.innerHTML = "";
        main_text_view_div.current.style.height = "auto";
        options_box_div.current.classList.add("hidden");
        result_text_div.current.classList.add("hidden");
        result_option_div.current.classList.add("hidden");
    }


    async function wait(timeToDelay){
        return new Promise((resolve) => setTimeout(resolve, timeToDelay))
    } //timeToDelay만큼 코드를 대기시키는 함수

    async function getNextStoryAndPassages(currentStat: Status, lastStoryArr: string[]){
        const response = await axios({
            method : "POST",
            url: `${process.env.REACT_APP_API_URL}/game_play/get_next_episode`,
            data: {
                genre: 1,
                //currentStat: currentStat,
                lastStoryArr: lastStoryArr,
            }
        });
    
        const data = response.data;
        debugger;
        story = getStory(data);
        passages = getPassages(data);
        options = getOptions(data);
        currentPassage = getStartPassage(story, passages);
        currentOptions = getStartOptions(story, passages, options)
        setValues();
    }

    function setValues(){
        //episode_number
        setStoryName(story.name);
        //episode_title
        setPassageTitle(currentPassage.name);

        let dummyStatusChange : Status[] = []
        currentOptions.forEach((option, index) => {
            dummyStatusChange[index] = {
                health : 0,
                money : 0,
                hungry : 0
            }
            switch(option.status1){
                case "health" : 
                    dummyStatusChange[index].health = option.status1Num
                    break;
                case "money" :
                    dummyStatusChange[index].money = option.status1Num
                    break;
                case "hungry" :
                    dummyStatusChange[index].hungry = option.status1Num
                    break;
                default :
                    console.log("잘못된 stat 입력 - "+option.status1)
            }
            switch(option.status2){
                case "health" : 
                    dummyStatusChange[index].health = option.status2Num
                    break;
                case "money" :
                    dummyStatusChange[index].money = option.status2Num
                    break;
                case "hungry" :
                    dummyStatusChange[index].hungry = option.status2Num
                    break;
                default :
                    console.log("잘못된 stat 입력 - "+option.status2)
            }
        })
        status_change = dummyStatusChange;
    }

    function getOptions(data : NextStoryAndPassages){
        return data.nextOptions;
    }
    
    function getPassages(data : NextStoryAndPassages){
        return data.nextPassages;
    }

    function getStory(data : NextStoryAndPassages){
        return data.nextStory;
    }
    
    function getStartPassage(story : NextStory, passages : NextPassage[]){
        for(let i = 0; i<passages.length; i++){
            if(passages[i].id === story.startPassage)
                return passages[i]
        }
    }
    function getStartOptions(story : NextStory, passages : NextPassage[], options : NextOption[][]){
        for(let i = 0; i<passages.length; i++){
            if(passages[i].id === story.startPassage)
                return options[i]
        }
    }
    function getCurrentOptions(passages : NextPassage[], currentPassage : NextPassage, options : NextOption[][]) : NextOption[]{
        let i = 0
        passages.forEach((passage, index) => {
            if(currentPassage.name === passage.name){
                i = index;
                return;
            }
        })
        return options[i];
    }

    function resetStatus(){
        current_status.health = default_status.health;
        current_status.hungry = default_status.hungry;
        current_status.money = default_status.money;
    }

    function changeStatus(changeStatus : Partial<Status>){
        current_status.health += changeStatus.health;
        current_status.hungry += changeStatus.hungry;
        current_status.money += changeStatus.money;
    }

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

