import React, { MutableRefObject, useState } from "react";
import { Status, MainProps, NextStoryAndPassages, NextStory, NextPassage, NextOption } from "../../store/stories/gameManager.types";
import heartLogo from "../../styles/image/heart.png"
import heartBLogo from "../../styles/image/heart_b.png"
import hungryLogo from "../../styles/image/hungry.png"
import hungryBLogo from "../../styles/image/hungry_b.png"
import moneyLogo from "../../styles/image/money.png"
import money5Logo from "../../styles/image/money5.png"
import axios from 'axios';
import { health_class } from './component/right_ui';
import { money_class } from './component/right_ui';
import { hungry_class } from './component/right_ui';

let lastStoryArr : string[] = [];
let story : NextStory = null;
let passages : NextPassage[] = null;
let options : NextOption[][] = null; ;
let currentOptions : NextOption[] = null;
let currentPassage : NextPassage = null;
let nextPassageName : string = null;
let body_text: string;
let status_change: Status[];
let isGameStart = true;
let isGameOver = false;
let isStoryEnd = false;

export let current_status: Status = {
    health : 3,
    hungry : 3,
    money : 3
};


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

    let isTypingEnd = false;

    // const [lastStoryArr, setLastStoryArr] = useState<string[]>([]) 
    // const [story, setStory] = useState<NextStory>(null)
    // const [passages, setPassages] = useState<NextPassage[]>(null) 
    // const [options, setOptions] = useState<NextOption[][]>(null) 
    // const [currentOptions, setCurrentOptions] = useState<NextOption[]>(null)
    // const [currentPassage, setCurrentPassage] = useState<NextPassage>(null)
    // const [nextPassageName, setNextPassageName] = useState<string>(null)

    let print_txt : string = passageText;
    let result_txt : string = resultText;
    
    // let main_episode: Episode[];
    // let normal_episode : Episode;

    let maxHealth: number = 5;
    let maxHungry: number = 5;

    // let option_text: Option_Texts[];

    let split_txt_arr: string[];
    let stop_typing_time: number;
    let click: boolean;
    let typingIdx: number;
    let height_multiple: number;
    let basicSize_of_textViewDiv : number
    let basicSize_of_mainTextViewDiv: number;



    async function passage_start() {
        //db 업데이트
        if(isGameStart === true || isStoryEnd === true){
            await getNextStoryAndPassages(current_status, lastStoryArr);
            // await getMainEpisodeDataFromDB();
            // await getCurrentStatusFromDB();
            isGameStart = false
            isStoryEnd = false
        }
        

        await wait(2000);

        stop_typing_time = 0;
        click = false;
        typingIdx = 0;
        height_multiple = 1;
        basicSize_of_textViewDiv = text_view_div.current.clientHeight;
        basicSize_of_mainTextViewDiv = main_text_view_div.current.clientHeight;
        split_txt_arr = body_text.split(""); // 한글자씩 잘라 배열로 저장한다.

        //클릭하면 텍스트 한번에 출력되는 이벤트 리스너 추가
        text_view_div.current.addEventListener("click", click_on);

        //passage의 텍스트 타이핑 시작
        let promise = async function () {
            while(isTypingEnd === false) {
                await new Promise<void>((resolve, reject) => {
                    //episode 타이핑 시작
                    setTimeout(function () {
                        try{
                            typing_text();
                            resolve();
                        }
                        catch{
                            return;
                        }
                    }, 20);
                })
            }
            debugger;

            //promise 쓴 이유
            //episode 타이핑이 끝난 후 옵션 div 생성
            makeOptionDiv();
        }
        promise();
    }

    function typing_text() { //텍스트 한 글자 타이핑
        debugger;
        //클릭을 안했다면 수행
        if (click !== true) {
            if (typingIdx < split_txt_arr.length) {
                // 타이핑될 텍스트 길이만큼 반복
                if (stop_typing_time !== 0) {
                    stop_typing_time -= 1;
                }
                else {
                    print_txt += split_txt_arr[typingIdx]
                    setPassageText(print_txt)
                    if (split_txt_arr[typingIdx] === ".") {
                        stop_typing_time = 10; //온점이 나오면 10번의 반복 기간동안 쉼
                    }
                    typingIdx++;

                    //글자가 페이지를 넘어간다면
                    if (text_view_div.current.clientHeight * height_multiple < passage_text_div.current.clientHeight + header_text_view_div.current.clientHeight) {
                        // setPassageText(print_txt.slice(0,-1));
                        main_text_view_div.current.style.height = `${(text_view_div.current.clientHeight * height_multiple + basicSize_of_mainTextViewDiv)}px`;
                        moveScrollBottom();
                        stop_typing_time = 30;
                        height_multiple++;
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
            print_txt = body_text
            setPassageText(body_text);
            text_view_div.current.removeEventListener("click", click_on);
        }
    }

    function makeOptionDiv() {
        
        let optionDiv = [];

        if(!isGameOver){
            currentOptions.forEach((option, i) => {
                optionDiv[i] = document.createElement('div');
                optionDiv[i].className = "option_div"
                optionDiv[i].id = `${i}`;
                optionDiv[i].innerText = option.optionVisibleName;
                optionDiv[i].addEventListener('click', (e: any) => { makeResultText(e.target.id) }); //option div 클릭하면 result text를 만들게 해줌
                // optionDiv[i] = 
                //     <div className="option_div" id={ i.toString() } onClick={function(e: any){ makeResultText(e.target.id) }}>
                //             {option.optionVisibleName}
                //     </div>
                options_div.current.appendChild(optionDiv[i]);
            })
        }
        else {
            optionDiv[0] = document.createElement('div');
            optionDiv[0].className = "option_div"
            optionDiv[0].id = `${0}`;
            optionDiv[0].innerText += "로비로 . . .";
            optionDiv[0].addEventListener('click', function onClick() {
                window.location.href = '/select';
            });
            options_div.current.appendChild(optionDiv[0]);
        }
        //hidden 풀어서 option Div가 보이게 해줌
        options_div.current.classList.remove("hidden");
        //text div의 높이를 설정해줘서 option div가 맨 아래에 위치하도록 하는 코드 코드
        const optionsDivHeight = options_div.current.clientHeight
        const headerTextViewDivHeight = header_text_view_div.current.clientHeight
        passage_text_div.current.style.height = `${basicSize_of_textViewDiv - optionsDivHeight - headerTextViewDivHeight}px`;
    }

    function makeResultText(optionIndex: number) {
        result_text_div.current.classList.remove("hidden");
        //다음 passage 미리 설정
        nextPassageName = currentOptions[optionIndex].nextNormalPassage;
        // 선택지를 고른 후 캐릭터 스테이터스 업데이트

        result_txt += "\n" + currentOptions[optionIndex].afterStory + "\n\n"
        setResultText(result_txt);
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
        current_status.health += status_change[optionIndex].health;
        current_status.hungry += status_change[optionIndex].hungry;
        current_status.money += status_change[optionIndex].money;

        //result div를 만들어줌
        makeResultOptionDiv();
        result_text_div.current.style.height = `${(basicSize_of_textViewDiv) - (result_option_div.current.clientHeight)}px`;
        moveScrollBottom();
        //ui 업데이트
        if(isStatChanged)
            update_rightUI();
            
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
        resetTextDiv();

        //배고픔이 0이면
        if(current_status.hungry <= 0){
            //체력 1깎음
            current_status.health = current_status.health -1;
        }

        //배고픔이 0이하고 체력이 정확히 0이면, 유저가 체력이 1남은 상태에서 배고픔으로 죽었다는 것.
        if(current_status.hungry <= 0 && current_status.health === 0){
            isGameOver = true
            setPassageTitle("허기를 이기지 못하고");
            body_text = "식량이 부족한 결과 당신은 모든 기력을 소진했습니다. 당신은 굶주렸지만 까마귀들은 포식하겠군요."
        }
        else if (current_status.health <= 0){//배고픔이 0이 아닌 상태에서 체력이 0이되었거나, 유저가 체력1 배고픔0에서 체력-1을 선택한 경우
            isGameOver = true
            setPassageTitle("끝은 언제나 갑작스럽게");
            body_text = "몸이 움직이지 않습니다. 눈앞이 아득해지고, 몹시 추워집니다. 당신은 죽었습니다"
        }else{  //게임이 종료되지 않았다면
            if (nextPassageName !== null){
                currentPassage = passages.find(passage => (passage.name === nextPassageName))
                currentOptions = getCurrentOptions(passages, currentPassage, options);        
                setValues();
            }
            else{
                isStoryEnd = true
                lastStoryArr.push(story.pk)
            }
        }
        //passage를 끝내면 useEffect가 다시 실행됨
        setIsPassageEnd(true)
    }

    function update_rightUI() {
        health_class.current.innerHTML = "";
        hungry_class.current.innerHTML = "";
        money_class.current.innerHTML = "";
        
        //helath의 개수가 0보다 작거나 current_status.maxHealth보다 클 수 없게 설정
        if (current_status.health < 0)
            current_status.health = 0;
        else if (current_status.health > maxHealth)
            current_status.health = maxHealth

        if (current_status.hungry < 0)
            current_status.hungry = 0;
        else if (current_status.hungry > maxHungry)
            current_status.hungry = maxHungry

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
        for (i = 0; i < maxHealth - health; i++) {
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
        for (i = 0; i < maxHungry - hungry; i++) {
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

    function click_on() {
        click = true
    }

    function moveScrollBottom() {
        let location = text_view_div.current.scrollHeight;
        text_view_div.current.scrollTo({ top: location, behavior: "smooth" });
    }

    function resetTextDiv() {
        print_txt = ""
        setPassageText("");
        setPassageTitle("")
        setResultText("");
        options_div.current.innerHTML = "";
        result_txt = ""
        result_option_div.current.innerHTML = "";
        main_text_view_div.current.style.height = "auto";
        options_div.current.classList.add("hidden");
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
        body_text = currentPassage.visibleText;

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
        debugger;
        let i = 0
        passages.forEach((passage, index) => {
            if(currentPassage.name === passage.name){
                i = index;
                return;
            }
        })
        return options[i];
    }




    React.useEffect(() => 
        {
            if(isGameStart === true || isPassageEnd === true){
                setIsPassageEnd(false);
                passage_start()
            }
        }, [isPassageEnd]) 

    return (
        <></>
    );  
};

