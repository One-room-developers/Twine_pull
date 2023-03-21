import React, {Component} from 'react';
import '../Game_mode.css';

type Select_props = {
  click : any,
  onClickCancel : any
}

class Game_mode_select extends Component<Select_props>{
  render() {
    return(
      <div className='game_mode-select_button'>
        <button 
          onClick={
              function(){
                window.location.replace("./#/game-play")
              }.bind(this)
            }
        >
          선택
        </button>
        <button
          onClick={
            function(){
              this.props.onClickCancel();
            }.bind(this)
          }
        >
          취소
        </button>
      </div>
    )
  }
}

export default Game_mode_select;
