import React, {Component} from 'react';
import './Game_mode.css';
import Modes from './components/game_mode_modes'
import Text from './components/game_mode_text'
import Select from './components/game_mode_select'
import Line from '../../styles/image/wave_line.svg'


class Game_mode extends Component<any, any>{
  
  constructor(props : any){
    super(props);
    this.state = {
      hover : 1,
      click : 1,
      contents : [
        {id : 1, title : '아포칼립스', explain : '멸망한 세계에서 살아남으세요.'},
        {id : 2, title : '판타지', explain : '마법과 검의 세계에서 당신을 증명하세요.'}
      ]
    }
  }
  
  
  render() {
    var click_content = this.state.contents.filter(element => (element.id === this.state.click))[0];
    return(
      <div className={`game_mode-container ${this.props.hidden ? 'hidden' : ''}`}>
        <div className='game_mode-background'>
          <img className='line' src={Line} alt="" />
          <div className='game_mode'>
            <div className='mode-container'>
              <Text
                click_title= {
                  click_content.title
                }
                click_explain = {
                  click_content.explain
                }
              />
              {/* 추후 가운데 장르 선택 btn들이 왼쪽의 설명란의 아래로 사라지는 연출을 만들어보기 위해 side-block을 두었음. */}
              <div className='side-block'></div>
              <Modes 
                
                click = {this.state.click}
                
                onClick = {
                  function(number){
                    this.setState({click : Number(number)})
                  }.bind(this)
                }
              />
              <div className='side-block'></div>
            </div>
            <Select
              click = {this.state.click}
              onClickCancel = {
                function(){
                  this.props.hiddenOff();
                }.bind(this)
              }
            /> 
          </div>
          <img className='line' src={Line} alt="" />
        </div>
      </div>
    )
  }
}

export default Game_mode;
