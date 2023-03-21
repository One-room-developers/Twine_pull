import React, {Component} from 'react';
import './Game_mode.css';
import Modes from './components/game_mode_modes'
import Text from './components/game_mode_text'
import Select from './components/game_mode_select'


class Game_mode extends Component<any, any>{
  
  constructor(props : any){
    super(props);
    this.state = {
      hover : 1,
      click : 1,
      contents : [
        {id : 1, title : '아포칼립스', explain : '멸망한 세계에서 살아남으세요'},
        {id : 2, title : '판타지', explain : '마법과 검의 세계에서 당신의 가능성을 증명해보세요'}
      ]
    }
  }
  
  
  render() {
    var click_content = this.state.contents.filter(element => (element.id === this.state.click))[0];
    return(
      <div className={`main ${this.props.hidden ? 'hidden' : ''}`}>
        <div className='game_mode-background'></div>
        <div className='game_mode'>
          <Text
            click_title= {
              click_content.title
            }
            click_explain = {
              click_content.explain
            }
          />
          <Modes 
            hover = {this.state.hover} 
            click = {this.state.click}
            onHover = {
              function(number){
                this.setState({hover : Number(number)})
              }.bind(this)
            }
            onClick = {
              function(number){
                this.setState({click : Number(number)})
              }.bind(this)
            }
          />
          <Select
            click = {this.state.click}
            onClickCancel = {
              function(){
                this.props.hiddenOff();
              }.bind(this)
            }
          /> 
        </div>
      </div>
    )
  }
}

export default Game_mode;
