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
            <div className='title_font font-Hahmet text_center'>
              {
                this.props.click_title
              }
            </div>
            <div className='content_font font-Hahmet'>
              {
                this.props.click_explain
              }
            </div>
        </div>
    )
  }
}

export default Game_mode_text;
