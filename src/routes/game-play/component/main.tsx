import * as React from 'react';
import '../game-play-route.css';
import bookLogo from '../../../styles/image/book-svgrepo-com.svg';
import heartLogo from "../../../styles/image/heart.png"
import heartBLogo from "../../../styles/image/heart_b.png"
import hungryLogo from "../../../styles/image/hungry.png"
import hungryBLogo from "../../../styles/image/hungry_b.png"
import moneyLogo from "../../../styles/image/money.png"
import money5Logo from "../../../styles/image/money5.png"
import axios from 'axios';
import { health_class } from './right_ui';
import { money_class } from './right_ui';
import { hungry_class } from './right_ui';

interface MainEpisode {
    mainEpisodeText: EpisodeText[],
    mainEpisodeOptionTexts: EpisodeOptionTexts[],
    mainEpisodeOptionStatChange: EpisodeOptionStatChange[]
}

interface EpisodeText {
    id: number,
    main_text: string,
    mode: number,
    title: string
}
interface EpisodeOptionTexts {
    text: string,
    resultText: string
}

interface EpisodeOptionStatChange {
    health_change: number,
    money_change: number,
    hungry_change: number,
    strength_change: number,
    agility_change: number,
    armour_change: number,
    mental_change: number,
};

interface Status {
    health: number,
    money: number,
    hungry: number,
    strength: number,
    agility: number,
    armour: number,
    mental: number,
};


let main_episode: MainEpisode;

let maxHealth: number = 5;
let maxHungry: number = 5;


let body_text: any = {};
let option_text: any = [];
let input_result: any = [];

let current_episode_num: number = 0;
let main_episode_num: number = 1;

let split_txt: string[];
let stop_typing_time: number;
let click: boolean;
let typingIdx: number;
let height_multiple: number;
let main_text_view_basic_size: number;
let option_result: any;
let db_episode_num;
const end_episode_num = 11;
let typing_end;
let status_change: EpisodeOptionStatChange;

export let current_status: Status;

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


    function game_start() {
        console.log('게임 스타트 함수 진입');
        debugger;

        getMainEpisodeDataFromDB();

        setTimeout(start_episode, 3000);
    };

    function start_episode() {
        stop_typing_time = 0;
        click = false;
        typingIdx = 0;
        height_multiple = 1;
        main_text_view_basic_size = main_text_view.current.clientHeight;
        // 여기서 에러 발생
        split_txt = body_text.split(""); // 한글자씩 잘라 배열로 저장한다.
        text_view.current.addEventListener("click", click_on);

        update_rightUI();

        let promise = async function () {
            for (typing_end = false; typing_end === false;) {
                await new Promise<void>((resolve, reject) => {
                    //episode 타이핑 시작
                    setTimeout(function () {
                        typing_episode();
                        resolve();
                    }, 20);
                })
            }
            //episode 타이핑이 끝난 후
            if (db_episode_num !== end_episode_num) {
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
            if (typingIdx < split_txt.length) {
                // 타이핑될 텍스트 길이만큼 반복
                if (stop_typing_time !== 0) {
                    stop_typing_time -= 1;
                }
                else {
                    episode_text.current.innerHTML += (split_txt[typingIdx])
                    if (split_txt[typingIdx] === ".") {
                        stop_typing_time = 10; //온점이 나오면 10번의 반복 기간동안 쉼
                    }
                    typingIdx++;

                    //글자가 페이지를 넘어간다면
                    if (text_view.current.clientHeight * height_multiple < episode_text.current.clientHeight + header_text_view.current.clientHeight) {
                        episode_text.current.innerText = episode_text.current.innerText.slice(0, -1);
                        main_text_view.current.style.height = `${(text_view.current.clientHeight * height_multiple + main_text_view_basic_size)}px`;
                        moveScrollBottom();
                        stop_typing_time = 30;
                        height_multiple++;
                    }
                }
            }
            else {
                typing_end = true;
            }
        }
        //클릭을 했다면 탈출
        else {
            typing_end = true;
            body_text = body_text.replace(/\t/g, "&nbsp;");
            body_text = body_text.replace(/\n/g, "<br><br>");
            episode_text.current.innerHTML = body_text;
            text_view.current.removeEventListener("click", click_on);
        }
    }

    function makeOptionDiv() {
        let optionDiv = [];
        let i = 0;

        for (i = 0; i < option_text.length; i++) {
            optionDiv[i] = document.createElement('div');
            optionDiv[i].className = "option_div"
            optionDiv[i].id = `${i}`;
            optionDiv[i].innerText = option_text[i];
            optionDiv[i].addEventListener('click', (e: any) => { makeResultText(e.target.id) });
            episode_option.current.appendChild(optionDiv[i]);
        }

        episode_option.current.classList.remove("hidden");
    }

    function makeResultText(optionId: number) {
        episode_result_text.current.classList.remove("hidden");

        // 선택지를 고른 후 캐릭터 스테이터스 업데이트
        axios.patch('http://localhost:3001/game_play/changestatus/3',
            {
                "changed_health": current_status.health + option_result[optionId].health_change,
                "changed_money": current_status.money + option_result[optionId].money_change,
                "changed_hungry": current_status.hungry + option_result[optionId].hungry_change,
                "changed_strength": current_status.strength + option_result[optionId].strength_change,
                "changed_agility": current_status.agility + option_result[optionId].agility_change,
                "changed_armour": current_status.armour + option_result[optionId].armour_change,
                "changed_mental": current_status.mental + option_result[optionId].mental_change,
            })
            .then((res) => {
                input_result.push(
                    {
                        text: option_result[optionId].result_text,
                        health: option_result[optionId].health_change,
                        hungry: option_result[optionId].hungry_change,
                        money: option_result[optionId].money_change,
                        strength: option_result[optionId].strength_change,
                        agility: option_result[optionId].agility_change,
                        armour: option_result[optionId].armour_change,
                        mental: option_result[optionId].mental_change
                    });
                episode_result_text.current.innerHTML += "<br>" + input_result[current_episode_num].text + "<br><br>";

                for (let key in option_result[optionId]) {
                    if (key == 'id' || key == 'text' || key == 'result_text' || key == 'episode') {
                        continue;
                    }
                    else {
                        if (option_result[optionId][key] != 0) {
                            let keyName: string;

                            switch (key) {
                                case 'money_change':
                                    keyName = '돈이';
                                    break;
                                case 'health_change':
                                    keyName = '체력이';
                                    break;
                                case 'hungry_change':
                                    keyName = '허기가';
                                    break;
                                case 'strength_change':
                                    keyName = '힘이';
                                    break;
                                case 'armour_change':
                                    keyName = '방어력이'
                                    break;
                                case 'agility_change':
                                    keyName = '민첩이'
                                    break;
                                case 'mental_change':
                                    keyName = '정신력이'
                                    break;
                            }
                            if (option_result[optionId][key] < 0)
                                episode_result_text.current.innerHTML += keyName + " " + option_result[optionId][key] + "만큼 줄었습니다\n";
                            else
                                episode_result_text.current.innerHTML += keyName + option_result[optionId][key] + "만큼 늘었습니다\n";
                        }
                    }
                }

                current_status.health += input_result[current_episode_num].health;
                current_status.hungry += input_result[current_episode_num].hungry;
                current_status.money += input_result[current_episode_num].money;
                current_status.strength += input_result[current_episode_num].strength;
                current_status.agility += input_result[current_episode_num].agility;
                current_status.armour += input_result[current_episode_num].armour;
                current_status.mental += input_result[current_episode_num].mental;

                makeResultOptionDiv();
                episode_result_text.current.style.height = `${(text_view.current.clientHeight) - (episode_result_option.current.clientHeight)}px`;
                moveScrollBottom();
            })
    }

    function makeResultOptionDiv() {
        let resultDiv: any;
        resultDiv = document.createElement('div');
        resultDiv.className = "result_div font-game-thick";

        if (db_episode_num !== end_episode_num) {
            resultDiv.innerText += "다음으로 . . .";
            resultDiv.addEventListener('click', (e: any) => { episodeEnd() });
        }
        else {
            resultDiv.innerText += "로비로 . . .";
            resultDiv.addEventListener('click', function onClick() {
                window.location.href = 'http://localhost:3000/#/select';
            });
        }
        episode_result_option.current.appendChild(resultDiv);

        episode_result_option.current.classList.remove("hidden");

        moveScrollBottom();
        height_multiple++;
    }

    function episodeEnd() {
        resetTextDiv();

        current_episode_num += 1;

        db_episode_num = 60
        if (current_status.health <= 0 || current_status.hungry <= 0)
            db_episode_num = end_episode_num


        //만약 지금이 1,4,7...번째 에피소드라면 메인 에피소드 출력
        if ((db_episode_num != end_episode_num && (current_episode_num + 1) % 3) === 1) {
            // 메인 에피소드 가져오기 전에 넘버 증가
            main_episode_num += 1;
            updateEpisodeValue('main');
        }
        //그 외라면 일반 에피소드 출력
        else {
            getNormalEpisodeDataFromDBAndUpdate();
        }


        setTimeout(function () { start_episode() }, 1500)
    }

    function update_rightUI() {
        health_class.current.innerHTML = "";
        hungry_class.current.innerHTML = "";
        money_class.current.innerHTML = "";

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
        //helath의 개수가 0보다 작거나 current_status.maxHealth보다 클 수 없게 설정


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
        let location = text_view.current.scrollHeight;
        text_view.current.scrollTo({ top: location, behavior: "smooth" });
    }

    function resetTextDiv() {
        episode_text.current.innerText = "";
        episode_option.current.innerHTML = "";
        episode_result_text.current.innerHTML = "";
        episode_result_option.current.innerHTML = "";
        main_text_view.current.style.height = "auto";
        episode_option.current.classList.add("hidden");
        episode_result_text.current.classList.add("hidden");
        episode_result_option.current.classList.add("hidden");
    }

    async function getMainEpisodeDataFromDB() {
        console.log('메인 에피소드 가져오기 함수 진입');
        debugger;

        await axios.get(`http://localhost:3001/game_play/mainepisode`)
            .then((res) => {
                console.log('메인 에피소드 가져오기 성공');
                debugger;
                let temp_options: any = [];
                main_episode = res.data;
            });

        // 캐릭터 스테이터스 가져오기
        await axios.get('http://localhost:3001/game_play/character/1')
            .then((res) => {
                current_status = res.data;
            });
        updateEpisodeValue('main');
    }

    function getNormalEpisodeDataFromDBAndUpdate() {
        // 에피소드 가져오기
        axios.get(`http://localhost:3001/game_play/episode/${db_episode_num}`)
            .then((res) => {
                episode_number_text.current.innerText = '#' + res.data.id;
                episode_title.current.innerText = res.data.title;
                body_text = res.data.mainText
            });

        // 선택지 가져오기
        axios.get(`http://localhost:3001/game_play/options/${db_episode_num}`)
            .then((res) => {
                option_result = res.data;
                let dummy_option = [];
                for (let i = 0; i < res.data.length; i++) {
                    dummy_option.push(res.data[i].text);
                };
                option_text = dummy_option;
            })
    }

    function updateEpisodeValue(episode_type) {
        //메인 에피소드 업데이트

        let current_episode_text: EpisodeText;
        let current_episode_option_texts: EpisodeOptionTexts;
        let current_episode_option_stat_change: EpisodeOptionStatChange;
        
        /**
         * 여기서 에러 발생 아마 DB에서 가져온 메인 에피소드 객체 구조랑
         * 프론트에서 쓰는 메인 에피소드 객체 구조랑 달라서 데이터가 엉뚱하게 들어가는듯
         * */ 
        if (episode_type === 'main') {
            current_episode_text = main_episode.mainEpisodeText[main_episode_num];
            current_episode_option_texts = main_episode.mainEpisodeOptionTexts[main_episode_num];
            current_episode_option_stat_change = main_episode.mainEpisodeOptionStatChange[main_episode_num];
        }
        else {
        }

        //episode_number
        episode_number_text.current.innerText = '#' + current_episode_text.id
        //episode_title
        episode_title.current.innerText = current_episode_text.title;

        body_text = current_episode_text.main_text;

        // 메인 에피소드 선택지 업데이트
        option_text = current_episode_option_texts;


        status_change = option_result;
    }

    React.useEffect(game_start, [])

    return (
        <main className="main">
            <div className="episode_logo">
                <img className="icon-book" src={bookLogo} alt="" />
            </div>
            <div className="episode_logo_line"></div>
            <div className="text_view" ref={text_view}>
                <div className="header_text_view" ref={header_text_view}>
                    <div className="episode_number font-game-thick">
                        <span className="episode_number_text" ref={episode_number_text}>
                            #0 서막
                        </span>
                    </div>
                    <div className="episode_title font-game-thick" ref={episode_title}>
                        모험의 시작
                    </div>
                </div>
                <div className="main_text_view" ref={main_text_view}>
                    <div className="episode_text" ref={episode_text}>
                    </div>
                    <div className="episode_option hidden font-game-thick" ref={episode_option}>
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
    );
};