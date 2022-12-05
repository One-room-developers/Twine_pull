import heartLogo from "../../styles/image/heart.png"
import heartBLogo from "../../styles/image/heart_b.png"
import hungryLogo from "../../styles/image/hungry.png"
import moneyLogo from "../../styles/image/money.png"
import money5Logo from "../../styles/image/money5.png"


var episode_text: HTMLDivElement;
var text_view: HTMLDivElement;
var main_text_view: HTMLDivElement;
var option_class: HTMLDivElement;
var result_text_class: HTMLDivElement;
var result_option_class: HTMLDivElement;
var text_view_header: HTMLDivElement;
var heart_class: HTMLDivElement;
var hungry_class: HTMLDivElement;
var money_class: HTMLDivElement;

var input_text: any;
var input_option: any;

var index: number;
var input_result: any
var split_txt: string[];
var hot_point: number;
var click: boolean;
var typingIdx: number;
var height_multiple: number;
var typingBool: boolean;
var main_text_view_basic_size: number;
var tyInt: ReturnType<typeof setInterval>;
export var stat = {
  heart : 5,
  hungry : 5,
  money : 5,
  heartMax : 5,
  str : 2,
  dex : 0
}

function main() {
  setTimeout(function () { typing_episode(0) }, 3000);
};

function typing_episode(indexNum: number) {
  index = indexNum;
  episode_text = document.querySelector('.episode_text') as HTMLDivElement;
  text_view = document.querySelector('.text_view') as HTMLDivElement;
  main_text_view = document.querySelector('.text_view-main') as HTMLDivElement;
  option_class = document.querySelector('.episode_option') as HTMLDivElement;
  result_text_class = document.querySelector('.episode_result_text') as HTMLDivElement;
  result_option_class = document.querySelector('.episode_result_option') as HTMLDivElement;
  text_view_header = document.querySelector(".text_view-header") as HTMLDivElement;
  heart_class = document.querySelector(".heart") as HTMLDivElement;
  hungry_class = document.querySelector(".hungry") as HTMLDivElement;
  money_class = document.querySelector(".money") as HTMLDivElement;
  input_text = [{
    text: "\t얼음이 가득한 북부. 차게 핀 서리눈꽃이 숨죽여 떨어지는 곳." +
      "\t거탑 2층의 외진 도시 테오존에서 당신은 태어났다.\n" +
      "\t이곳의 사람들은 항상 굶주려있다. " +
      "\t1년 중 농사를 지을 수 있는 기간은 얼음이 녹는 5-6개월 남짓이다." +
      "\t테오존에서 울무를 설치하지 못하거나 쪽활로 짐승을 사냥하지 못하는 사람은 없다.\n" +
      "\t당신만 빼고 그렇다.\n" +
      "\t당신은 어렸을 때 짐승에게 당해 세 손가락을 잃었다. 그때의 기억은 트라우마가 되어 당신은 사냥을 하지 못한다." +
      "\t그러한 사람들은 모두 죽었기 때문이다. 농사철이 되면 모두 농사를 짓는다. 안정적인 수확을 낼 수 있는 수단이 존재한다는 사실." +
      "\t이 얼마나 큰 축복인가.\n" +
      "\t땅에 한기가 가득하기에 벼 대신 질긴 호밀을 심는다. 호밀로 만든 질기고 퀘퀘한 빵, 그 빵을 발효시킨 음료, 호밀을 발효시켜 만든 맥주." +
      "\t이 도시는 고기와 호밀로 쌓아올려졌다고 봐도 무방하다." +
      "\t얼음이 가득한 북부. 차게 핀 서리눈꽃이 숨죽여 떨어지는 곳." +
      "\t거탑 2층의 외진 도시 테오존에서 당신은 태어났다.\n" +
      "\t이곳의 사람들은 항상 굶주려있다. " +
      "\t1년 중 농사를 지을 수 있는 기간은 얼음이 녹는 5-6개월 남짓이다." +
      "\t테오존에서 울무를 설치하지 못하거나 쪽활로 짐승을 사냥하지 못하는 사람은 없다.\n" +
      "\t당신만 빼고 그렇다.\n" +
      "\t당신은 어렸을 때 짐승에게 당해 세 손가락을 잃었다. 그때의 기억은 트라우마가 되어 당신은 사냥을 하지 못한다." +
      "\t그러한 사람들은 모두 죽었기 때문이다. 농사철이 되면 모두 농사를 짓는다. 안정적인 수확을 낼 수 있는 수단이 존재한다는 사실." +
      "\t이 얼마나 큰 축복인가.\n" +
      "\t땅에 한기가 가득하기에 벼 대신 질긴 호밀을 심는다. 호밀로 만든 질기고 퀘퀘한 빵, 그 빵을 발효시킨 음료, 호밀을 발효시켜 만든 맥주." +
      "\t이 도시는 고기와 호밀로 쌓아올려졌다고 봐도 무방하다."
  },
  {
    text: "\t청춘! 이는 듣기만 하여도 가슴이 설레는 말이다. 청춘! 너의 두 손을 가슴에 대고, 물방아 같은 심장의 고동을 들어 보라. 청춘의 피는 끓는다. 끓는 피에 뛰노는 심장은 거선(巨船)의 기관(汽罐)같이 힘있다. 이것이다. 인류의 역사를 꾸며 내려온 동력은 바로 이것이다. 이성(理性)은 투명하되 얼음과 같으며, 지혜는 날카로우나 갑 속에 든 칼이다. 청춘의 끓는 피가 아니더면, 인간이 얼마나 쓸쓸하랴? 얼음에 싸인 만물(萬物)은 죽음이 있을 뿐이다.\n" +
      "\t그들에게 생명을 불어넣는 것은 따뜻한 봄바람이다. 풀밭에 속잎 나고, 가지에 싹이 트고, 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며, 얼마나 아름다우냐? 이것을 얼음 속에서 불러내는 것이 따뜻한 봄바람이다. 인생에 따뜻한 봄바람을 불어 보내는 것은 청춘의 끓는 피다. 청춘의 피가 뜨거운지라, 인간의 동산에는 사랑의 풀이 돋고, 이상(理想)의 꽃이 피고, 희망(希望)의 놀고 뜨고, 열락(悅樂)의 새가 운다.\n" +
      "\t사랑의 풀이 없으면 인간은 사막이다. 오아시스도 없는 사막이다. 보이는 끝까지 찾아다녀도, 목숨이 있는 때까지 방황하여도, 보이는 것은 거친 모래뿐일 것이다. 이상의 꽃이 없으면, 쓸쓸한 인간에 남는 것은 영락(零落)과 부패(腐敗) 뿐이다. 낙원을 장식하는 천자만홍(千紫萬紅)이 어디 있으며, 인생을 풍부하게 하는 온갖 과실이 어디 있으랴?\n"
  }
  ]
  input_option = [
    [{text : "싸운다"}, {text : "도망친다"}, {text : "고함을 친다"}],
    [{text : "그게 무슨 말인지?"}, {text : "조금 더 들어보지"}]
  ];

  input_result = [
    [{
      text: "\t당신은 사투 끝에 블브를 죽이는데 성공했다. 하지만 남은 것은 상처뿐이었다. \n\thp를 1 잃었다.",
      heart: -1,
      hungry: 0,
      money: 0
    },
    {
      text: "\t당신은 전력을 다해 도망쳤으나, 인간의 두 다리로 블브를 따돌리기란 어불성설이었다. 마을에 도달했을 때, 당신은 이미 상처투성이었다. \n\thp를 2 잃었다.",
      heart: -2,
      hungry: 0,
      money: 0
    },
    {
      text: "\t당신은 모습을 드러내지 않았다. 수풀에 몸을 숨긴 채 블브가 다가오길 기다렸다. 블브가 지척까지 다가왔을 때 당신은 고함을 질렀다." + "\t청력이 좋은 블브는 귀가 찢어지는 듯한 통증을 느끼며 깜짝 놀라 달아났다. 녀석이 있었던 자리엔 작은 금화 주머니 하나가 놓여져 있었다." + "\t당신은 주머니를 소매에 챙겼다. \n\t금화를 3개 얻었다.",
      heart: 0,
      hungry: 0,
      money: 3
    },
    ],
    [
      {
        text: "\t결과 1",
        heart: -5,
        hungry: 0,
        money: 0
      },
      {
        text: "\t결과 2",
        heart: 0,
        hungry: 0,
        money: 0
      },
    ]
  ]

  hot_point = 0;
  click = false;
  typingIdx = 0;
  height_multiple = 1;
  typingBool = false;
  main_text_view_basic_size = main_text_view.clientHeight;
  split_txt = input_text[index].text.split(""); // 한글자씩 잘라 배열로 저장한다.
  text_view.addEventListener("click", click_on);

  resetRightUI()
  makeRightUI(stat.heart, stat.hungry, stat.money);

  tyInt = setInterval(typing, 20);
}

function resetRightUI() {
  heart_class.innerHTML = "";
  hungry_class.innerHTML = "";
  money_class.innerHTML = "";
}
function makeRightUI(heart: number, hungry: number, money: number) {

  var heartImg = [];
  var heartBImg = [];
  var moneyImg = [];
  var hungryImg = [];
  var money5 = Math.floor(money / 5);

  let i = 0;
  //heart의 개수가 0보다 작거나 maxheart보다 클 수 없게 설정
  if (heart < 0)
    heart = 0;
  else if(heart > stat.heartMax)
    heart = stat.heartMax

  for (i = 0; i < heart; i++) {
    heartImg[i] = new Image();
    heartImg[i].className = "right-ui-img"
    heartImg[i].src = heartLogo;
    heartImg[i].width = 30;
    heart_class.appendChild(heartImg[i]);
  }
  for (i = 0; i < stat.heartMax - heart; i++) {
    heartBImg[i] = new Image();
    heartBImg[i].className = "right-ui-img"
    heartBImg[i].src = heartBLogo;
    heartBImg[i].width = 30;
    heart_class.appendChild(heartBImg[i]);
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
  console.log("click_on" + index);
  click = true
}
function typing() {
  console.log(click);
  //클릭을 했다면 탈출
  if (click === true) {
    clearInterval(tyInt);
    input_text[index].text = input_text[index].text.replace(/\t/g, "&nbsp;");
    input_text[index].text = input_text[index].text.replace(/\n/g, "<br><br>");
    episode_text.innerHTML = input_text[index].text;
    makeOption();
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
      makeOption();
      moveScrollBottom();
    }
  }
}


function moveScrollBottom() {
  var location = text_view.scrollHeight;
  text_view.scrollTo({ top: location, behavior: "smooth" });
}

function makeOption() {
  var optionDiv = [];
  let i = 0;
  option_class.classList.remove("hidden");

  for (i = 0; i < input_option[index].length; i++) {
    optionDiv[i] = document.createElement('div');
    optionDiv[i].className = "option_div"
    optionDiv[i].id = `${i}`;
    optionDiv[i].innerText = input_option[index][i].text;
    optionDiv[i].addEventListener('click', (e: any) => {
      clickOption(e.target.id)
    });
    option_class.appendChild(optionDiv[i]);
  }
}



function clickOption(i: number) {
  var resultDiv: any;
  result_text_class.classList.remove("hidden");
  result_option_class.classList.remove("hidden");
  input_result[index][i].text = input_result[index][i].text.replace(/\t/g, "&nbsp;");
  input_result[index][i].text = input_result[index][i].text.replace(/\n/g, "<br><br>.<br><br>");
  result_text_class.innerHTML += "<br>" + input_result[index][i].text;

  stat.heart += input_result[index][i].heart;
  stat.hungry += input_result[index][i].hungry;
  stat.money += input_result[index][i].money;

  resetRightUI();
  makeRightUI(stat.heart, stat.hungry, stat.money);

  resultDiv = document.createElement('div');
  resultDiv.className = "result_div font-game-thick"
  resultDiv.innerText += "다음으로 . . .";
  resultDiv.addEventListener('click', (e: any) => { click_result() });
  result_option_class.appendChild(resultDiv);

  result_text_class.style.height = `${(text_view.clientHeight) - (result_option_class.clientHeight)}px`;
  moveScrollBottom();
  height_multiple++;
}

function click_result() {
  var episode_number_text = document.querySelector(".episode_number_text") as HTMLDivElement;
  var episode_name = document.querySelector(".episode_name") as HTMLDivElement;

  episode_number_text.innerText = "#1"
  episode_name.innerText = "동굴에서"

  resetTextDiv();

  setTimeout(function () { typing_episode(1) }, 1500)
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