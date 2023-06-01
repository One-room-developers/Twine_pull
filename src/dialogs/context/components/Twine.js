import React from "react";
import { Component } from "react";
import Twine_options from "./Twine_options";
import './option_window.css'

class Twine extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: "",
            context: "",
            options_title: [],
            //isFriendly:"complex", //friendly, complex, hostile 중 하나.
        }
        this.convertedString = ""
    }

    //main과 options에 this.updateContext()로 추가해주기
    updateContext(length){
        //값 초기화.
        this.convertedString = this.state.context;
        for(let i = 0; i< length; i++){
            this.convertedString = this.convertedString + "\n" + "[[" + this.state.options_title[i] + "]]";
        }
    }

    render(){
        return(
            <div className="making-all-container">
                <div className="making-window">
                    <div className="making-window-header">
                        <div className="title-info-icon info-icon">제목</div>
                        <input value={this.state.title} onChange={function(e){
                            this.setState({title: e.target.value});
                        }.bind(this)} />
                    </div>
                    <div className="making-window-main">
                        <div className="main-info-icon info-icon">본문</div>
                        <textarea value={this.state.context} name="" id="" cols="30" rows="10" onChange={async function(e){
                            await this.setState({context: e.target.value});
                            if(Array.isArray(this.state.options_title)){
                                await this.updateContext(this.state.options_title.length);
                            }
                        }.bind(this)}></textarea>
                    </div>
                    <Twine_options onTrackingOption={async function(optionTitleArr){
                        let _options_title = await optionTitleArr.concat();
                        await this.setState({options_title : _options_title});
                        
                        if(Array.isArray(_options_title)){
                            await this.updateContext(_options_title.length);
                        }
                        console.log(this.state.options_title);
                        console.log(this.convertedString);
                    }.bind(this)}></Twine_options>
                    <div className="save-btn-container">
                        <button>작성완료</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Twine;