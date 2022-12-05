import axios from 'axios';

export{main};
let input_text = [];
let input_option = [];
let option_result = new Object();
let input_result = [];
let episode_num = Math.floor(Math.random() * 6) + 1;

function main() {
  let episode_title = document.querySelector('.episode_name');
  let episode_number = document.querySelector('.episode_number_text');

  // 에피소드 가져오기
  axios.get(`http://localhost:3001/game_play/episode/${episode_num}`)
  .then((res) => {
    episode_number.innerText = '#'+res.data.id;
    episode_title.innerText = res.data.title;
    input_text.push(res.data.mainText);
  });

  // 선택지 가져오기
  axios.get(`http://localhost:3001/game_play/options/${episode_num}`)
  .then((res) => {
    option_result = res.data;

    for(let i = 0; i < res.data.length; i++) {
      input_option.push([]);
      input_option[0].push(res.data[i].text);
    };

    // 캐릭터 스테이터스 가져오기
    axios.get('http://localhost:3001/game_play/character/1')
    .then((res) => {
      // 선택지를 고른 후 캐릭터 스테이터스 업데이트
      axios.patch('http://localhost:3001/game_play/change_character/1', 
      {
        "changed_health": res.data.health + option_result[0].health_change,
        "changed_money": res.data.money + option_result[0].money_change,
        "changed_hungry": res.data.hungry + option_result[0].hungry_change,
        "changed_strength": res.data.strength + option_result[0].strength_change,
        "changed_agility": res.data.agility + option_result[0].agility_change,
        "changed_armour": res.data.armour + option_result[0].armour_change,
        "changed_mental": res.data.mental + option_result[0].mental_change,
      })
      .then((res) => {
        console.log(res.data);

      input_result.push([]);
      input_result[0].push(option_result[0].result_text);
      })
      .catch((error) => console.log(error.response));
      });
    });

  setTimeout(function(){typing_episode(0)}, 3000);
};

function typing_episode(index){

  var episode_text = document.querySelector('.episode_text');
  var text_view = document.querySelector('.text_view');
  var main_text_view = document.querySelector('.text_view-main')
  var option_class = document.querySelector('.episode_option');
  var result_text_class = document.querySelector('.episode_result_text')
  var result_option_class = document.querySelector('.episode_result_option')

  var split_txt;
  var hot_point = 0;
  var click = false;
  var typingIdx = 0;
  var height_multiple = 1;
  var typingBool = false;
  var main_text_view_basic_size = main_text_view.clientHeight;
  var tyInt;

  split_txt = input_text[index].split(""); // 한글자씩 잘라 배열로 저장한다.

  text_view.addEventListener("click", click_on);




  tyInt = setInterval(typing , 20);


  function click_on(){
    console.log("click_on" + index);  
    click = true
  }
  function typing(){
    console.log(click);
      //클릭을 했다면 탈출
    if(click === true){
      clearInterval(tyInt);
      input_text[index] = input_text[index].replace(/\t/g, "&nbsp;");
      input_text[index] = input_text[index].replace(/\n/g, "<br><br>");
      episode_text.innerHTML = input_text[index];
      option_on();
      moveScrollBottom();
      text_view.removeEventListener("click", click_on);
      click = false;
    }
    //클릭을 안했다면 수행
    else{ 
      if(typingIdx < split_txt.length) {
        // 타이핑될 텍스트 길이만큼 반복
        if(hot_point !== 0){ 
          hot_point -= 1;
        }
        else{
          if(split_txt[typingIdx] === "\n"){
            episode_text.innerHTML += "<br><br>"
            hot_point = 20; //온점이 나오면 2번의 반복 기간동안 쉼
          }
          else if(split_txt[typingIdx] === "\t"){
            episode_text.innerHTML += "&nbsp;"
          }
          else{
            episode_text.innerHTML += split_txt[typingIdx] 
          }
          typingIdx++;
          
          if(text_view.clientHeight*height_multiple < episode_text.clientHeight + document.querySelector(".text_view-header").clientHeight){
            episode_text.innerText = episode_text.innerText.slice(0,-1);
            console.log("size : "+text_view.clientHeight*height_multiple + main_text_view_basic_size);
            main_text_view.style.height = `${(text_view.clientHeight*height_multiple + main_text_view_basic_size) }px`;
            moveScrollBottom();
            hot_point = 30;
            height_multiple++;
          }
        }
      }
      else {
        clearInterval(tyInt); //끝나면 반복종료
        option_on();
        moveScrollBottom();
      }
    }
  }


  function moveScrollBottom(){
    var location = text_view.scrollHeight;
    text_view.scrollTo({ top: location, behavior: "smooth" });
  }

  function option_on(){
    var optionDiv = [];
    let i = 0;
    option_class.classList.remove("hidden");
    
    for(i=0; i<input_option[index].length; i++){
      optionDiv[i] = document.createElement('div');
      optionDiv[i].className = "option_div"
      optionDiv[i].id = `${i}`;
      optionDiv[i].innerText = input_option[index][i];
      optionDiv[i].addEventListener('click', (e)=>{click_option(e.target.id)});
      option_class.appendChild(optionDiv[i]);
    }
  }

  function click_option(i){
    var resultDiv;
    result_text_class.classList.remove("hidden");
    result_option_class.classList.remove("hidden");
    //input_result[index][i] = input_result[index][i].replace(/\t/g, "&nbsp;");
    //input_result[index][i] = input_result[index][i].replace(/\n/g, "<br><br>.<br><br>");
    result_text_class.innerHTML += "<br>" + input_result[index][i];

    resultDiv = document.createElement('div');
    resultDiv.className = "result_div font-game-thick"
    resultDiv.innerText += "다음으로 . . .";
    resultDiv.addEventListener('click', (e)=>{click_result()});
    result_option_class.appendChild(resultDiv);

    result_text_class.style.height = `${(text_view.clientHeight)-(result_option_class.clientHeight)}px`;
    moveScrollBottom();
    height_multiple++;
  }

  function click_result(){
    document.querySelector(".episode_number_text").innerText = "#1"
    document.querySelector(".episode_name").innerText = "동굴에서"
    episode_text.innerText = "";
    option_class.innerHTML = "";
    result_text_class.innerHTML = "";
    result_option_class.innerHTML = ""; 
    main_text_view.style.height = "auto";
    option_class.classList.add("hidden");
    result_text_class.classList.add("hidden");
    result_option_class.classList.add("hidden");
    setTimeout(function(){typing_episode(1)}, 1500)
  }
}