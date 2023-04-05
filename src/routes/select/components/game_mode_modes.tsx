import React, {Component} from 'react';
import '../Game_mode.css';
import apoImg from '../img/mode-apo.png';

type Modes_props = {
  hover : any,
  click : any,
  onHover : any,
  onClick : any
}

class Game_mode_modes extends Component<Modes_props>{
  render() {
    return(
        <div className='game_mode-modes'>
            <div 
              className={
                `game_mode-modes-element ${this.props.hover===1 ? 'hover' : ''} ${this.props.click===1 ? 'click' : ''}`
              }
              onMouseEnter=
              {
                function(e){
                this.props.onHover(1);
              }.bind(this)}
              onMouseLeave=
              {
                function(e){
                  this.props.onHover(0);
                }.bind(this)
              }
              onClick=
              {
                function(e){
                  this.props.onClick(1);
                }.bind(this)
              }
            >
                <div className='genre-img'></div>
                <div className='subtitle_font font-Hahmet'>아포칼립스</div>
            </div>
            <div 
              className={
                `game_mode-modes-element ${this.props.hover===2 ? 'hover' : ''} ${this.props.click===2 ? 'click' : ''}`
              }
              onMouseEnter=
              {
                function(e){
                this.props.onHover(2);
              }.bind(this)}
              onMouseLeave=
              {
                function(e){
                  this.props.onHover(0);
                }.bind(this)
              }
              onClick=
              {
                function(e){
                  this.props.onClick(2);
                }.bind(this)
              }
            >
                <div className='genre-img'></div>
                <div className='subtitle_font font-Hahmet'>판타지</div>
            </div>
        </div>
    )
  }
}

export default Game_mode_modes;
