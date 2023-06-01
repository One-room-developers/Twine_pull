import React from 'react';
import { Component } from 'react';

/* state에 저장해서 DB로 보내줘야하는 선택지 정보 나열
1. 어떤 에피소드의 선택지인가 - int
2. 선택지 내용(텍스트) - string
3. 어떤 스테이터스가 변화하는지 - string
4. 얼마나 변화하는지 - int
5. 선택지 클릭시 결과 스토리 - string

+ 에피소드가 적대적인지 복합적인지 친화적인지 판단할 정보*/

type Modes_props = {
    onCreate:any;
}

class CreateOption extends Component<Modes_props> {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='options-making__container'>
                <form action='' method='post'
                onSubmit={function(e) {
                    e.preventDefault();
                    this.props.onCreate(e.target.option_title.value, e.target.status1.value, e.target.amount_change1.value, e.target.status2.value, e.target.amount_change2.value, e.target.after_story.value);
                }.bind(this)}>
                    
                    <input className='option-mini-title' name='option_title' placeholder='선택지 출력 내용' required></input>

                    <div className='mini-line'></div>

                    <div>
                        <select className='select-dropdown' name='status1' required>
                            <option value="">(능력)</option>
                            <option value="health">체력</option>
                            <option value="money">돈</option>
                            <option value="satiety">포만감</option>
                            <option value="strength">힘</option>
                            <option value="agility">민첩</option>
                            <option value="armor">내구도</option>
                            <option value="mental">정신력</option>
                        </select>

                        <select className='select-dropdown' name='amount_change1' required>
                            <option value="">(변화량)</option>
                            <option value="1">+1</option>
                            <option value="0">0</option>
                            <option value="-1">-1</option>
                        </select>
                    </div>

                    <div className='mini-line'></div>

                    <div>
                        <select className='select-dropdown' name='status2' required>
                            <option value="">(능력2)</option>
                            <option value="null">(없음)</option>
                            <option value="health">체력</option>
                            <option value="money">돈</option>
                            <option value="satiety">포만감</option>
                            <option value="strength">힘</option>
                            <option value="agility">민첩</option>
                            <option value="armor">내구도</option>
                            <option value="mental">정신력</option>
                        </select>

                        <select className='select-dropdown' name='amount_change2' required>
                            <option value="0">0</option>
                            <option value="1">+1</option>
                            <option value="-1">-1</option>
                        </select>
                    </div>

                    <div className='mini-line'></div>

                    
                    <textarea placeholder='플레이어가 선택지 선택 후에 등장하는 결과 이야기' className='option-mini-textarea' name="after_story" id="" cols={30} rows={10} required></textarea>
                    
                    <input className='option-submit-btn' type="submit" value="생성하기"></input>
                </form>
            </div>
        )
    }
}

export default CreateOption;