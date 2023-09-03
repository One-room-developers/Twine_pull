import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../Game_mode.css';

type Select_props = {
  click : any,
  onClickCancel : any,
  genre: number
}

class Game_mode_select extends Component<Select_props>{
  render() {
    return(
      <div className='game_mode-select_button'>
        <Link className='font-game-thin mode_select_btn' to={`gameplay/${this.props.genre}`}>
          선택
        </Link>
        <button
          className='font-game-thin mode_select_btn'
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
