import React from 'react';
import { Component, useState } from 'react';
import './option.css'
import CreateOption from './CreateOption';
import { Passage, Story, option, updatePassage } from '../../../store/stories';
import { StoriesActionOrThunk} from '../../../store/undoable-stories';

type DialogOptionsProps = {
    onTrackingOption : any;
    options : option[];
    passage : Passage
    story : Story
    dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void
    onClose : any
}

export const DialogOptions : React.FC<DialogOptionsProps> = (props) => {
    let dummyOptionTitles : string[] = [];
    let dummyOptionsStatus1 : string[] = [];
    let dummyOptionsAmountChange1 : number[] = [];
    let dummyOptionsStatus2 : string[] = [];
    let dummyOptionsAmountChange2 : number[] = [];
    let dummyOptionsAfterStory : string[] = [];

    let max_option_num:number = props.options.length ?? 0;
    const {dispatch} = props;

    if(props.options){ 
        props.options.forEach(option => {
            dummyOptionTitles.push(option.title)
            dummyOptionsStatus1.push(option.status1)
            dummyOptionsAmountChange1.push(option.status1_num)
            dummyOptionsStatus2.push(option.status2)
            dummyOptionsAmountChange2.push(option.status2_num)
            dummyOptionsAfterStory.push(option.after_stroy)
        })
    }

    const [mode, setMode] = useState('default');//default, optionCreate, optionModify, optionDelete
    const [optionsTitle, setOptionsTitle] = useState(dummyOptionTitles);
    const [optionsStatus1, setOptionsStatus1] = useState(dummyOptionsStatus1);
    const [optionsAmountChange1, setOptionsAmountChange1] = useState(dummyOptionsAmountChange1);
    const [optionsStatus2, setOptionsStatus2] = useState(dummyOptionsStatus2);
    const [optionsAmountChange2, setOptionsAmountChange2] = useState(dummyOptionsAmountChange2);
    const [optionsAfterStory, setOptionsAfterStory] = useState(dummyOptionsAfterStory);
    //수정할 옵션의 숫자
    const [selectedModifyOptionNum, setselectedModifyOptionNum] = useState(0);
    //
    const [nextPassageName, setNextPassageName] = useState("");

    function makeOptionsToReturn(optionsTitle, optionsAfterStory, optionsStatus1, optionsStatus2, optionsAmountChange1, optionsAmountChange2){

        let _options : option[] = []
        for(let i =0; i<max_option_num; i++){
            _options.push({
                title : optionsTitle[i],
                after_stroy : optionsAfterStory[i],
                status1 : optionsStatus1[i],
                status2 : optionsStatus2[i],
                status1_num : optionsAmountChange1[i],
                status2_num : optionsAmountChange2[i]
            })
        }
        return _options;
    }

    //옵션 만든것들 출력 및 수정 가능하도록 변경하는 함수
    let lists = [];

    for(let i=0; i < max_option_num; i++){
        //i번째 요소에 i라는 key를 주고 있는데 아예 선택지의 고유 ID를 만들면 그걸로 대체해도 될듯
        //고유 id는 곧 i+1이다.
        //if문에 걸리는 수정하려는 선택지만 form형태의 수정 가능한 html 출력.
        if(mode === "optionModify" &&  selectedModifyOptionNum === i){
            lists.push(
                <div key={i} id={i.toString()} className="option-list-div option-list-div-onmodify">
                    <div className='info-icon-onmodify'>선택지{i+1}</div>
                    <div className='options-making__container'>
                        <form action='' method='post' key={i} id={i.toString()} onSubmit={function(e){//인자로 id까지 받아서 배열에 넣기
                            e.preventDefault();
                            setMode("default");
                        }}>
                            <input className='option-mini-title' value={optionsTitle[i]} onChange={function(e){
                                let _optionsTitle = optionsTitle.map((value, index) => {
                                    if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                        return e.target.value;
                                    }
                                    return value;
                                });
                                setOptionsTitle(_optionsTitle);

                                //상위 컴포넌트(Twine)으로 값 전달
                                props.onTrackingOption(makeOptionsToReturn(optionsTitle, optionsAfterStory, optionsStatus1, optionsStatus2, optionsAmountChange1, optionsAmountChange2));
                            }} required></input>

                            <div className='mini-line'></div>

                            <div>
                                <select className='select-dropdown' name='status1' required onChange={function(e){
                                    let _optionsStatus1 = optionsStatus1.map((value, index) => {
                                        return value;
                                    });
                                    setOptionsStatus1(_optionsStatus1);
                                }}>
                                    <option value="">(능력)</option>
                                    <option value="health">체력</option>
                                    <option value="money">돈</option>
                                    <option value="satiety">포만감</option>
                                    <option value="strength">힘</option>
                                    <option value="agility">민첩</option>
                                    <option value="armor">내구도</option>
                                    <option value="mental">정신력</option>
                                </select>

                                <select className='select-dropdown' name='amount_change1' required onChange={function(e){
                                    let _optionsAmountChange1 : number[] = optionsAmountChange1.map((value, index) => {
                                        if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                            //값 치환
                                            return parseInt(e.target.value);
                                        }
                                        return value;
                                    });
                                    setOptionsAmountChange1(_optionsAmountChange1);
                                }}>
                                    <option value="">(변화량)</option>
                                    <option value="1">+1</option>
                                    <option value="0">0</option>
                                    <option value="-1">-1</option>
                                </select>
                            </div>

                            <div className='mini-line'></div>

                            <div>
                                <select className='select-dropdown' name='status2' required onChange={function(e){
                                    let _optionsStatus2 = optionsStatus2.map((value, index) => {
                                        if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                            return e.target.value;
                                        }
                                        return value;
                                    });
                                    setOptionsStatus2(_optionsStatus2);
                                }}>
                                    <option value="">(능력2)</option>
                                    <option value="null">없음</option>
                                    <option value="health">체력</option>
                                    <option value="money">돈</option>
                                    <option value="satiety">포만감</option>
                                    <option value="strength">힘</option>
                                    <option value="agility">민첩</option>
                                    <option value="armor">내구도</option>
                                    <option value="mental">정신력</option>
                                </select>

                                <select className='select-dropdown' name='amount_change2' required onChange={function(e){
                                    let _optionsAmountChange2 : number[] = optionsAmountChange2.map((value, index) => {
                                        if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                            
                                            //변화한 값으로 출력
                                            return parseInt(e.target.value);
                                        }
                                        return value;
                                    });
                                    setOptionsAmountChange2(_optionsAmountChange2);
                                }}>
                                    <option value="0">0</option>
                                    <option value="1">+1</option>
                                    <option value="-1">-1</option>
                                </select>
                            </div>

                            <div className='mini-line'></div>

                            <textarea className='option-mini-textarea' value={optionsAfterStory[i]} onChange={function(e){
                                
                                let _options_after_story = optionsAfterStory.map((value, index) => {
                                    if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                        return e.target.value;
                                    }
                                    return value;
                                });
                                setOptionsAfterStory(_options_after_story);
                            }} required></textarea>

                            <input className='option-submit-btn' value="확인" type="submit"></input>
                        </form>
                    </div>
                </div>
            );
        } else {
            let status1;
            let status2;
            switch(optionsStatus1[i]){
                case 'null':
                    status1="변화없음";
                    break;
                case 'health':
                    status1="체력";
                    break;
                case 'money':
                    status1="돈";
                    break;
                case 'satiety':
                    status1="포만감";
                    break;
                case 'strength':
                    status1="힘";
                    break;
                case 'agility':
                    status1="속도";
                    break;
                case 'armor':
                    status1="내구도";
                    break;
                case 'mental':
                    status1="정신력";
                    break;
                default:
                    status1 ="없음";
            }
            switch(optionsStatus2[i]){
                case 'null':
                    status2="없음";
                    break;
                case 'health':
                    status2="체력";
                    break;
                case 'money':
                    status2="돈";
                    break;
                case 'satiety':
                    status2="포만감";
                    break;
                case 'strength':
                    status2="힘";
                    break;
                case 'agility':
                    status2="속도";
                    break;
                case 'armor':
                    status2="내구도";
                    break;
                case 'mental':
                    status2="정신력";
                    break;
                default:
                    status2 ="없음";
            }
            lists.push(
                <div key={i} id={i.toString()} className="option-list-div">
                    <div className='info-icon'>선택지{i+1}</div>
                    <div className='option-info-container'>
                        <div className='option-info-title'>{optionsTitle[i]}</div>
                        <div className='option-info-main'>
                            <span>{status1}</span>
                            <span>{optionsAmountChange1[i]}</span>
                            <span></span>
                            <span>{status2}</span>
                            <span>{optionsAmountChange2[i]}</span>
                            <span></span>
                            <span className='after-story-preview-btn'>
                                <span>에필로그</span>
                                <div>{optionsAfterStory[i]}</div>
                            </span>
                        </div>
                    </div>
                    <button data-optionId={i} className='option-list-m-btn' onClick={function(e:React.SyntheticEvent<HTMLButtonElement>){
                        e.preventDefault();
                        setMode("optionModify");

                        //다른 엘리먼트일떄 탈출문
                        if (!(e.target instanceof HTMLButtonElement)) {
                            return;
                        }
                        setselectedModifyOptionNum(parseInt(e.target.dataset.optionId));
                    }}>수정</button>
                    <button data-optionId={i} className='option-list-d-btn' onClick={function(e){
                        //splice(제거를 시작할 index, 시작지점부텨 몇개 지울선지, (선택사항) 지운 자리에 넣을 배열)
                        
                        if(window.confirm("선택지를 삭제하시겠습니까?")) {
                            //다른 엘리먼트일떄 탈출문
                            if (!(e.target instanceof HTMLButtonElement)) {
                                return;
                            }
                            const index = parseInt(e.target.dataset.optionId);
                            console.log(index);

                            //let optionsId = Array.from(options_id);
                            let _optionsTitle = Array.from(optionsTitle);
                            let _optionsStatus1 = Array.from(optionsStatus1);
                            let _optionsAmountChange1 = Array.from(optionsAmountChange1);
                            let _optionsStatus2 = Array.from(optionsStatus2);
                            let _optionsAmountChange2 = Array.from(optionsAmountChange2);
                            let _options_after_story = Array.from(optionsAfterStory);

                            //optionsId.splice(index, 1);
                            _optionsTitle.splice(index, 1);
                            _optionsStatus1.splice(index, 1);
                            _optionsAmountChange1.splice(index, 1);
                            _optionsStatus2.splice(index, 1);
                            _optionsAmountChange2.splice(index, 1);
                            _options_after_story.splice(index, 1);

                            console.log(_optionsTitle);

                            max_option_num = max_option_num -1;

                            //options_id: optionsId,
                            setOptionsTitle(_optionsTitle);
                            setOptionsStatus1(_optionsStatus1)
                            setOptionsAmountChange1(_optionsAmountChange1)
                            setOptionsStatus2(_optionsStatus2)
                            setOptionsAmountChange2(_optionsAmountChange2)
                            setOptionsAfterStory(_options_after_story)
                            //상위 컴포넌트(Twine)으로 값 전달
                            props.onTrackingOption(makeOptionsToReturn(_optionsTitle, _options_after_story, _optionsStatus1, _optionsStatus2, _optionsAmountChange1, _optionsAmountChange2));
                        } else {

                        }
                    }}>삭제</button>
                </div>
            );
        }
    }

    //선택지 생성 컴포넌트 만들기
    let option_creator;
    let passage_creator;
    if(mode === 'optionCreate'){
        //선택지 갯수 5개 이상 불가
        if(max_option_num > 4){
            setMode("default");
            alert("선택지는 최대 5개까지 만들 수 있습니다.");
        }
        else{
            option_creator = <CreateOption onCreate={
                function(option_title, status1, amount_change1, status2, amount_change2, after_story) {
                    if(!(props.story.passages.find(passage => passage.name === option_title))){
                        //선택지 목록 아이디를 위한 갯수 추가
                        max_option_num = max_option_num + 1;
                        //새로 만든 배열 추가하여 생성

                        //const optionsId = options_id.concat(this.max_option_num);
                        const _optionsTitle = optionsTitle.concat(option_title);
                        const _optionsStatus1 = optionsStatus1.concat(status1);
                        const _optionsAmountChange1 = optionsAmountChange1.concat(amount_change1);
                        const _optionsStatus2 = optionsStatus2.concat(status2);
                        const _optionsAmountChange2 = optionsAmountChange2.concat(amount_change2);
                        const _options_after_story = optionsAfterStory.concat(after_story);

                        //배열 새로 저장. 원본을 바꾸지 않는 형태로 진행하기 위한 코드임.
                        //options_id: optionsId,
                        setOptionsTitle(_optionsTitle)
                        setOptionsStatus1(_optionsStatus1)
                        setOptionsAmountChange1(_optionsAmountChange1)
                        setOptionsStatus2(_optionsStatus2)
                        setOptionsAmountChange2(_optionsAmountChange2)
                        setOptionsAfterStory(_options_after_story)
                        setMode("default")

                        //상위 컴포넌트(Twine)으로 값 전달
                        props.onTrackingOption(makeOptionsToReturn(_optionsTitle, _options_after_story, _optionsStatus1, _optionsStatus2, _optionsAmountChange1, _optionsAmountChange2));
                    }   
                    else{
                        window.alert("중복된 이름입니다!");
                    }
                }
            }/>;
        }
    }
    else{
        option_creator='';
    }

    //선택지 제거하기
    //if(mode === '')


    return(
        <div className="option-ui__container">
            {/* 수정 이벤트 함수(mode와 어떤 option선택 되었는지 id올리기), 제거 이벤트 함수, 데이터, 선택지 갯수 정보 보냄 */}
            <div className="options-show__container">
                {lists}
            </div>

            <div className='add-option-btn-container'>
                {
                    option_creator
                }
                {
                    passage_creator
                }
                {
                    (props.passage.passageType === "normalPassage") ? (
                        <a className='add-option-btn' onClick={function(e){
                            if(mode === 'optionCreate'){
                                if(window.confirm("작성 중인 선택지 정보가 사라집니다.\n정말 선택지 생성 창을 닫으시겠습니까?")){
                                    setMode('default')
                                }
                            }
                            else{
                                setMode('optionCreate')
                            }
                        } 
                        }>
                            + 선택지 추가하기
                        </a>
                    ) : (
                        <>
                            <input placeholder='제목' required value={nextPassageName} onChange={function(e){
                                setNextPassageName(e.target.value);
                            }}></input>
                            <a className='add-option-btn' onClick={
                                function(e){
                                    const text = props.passage.text + "\n" +"[[" + nextPassageName + "]]";
                                    const text_user = props.passage.text_user;
                                    let nextPassages = props.passage.nextPassages
                                    nextPassages.push(nextPassageName);
                                    dispatch(updatePassage(props.story, props.passage, {text, text_user, nextPassages}));
                                    props.onClose();
                                } 
                            }>
                                + 새 에피소드
                            </a>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}