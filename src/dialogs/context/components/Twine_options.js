import React from 'react';
import { Component } from 'react';
import './option.css'
import CreateOption from './TwineCreateOption';

class Twine_options extends Component{
    constructor(props){
        super(props);

        this.max_option_num = 0; //선택지 갯수. 이만큼 반복출력
        this.state = {

            mode:'default',//default, optionCreate, optionModify, optionDelete
            //{id:1, _option_title:"", _status1: "", _amount_change1: 0, _status2: "", _amount_change2: 0, _after_story}
            options_id:[],
            options_title: [],
            options_status1: [],
            options_amount_change1: [],
            options_status2: [],
            options_amount_change2: [],
            options_after_story: [],
            //수정할 옵션의 숫자
            selected_modify_optionNum: 0,
        }
    }
    
    render(){

        //옵션 만든것들 출력 및 수정 가능하도록 변경하는 함수
        let lists = [];

        for(let i=0; i < this.max_option_num; i++){
            //i번째 요소에 i라는 key를 주고 있는데 아예 선택지의 고유 ID를 만들면 그걸로 대체해도 될듯
            //고유 id는 곧 i+1이다.
            //if문에 걸리는 수정하려는 선택지만 form형태의 수정 가능한 html 출력.
            if(this.state.mode === "optionModify" &&  this.state.selected_modify_optionNum === i){
                lists.push(
                    <div key={i} id={i} className="option-list-div option-list-div-onmodify">
                        <div className='info-icon-onmodify'>선택지{i+1}</div>
                        <div className='options-making__container'>
                            <form action='' method='post' key={i} id={i} onSubmit={function(e){//인자로 id까지 받아서 배열에 넣기
                                e.preventDefault();
                                this.setState({ mode: "default"});
                            }.bind(this)}>
                                <input className='option-mini-title' value={this.state.options_title[i]} onChange={function(e){
                                    
                                    let _options_title = this.state.options_title.map((value, index) => {
                                        if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                            return e.target.value;
                                        }
                                        return value;
                                    });
                                    this.setState({options_title: _options_title});

                                    //상위 컴포넌트(Twine)으로 값 전달
                                    this.props.onTrackingOption(_options_title);
                                }.bind(this)} required></input>

                                <div className='mini-line'></div>

                                <div>
                                    <select className='select-dropdown' name='status1' required onChange={function(e){
                                        let _options_status1 = this.state.options_status1.map((value, index) => {
                                            return value;
                                        });
                                        this.setState({options_status1: _options_status1});
                                    }.bind(this)}>
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
                                        let _options_amount_change1 = this.state.options_amount_change1.map((value, index) => {
                                            if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                                //값 치환
                                                return e.target.value;
                                            }
                                            return value;
                                        });
                                        this.setState({options_amount_change1: _options_amount_change1});
                                    }.bind(this)}>
                                        <option value="">(변화량)</option>
                                        <option value="1">+1</option>
                                        <option value="0">0</option>
                                        <option value="-1">-1</option>
                                    </select>
                                </div>

                                <div className='mini-line'></div>

                                <div>
                                    <select className='select-dropdown' name='status2' required onChange={function(e){
                                        let _options_status2 = this.state.options_status2.map((value, index) => {
                                            if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                                return e.target.value;
                                            }
                                            return value;
                                        });
                                        this.setState({options_status2: _options_status2});
                                    }.bind(this)}>
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
                                        let _options_amount_change2 = this.state.options_amount_change2.map((value, index) => {
                                            if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                                
                                                //변화한 값으로 출력
                                                return e.target.value;
                                            }
                                            return value;
                                        });
                                        this.setState({options_amount_change2: _options_amount_change2});
                                    }.bind(this)}>
                                        <option value="0">0</option>
                                        <option value="1">+1</option>
                                        <option value="-1">-1</option>
                                    </select>
                                </div>

                                <div className='mini-line'></div>

                                <textarea className='option-mini-textarea' value={this.state.options_after_story[i]} onChange={function(e){
                                    
                                    let _options_after_story = this.state.options_after_story.map((value, index) => {
                                        if(i === index){//바꾸려고 시도하는 index와 아이디(i=순서)가 같다면
                                            return e.target.value;
                                        }
                                        return value;
                                    });
                                    this.setState({options_after_story: _options_after_story});
                                }.bind(this)} required></textarea>

                                <input className='option-submit-btn' value="확인" type="submit"></input>
                            </form>
                        </div>
                    </div>
                );
            } else {
                let status1;
                let status2;
                switch(this.state.options_status1[i]){
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
                switch(this.state.options_status2[i]){
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
                    <div key={i} id={i} className="option-list-div">
                        <div className='info-icon'>선택지{i+1}</div>
                        <div className='option-info-container'>
                            <div className='option-info-title'>{this.state.options_title[i]}</div>
                            <div className='option-info-main'>
                                <span>{status1}</span>
                                <span>{this.state.options_amount_change1[i]}</span>
                                <span></span>
                                <span>{status2}</span>
                                <span>{this.state.options_amount_change2[i]}</span>
                                <span></span>
                                <span className='after-story-preview-btn'>
                                    <span>에필로그</span>
                                    <div>{this.state.options_after_story[i]}</div>
                                </span>
                            </div>
                        </div>
                        <button className='option-list-m-btn' onClick={function(e){
                            e.preventDefault();
                            this.setState({ mode: "optionModify"});
                            this.setState({selected_modify_optionNum: parseInt(e.target.parentNode.id)});
                        }.bind(this)}>수정</button>
                        <button className='option-list-d-btn' onClick={function(e){
                            //splice(제거를 시작할 index, 시작지점부텨 몇개 지울선지, (선택사항) 지운 자리에 넣을 배열)
                            
                            if(window.confirm("선택지를 삭제하시겠습니까?")) {
                                const index = parseInt(e.target.parentNode.id);
                                console.log(index);

                                //let _options_id = Array.from(this.state.options_id);
                                let _options_title = Array.from(this.state.options_title);
                                let _options_status1 = Array.from(this.state.options_status1);
                                let _options_amount_change1 = Array.from(this.state.options_amount_change1);
                                let _options_status2 = Array.from(this.state.options_status2);
                                let _options_amount_change2 = Array.from(this.state.options_amount_change2);
                                let _options_after_story = Array.from(this.state.options_after_story);

                                //_options_id.splice(index, 1);
                                _options_title.splice(index, 1);
                                _options_status1.splice(index, 1);
                                _options_amount_change1.splice(index, 1);
                                _options_status2.splice(index, 1);
                                _options_amount_change2.splice(index, 1);
                                _options_after_story.splice(index, 1);

                                console.log(_options_title);

                                this.max_option_num = this.max_option_num -1;

                                this.setState({
                                    //options_id: _options_id,
                                    options_title: _options_title,
                                    options_status1: _options_status1,
                                    options_amount_change1: _options_amount_change1,
                                    options_status2: _options_status2,
                                    options_amount_change2: _options_amount_change2,
                                    options_after_story: _options_after_story
                                });
                                //상위 컴포넌트(Twine)으로 값 전달
                                this.props.onTrackingOption(_options_title);
                            } else {

                            }
                        }.bind(this)}>삭제</button>
                    </div>
                );
            }
        }

        //선택지 생성 컴포넌트 만들기
        let option_creator;
        if(this.state.mode === 'optionCreate'){
            //선택지 갯수 5개 이상 불가
            if(this.max_option_num > 4){
                this.setState({mode: "default"});
                alert("선택지는 최대 5개까지 만들 수 있습니다.");
            }
            else{
                option_creator = <CreateOption onCreate={
                    function(option_title, status1, amount_change1, status2, amount_change2, after_story) {
    
                        //선택지 목록 아이디를 위한 갯수 추가
                        this.max_option_num = this.max_option_num + 1;
                        //새로 만든 배열 추가하여 생성
    
                        //const _options_id = this.state.options_id.concat(this.max_option_num);
                        const _options_title = this.state.options_title.concat(option_title);
                        const _options_status1 = this.state.options_status1.concat(status1);
                        const _options_amount_change1 = this.state.options_amount_change1.concat(amount_change1);
                        const _options_status2 = this.state.options_status2.concat(status2);
                        const _options_amount_change2 = this.state.options_amount_change2.concat(amount_change2);
                        const _options_after_story = this.state.options_after_story.concat(after_story);
                        //배열 새로 저장. 원본을 바꾸지 않는 형태로 진행하기 위한 코드임.
                        this.setState({
                            //options_id: _options_id,
                            options_title: _options_title,
                            options_status1: _options_status1,
                            options_amount_change1: _options_amount_change1,
                            options_status2: _options_status2,
                            options_amount_change2: _options_amount_change2,
                            options_after_story: _options_after_story,
                            mode: "default"
                        });

                        //상위 컴포넌트(Twine)으로 값 전달
                        this.props.onTrackingOption(_options_title);
                    }.bind(this)
                }/>;
            }
        }
        else{
            option_creator='';
        }

        //선택지 제거하기
        //if(this.state.mode === '')


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
                    <a className='add-option-btn' href='/' onClick={function(e){
                        e.preventDefault();
                        if(this.state.mode === 'optionCreate'){
                            if(window.confirm("작성 중인 선택지 정보가 사라집니다.\n정말 선택지 생성 창을 닫으시겠습니까?")){
                                this.setState({mode: 'default'});
                            }
                        }
                        else{
                            this.setState({mode: 'optionCreate'});
                        }
                        }.bind(this) }>
                            + 선택지 추가하기</a>
                </div>
            </div>
        )
    }
}

export default Twine_options;