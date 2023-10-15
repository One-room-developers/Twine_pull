import React, { MutableRefObject } from "react";
import { Status, MainProps, Episode, Option_Texts } from "../../store/stories/gameManager.types";
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

export let current_status: Status;

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
    return data;
}

export const GameManager : React.FC<MainProps> = (props) => {
    let episode_text_div = props.episode_text_div
    let text_view_div = props.text_view_div
    let main_text_view_div = props.main_text_view_div
    let episode_option_div = props.episode_option_div
    let episode_result_text_div = props.episode_result_text_div
    let episode_result_option_div = props.episode_result_option_div
    let header_text_view_div = props.header_text_view_div
    const [episodeTitle, setEpisodeTitle] = props.episodeTitleState;
    const [episodeNumberText, setEpisodeNumberText] = props.episodeNumberTextState
    const [episodeText, setEpisodeText] = props.episodeTextState
    const [episodeResultText, setEpisodeResultText] = props.episodeResultText

    
    let print_txt : string = episodeText;
    let result_txt : string = episodeResultText;
    
    let main_episode: Episode[];
    let normal_episode : Episode;

    let maxHealth: number = 5;
    let maxHungry: number = 5;

    let body_text: string;
    let option_text: Option_Texts[];

    let current_episode_num: number = 0;
    let main_episode_num: number = 0;

    let split_txt_arr: string[];
    let stop_typing_time: number;
    let click: boolean;
    let typingIdx: number;
    let height_multiple: number;
    let basicSize_of_textViewDiv : number
    let basicSize_of_mainTextViewDiv: number;
    let normal_episode_num = 1;
    const end_episode_num = 11;
    let isEnd = false;
    let isTypingEnd = false;
    let status_change: Status[];


    function wait(timeToDelay){
        return new Promise((resolve) => setTimeout(resolve, timeToDelay))
    } //timeToDelay만큼 코드를 대기시키는 함수

    async function game_start() {
        console.log('게임 스타트 함수 진입');

        await getMainEpisodeDataFromDB();
        await getCurrentStatusFromDB();
        setTimeout(start_episode, 2000);
    };

    function start_episode() {
        stop_typing_time = 0;
        click = false;
        typingIdx = 0;
        height_multiple = 1;
        basicSize_of_textViewDiv = text_view_div.current.clientHeight;
        basicSize_of_mainTextViewDiv = main_text_view_div.current.clientHeight;
        // 여기서 에러 발생
        split_txt_arr = body_text.split(""); // 한글자씩 잘라 배열로 저장한다.
        text_view_div.current.addEventListener("click", click_on);


        let promise = async function () {
            for (isTypingEnd = false; isTypingEnd === false;) {
                await new Promise<void>((resolve, reject) => {
                    //episode 타이핑 시작
                    setTimeout(function () {
                        try{
                            typing_episode();
                            resolve();
                        }
                        catch{
                            return;
                        }
                    }, 20);
                })
            }
            //episode 타이핑이 끝난 후
            if (!isEnd) {
                makeOptionDiv();
            }
            else {
                makeResultOptionDiv();
            }
        }
        promise();
    }

    function typing_episode() {
        //클릭을 안했다면 수행
        if (click !== true) {
            if (typingIdx < split_txt_arr.length) {
                // 타이핑될 텍스트 길이만큼 반복
                if (stop_typing_time !== 0) {
                    stop_typing_time -= 1;
                }
                else {
                    print_txt += split_txt_arr[typingIdx]
                    setEpisodeText(print_txt)
                    if (split_txt_arr[typingIdx] === ".") {
                        stop_typing_time = 10; //온점이 나오면 10번의 반복 기간동안 쉼
                    }
                    typingIdx++;

                    //글자가 페이지를 넘어간다면
                    if (text_view_div.current.clientHeight * height_multiple < episode_text_div.current.clientHeight + header_text_view_div.current.clientHeight) {
                        // setEpisodeText(print_txt.slice(0,-1));
                        main_text_view_div.current.style.height = `${(text_view_div.current.clientHeight * height_multiple + basicSize_of_mainTextViewDiv)}px`;
                        moveScrollBottom();
                        stop_typing_time = 30;
                        height_multiple++;
                    }
                }
            }
            else {
                isTypingEnd = true;
            }
        }
        //클릭을 했다면 탈출
        else {
            isTypingEnd = true;
            print_txt = body_text
            setEpisodeText(body_text);
            text_view_div.current.removeEventListener("click", click_on);
        }
    }

    function makeOptionDiv() {
        let optionDiv = [];
        let i = 0;

        for (i = 0; i < option_text.length; i++) {
            optionDiv[i] = document.createElement('div');
            optionDiv[i].className = "option_div"
            optionDiv[i].id = `${i}`;
            optionDiv[i].innerText = option_text[i].text;
            optionDiv[i].addEventListener('click', (e: any) => { makeResultText(e.target.id) });
            episode_option_div.current.appendChild(optionDiv[i]);
            // console.log(optionDiv[i].current.clientHeight)
        }
        episode_option_div.current.classList.remove("hidden");
        const episodeOptionDivHeight = episode_option_div.current.clientHeight
        const headerTextViewDivHeight = header_text_view_div.current.clientHeight
        episode_text_div.current.style.height = `${basicSize_of_textViewDiv - episodeOptionDivHeight - headerTextViewDivHeight}px`;

    }

    function makeResultText(optionId: number) {
        episode_result_text_div.current.classList.remove("hidden");
        // 선택지를 고른 후 캐릭터 스테이터스 업데이트
        axios.patch(`${process.env.REACT_APP_API_URL}/game_play/changestatus/3`,
            {
                //db에 스탯 변화량 기록
                "changed_health": status_change[optionId].health,
                "changed_money": status_change[optionId].money,
                "changed_hungry": status_change[optionId].hungry
            })
            .then((res) => 
            {
                result_txt += "\n" + option_text[optionId].result_text + "\n\n"
                setEpisodeResultText(result_txt);
                let isStatChanged = false;
                //stat 증가량 텍스트 입력
                for (let statName in status_change[optionId]) {
                    if (status_change[optionId][statName] != 0) {
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
                            case 'strength':
                                statMessage="근력이"
                                break;
                            case 'agility':
                                statMessage="민첩이"
                                break;
                            case 'armour':
                                statMessage="방어가"
                                break;
                            case 'mental':
                                statMessage="정신력이"
                                break;
                        }
                        if (status_change[optionId][statName] < 0){
                            result_txt += statMessage + " " + status_change[optionId][statName] + "만큼 줄었습니다\n"
                            setEpisodeResultText(result_txt);
                        }
                        else{
                            result_txt += statMessage + status_change[optionId][statName] + "만큼 늘었습니다\n"
                            setEpisodeResultText(result_txt);
                        }
                    }
                }

                current_status.health += status_change[optionId].health;
                current_status.hungry += status_change[optionId].hungry;
                current_status.money += status_change[optionId].money;

                makeResultOptionDiv();
                episode_result_text_div.current.style.height = `${(basicSize_of_textViewDiv) - (episode_result_option_div.current.clientHeight)}px`;
                moveScrollBottom();
                //ui 업데이트
                if(isStatChanged)
                    update_rightUI();
            })
    }

    function makeResultOptionDiv() {
        let resultDiv: any;
        resultDiv = document.createElement('div');
        resultDiv.className = "result_div font-game-thick";

        if (!isEnd) {
            resultDiv.innerText += "다음으로 . . .";
            resultDiv.addEventListener('click', (e: any) => { episodeEnd() });
        }
        else {
            resultDiv.innerText += "로비로 . . .";
            resultDiv.addEventListener('click', function onClick() {
                window.location.href = '/select';
            });
        }
        episode_result_option_div.current.appendChild(resultDiv);

        episode_result_option_div.current.classList.remove("hidden");

        moveScrollBottom();
        height_multiple++;
    }

    function episodeEnd() {
        resetTextDiv();

        current_episode_num += 1;

        if (current_status.health <= 0 || current_status.hungry <= 0){
            isEnd = true;
        }
        //게임 끝 판별
        if(isEnd){
            normal_episode_num = end_episode_num;
            getNormalEpisodeDataFromDB();
        }
        //만약 지금이 1,4,7...번째 에피소드라면 메인 에피소드 출력
        else if (((current_episode_num + 1) % 3) === 1) {
            main_episode_num += 1;
            updateEpisodeValue('main');
        }
        //그 외라면 일반 에피소드 출력
        else {
            normal_episode_num = Math.floor(Math.random() * 9) + 2;
            getNormalEpisodeDataFromDB();
        }

        // setTimeout(function () { start_episode() }, 1500)
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
        setEpisodeText("");
        episode_option_div.current.innerHTML = "";
        result_txt = ""
        setEpisodeResultText("");
        episode_result_option_div.current.innerHTML = "";
        main_text_view_div.current.style.height = "auto";
        episode_option_div.current.classList.add("hidden");
        episode_result_text_div.current.classList.add("hidden");
        episode_result_option_div.current.classList.add("hidden");
    }

    async function getMainEpisodeDataFromDB() {
        console.log('메인 에피소드 가져오기 함수 진입');
        await axios.get(`${process.env.REACT_APP_API_URL}/game_play/mainepisode`)
            .then((res) => {
                console.log('메인 에피소드 가져오기 성공');
                main_episode = res.data.mainEpisodes;
            });
        updateEpisodeValue('main');
    }

    function getCurrentStatusFromDB(){
        // 캐릭터 스테이터스 가져오기
        axios.get(`${process.env.REACT_APP_API_URL}/game_play/character/1`)
        .then((res) => {
            current_status = res.data;
            update_rightUI();
        });
    }

    async function getNormalEpisodeDataFromDB() {
        // 에피소드 가져오기
        await axios.get(`${process.env.REACT_APP_API_URL}/game_play/episode/${normal_episode_num}`)
            .then((res) => {
                console.log('노말 에피소드 가져오기 성공');
                normal_episode = res.data;
            });
        updateEpisodeValue('normal');
    }

    function updateEpisodeValue(episode_type) {
        //메인 에피소드 업데이트

        let current_episode : Episode
        
        if (episode_type === 'main') {
            current_episode = main_episode[main_episode_num];
        }
        else if(episode_type === 'normal'){
            current_episode = normal_episode;
        }
        //episode_number
        setEpisodeNumberText(current_episode.Episode_Text.id);
        //episode_title
        setEpisodeTitle(current_episode.Episode_Text.title);

        body_text = current_episode.Episode_Text.main_text;

        // 에피소드 선택지 업데이트
        option_text = current_episode.Option_Texts; 

        status_change = current_episode.Option_Stat_Changes;
    }

    React.useEffect(() => {game_start()}, [])

    return (
        <></>
    );
};

