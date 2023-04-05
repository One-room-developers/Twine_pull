import React, {Component} from 'react';
import '../Game_mode.css';

type Text_props = {
  click_title : any,
  click_explain : any
}

class Game_mode_text extends Component<Text_props>{
  render() {
    return(
        <div className='game_mode-text side-block'>
            <div className='title_font text_center font-game-thick'>
              {
                this.props.click_title
              }
            </div>
            <div className='content_font font-game-thin'>
              {
                this.props.click_explain
              }
            </div>
        </div>
    )
  }
}

export default Game_mode_text;
