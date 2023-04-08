import React, {Component} from 'react';
import '../Game_mode.css';

type Text_props = {
  click_title : any,
  click_explain : any
}

class Game_mode_text extends Component<Text_props>{
  render() {
    return(
        <div className='game_mode-text'>
            <h1 className='title_font text_center font-game-thick'>
              {
                this.props.click_title
              }
            </h1>
            <h2 className='content_font font-game-thin'>
              {
                this.props.click_explain
              }
            </h2>
        </div>
    )
  }
}

export default Game_mode_text;
