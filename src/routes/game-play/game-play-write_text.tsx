import heartLogo from "../../styles/image/heart.png"
import heartBLogo from "../../styles/image/heart_b.png"
import hungryLogo from "../../styles/image/hungry.png"
import moneyLogo from "../../styles/image/money.png"
import money5Logo from "../../styles/image/money5.png"
import axios from 'axios';

interface Status {
  health: number,
  money: number,
  hungry: number,
  strength: number,
  agility: number,
  armour: number,
  mental: number
};

var episode_text: HTMLDivElement;
var text_view: HTMLDivElement;
var main_text_view: HTMLDivElement;
var option_class: HTMLDivElement;
var result_text_class: HTMLDivElement;
var result_option_class: HTMLDivElement;
var text_view_header: HTMLDivElement;
var health_class: HTMLDivElement;
var hungry_class: HTMLDivElement;
var money_class: HTMLDivElement;
let episode_title_div
let episode_number_div

var input_text: any = [];
var input_option: any = [];
var input_result: any = [];

var current_episode_num: number;

var split_txt: string[];
var hot_point: number;
var click: boolean;
var typingIdx: number;
var height_multiple: number;
var typingBool: boolean;
var main_text_view_basic_size: number;
var tyInt: ReturnType<typeof setInterval>;
let option_result = new Object();
export let current_status : Status;
var maxhelath = 5;
var maxHungry = 5;
let db_episode_num

function main() {
  episode_title_div = document.querySelector('.episode_name') as HTMLDivElement;
  episode_number_div = document.querySelector('.episode_number_text') as HTMLDivElement;
  //let db_episode_num = Math.floor(Math.random() * 6) + 1;

  db_episode_num = 1;
  // 에피소드 가져오기
  axios.get(`http://localhost:3001/game_play/episode/${db_episode_num}`)
  .then((res) => {
    episode_number_div.innerText = '#'+res.data.id;
    episode_title_div.innerText = res.data.title;
    input_text.push({ text : res.data.mainText });
  });

  // 선택지 가져오기
  axios.get(`http://localhost:3001/game_play/options/${db_episode_num}`)
  .then((res) => {
    option_result = res.data;
    input_option.push([]);
    for(let i = 0; i < res.data.length; i++) {
      input_option[0].push({ text: res.data[i].text });
    };

    // 캐릭터 스테이터스 가져오기
    axios.get('http://localhost:3001/game_play/character/5')
    .then((res) => {
      current_status = res.data;
      });
    });
  setTimeout(function () { typing_episode(0) }, 3000);
};

function typing_episode(indexNum: number) {
  current_episode_num = indexNum;
  episode_text = document.querySelector('.episode_text') as HTMLDivElement;
  text_view = document.querySelector('.text_view') as HTMLDivElement;
  main_text_view = document.querySelector('.text_view-main') as HTMLDivElement;
  option_class = document.querySelector('.episode_option') as HTMLDivElement;
  result_text_class = document.querySelector('.episode_result_text') as HTMLDivElement;
  result_option_class = document.querySelector('.episode_result_option') as HTMLDivElement;
  text_view_header = document.querySelector(".text_view-header") as HTMLDivElement;
  health_class = document.querySelector(".health") as HTMLDivElement;
  hungry_class = document.querySelector(".hungry") as HTMLDivElement;
  money_class = document.querySelector(".money") as HTMLDivElement;

  hot_point = 0;
  click = false;
  typingIdx = 0;
  height_multiple = 1;
  typingBool = false;
  main_text_view_basic_size = main_text_view.clientHeight;
  split_txt = input_text[current_episode_num].text.split(""); // 한글자씩 잘라 배열로 저장한다.
  text_view.addEventListener("click", click_on);

  resetRightUI()
  makeRightUI();

  tyInt = setInterval(typing, 20);
}

function resetRightUI() {
  health_class.innerHTML = "";
  hungry_class.innerHTML = "";
  money_class.innerHTML = "";
}
function makeRightUI() {
  if (current_status.health < 0)
    current_status.health = 0;
  else if(current_status.health > maxhelath)
    current_status.health = maxhelath

  if (current_status.hungry < 0)
    current_status.hungry = 0;
  else if(current_status.hungry > maxHungry)
    current_status.hungry = maxHungry

  var health = current_status.health;
  var hungry = current_status.hungry;
  var money = current_status.money
  
  var helathImg = [];
  var helathBImg = [];
  var moneyImg = [];
  var hungryImg = [];
  var money5 = Math.floor(money / 5);

  let i = 0;
  //helath의 개수가 0보다 작거나 maxhelath보다 클 수 없게 설정
  
    
  for (i = 0; i < health; i++) {
    helathImg[i] = new Image();
    helathImg[i].className = "right-ui-img"
    helathImg[i].src = heartLogo;
    helathImg[i].width = 30;
    health_class.appendChild(helathImg[i]);
  }
  for (i = 0; i < maxhelath - health; i++) {
    helathBImg[i] = new Image();
    helathBImg[i].className = "right-ui-img"
    helathBImg[i].src = heartBLogo;
    helathBImg[i].width = 30;
    health_class.appendChild(helathBImg[i]);
  }

  for (i = 0; i < hungry; i++) {
    hungryImg[i] = new Image();
    hungryImg[i].className = "right-ui-img"
    hungryImg[i].src = hungryLogo;
    hungryImg[i].width = 30;
    hungry_class.appendChild(hungryImg[i]);
  }

  if (money <= 5) {
    for (i = 0; i < money; i++) {
      moneyImg[money5 + i] = new Image();
      moneyImg[money5 + i].className = "money_img"
      moneyImg[money5 + i].src = moneyLogo;
      moneyImg[money5 + i].width = 30;
      money_class.appendChild(moneyImg[money5 + i]);
    }
  }
  else {
    for (i = 0; i < money5; i++) {
      moneyImg[i] = new Image();
      moneyImg[i].className = "money5_img"
      moneyImg[i].src = money5Logo;
      moneyImg[i].width = 30;
      money_class.appendChild(moneyImg[i]);
    }
    for (i = 0; i < money % 5; i++) {
      moneyImg[money5 + i] = new Image();
      moneyImg[money5 + i].className = "money_img"
      moneyImg[money5 + i].src = moneyLogo;
      moneyImg[money5 + i].width = 30;
      money_class.appendChild(moneyImg[money5 + i]);
    }
  }
}

function click_on() {
  console.log("click_on" + current_episode_num);
  click = true
}
function typing() {
  console.log(click);
  //클릭을 했다면 탈출
  if (click === true) {
    clearInterval(tyInt);
    input_text[current_episode_num].text = input_text[current_episode_num].text.replace(/\t/g, "&nbsp;");
    input_text[current_episode_num].text = input_text[current_episode_num].text.replace(/\n/g, "<br><br>");
    episode_text.innerHTML = input_text[current_episode_num].text;
    makeOptionDiv();
    moveScrollBottom();
    text_view.removeEventListener("click", click_on);
    click = false;
  }
  //클릭을 안했다면 수행
  else {
    if (typingIdx < split_txt.length) {
      // 타이핑될 텍스트 길이만큼 반복
      if (hot_point !== 0) {
        hot_point -= 1;
      }
      else {
        if (split_txt[typingIdx] === "\n") {
          episode_text.innerHTML += "<br><br>"
          hot_point = 20; //온점이 나오면 2번의 반복 기간동안 쉼
        }
        else if (split_txt[typingIdx] === "\t") {
          episode_text.innerHTML += "&nbsp;"
        }
        else {
          episode_text.innerHTML += split_txt[typingIdx]
        }
        typingIdx++;

        if (text_view.clientHeight * height_multiple < episode_text.clientHeight + text_view_header.clientHeight) {
          episode_text.innerText = episode_text.innerText.slice(0, -1);
          console.log("size : " + text_view.clientHeight * height_multiple + main_text_view_basic_size);
          main_text_view.style.height = `${(text_view.clientHeight * height_multiple + main_text_view_basic_size)}px`;
          moveScrollBottom();
          hot_point = 30;
          height_multiple++;
        }
      }
    }
    else {
      clearInterval(tyInt); //끝나면 반복종료
      makeOptionDiv();
      moveScrollBottom();
    }
  }
}


function moveScrollBottom() {
  var location = text_view.scrollHeight;
  text_view.scrollTo({ top: location, behavior: "smooth" });
}

function makeOptionDiv() {
  var optionDiv = [];
  let i = 0;
  option_class.classList.remove("hidden");
  console.log("run) makeOptionDiv")

  for (i = 0; i < input_option[current_episode_num].length; i++) {
    optionDiv[i] = document.createElement('div');
    optionDiv[i].className = "option_div"
    optionDiv[i].id = `${i}`;
    optionDiv[i].innerText = input_option[current_episode_num][i].text;
    optionDiv[i].addEventListener('click', (e: any) => {
      clickOptionEvent(e.target.id)
    });
    option_class.appendChild(optionDiv[i]);
  }
}

function clickOptionEvent(optionId: number) {
  
  result_text_class.classList.remove("hidden");
  result_option_class.classList.remove("hidden");

  // 선택지를 고른 후 캐릭터 스테이터스 업데이트
  axios.patch('http://localhost:3001/game_play/change_character/5',
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
        money: option_result[optionId].money_change
      });

      result_text_class.innerHTML += "<br>" + input_result[current_episode_num].text + "<br><br>";

      for(let key in option_result[optionId]) {
        if(key == 'id' || key == 'text' || key == 'result_text') {
          continue;
        }
        else {
          if(option_result[optionId][key] != 0) {
            var keyName : string;
            
            switch(key){
              case 'money_change' :
                keyName = '돈이';
                break;
              case 'health_change' :
                keyName = '체력이';
                break;
              case 'hungry_change' :
                keyName = '허기가';
                break;
              case 'strength_change' :
                keyName = '힘이';
                break;
              case 'armour_change' :
                keyName = '방어력이'
                break;
              case 'agility_change' :
                keyName = '민첩이'
                break;
              case 'mental_change' :
                keyName = '정신력이'
                break;
            }
            if(option_result[optionId][key] < 0)
              result_text_class.innerHTML += keyName + " " +option_result[optionId][key] + "만큼 줄었습니다\n";
            else
            result_text_class.innerHTML += keyName + option_result[optionId][key] + "만큼 늘었습니다\n";
        }
        result_text_class.innerHTML = result_text_class.innerHTML.replace(/\t/g, "&nbsp;");
        result_text_class.innerHTML = result_text_class.innerHTML.replace(/\n/g, "<br>");
      
      }
    }

      current_status.health += input_result[current_episode_num].health;
      current_status.hungry += input_result[current_episode_num].hungry;
      current_status.money += input_result[current_episode_num].money;

      makeResultDiv();
      resetRightUI();
      makeRightUI();
      result_text_class.style.height = `${(text_view.clientHeight) - (result_option_class.clientHeight)}px`;
      moveScrollBottom();
      height_multiple++;
  })
  .catch((error) => console.log(error.response));
}

function makeResultDiv(){
  var resultDiv: any;
  resultDiv = document.createElement('div');
  resultDiv.className = "result_div font-game-thick"
  if(db_episode_num !== 11){
    resultDiv.innerText += "다음으로 . . .";
    resultDiv.addEventListener('click', (e: any) => { clickResultEvent() });
  }
  else{
    resultDiv.innerText += "로비로 . . .";
    //로비로 이동하는 코드 작성
  }

  result_option_class.appendChild(resultDiv);
}
function clickResultEvent() {
  resetTextDiv();
  
  current_episode_num += 1;

  db_episode_num = Math.floor(Math.random() * 6) + 1;


  if(current_status.health <= 0)
    db_episode_num = 11

  // 에피소드 가져오기
  axios.get(`http://localhost:3001/game_play/episode/${db_episode_num}`)
  .then((res) => {
    episode_number_div.innerText = '#'+res.data.id;
    episode_title_div.innerText = res.data.title;
    input_text.push({ text : res.data.mainText });
  });

  // 선택지 가져오기
  axios.get(`http://localhost:3001/game_play/options/${db_episode_num}`)
  .then((res) => {
    option_result = res.data;
    input_option.push([]);
    for(let i = 0; i < res.data.length; i++) {
      input_option[current_episode_num].push({ text: res.data[i].text });
    };
  })
  
    setTimeout(function () { typing_episode(current_episode_num) }, 1500)
}

function resetTextDiv() {
  episode_text.innerText = "";
  option_class.innerHTML = "";
  result_text_class.innerHTML = "";
  result_option_class.innerHTML = "";
  main_text_view.style.height = "auto";
  option_class.classList.add("hidden");
  result_text_class.classList.add("hidden");
  result_option_class.classList.add("hidden");
}

export { main };