import React from "react";
import { Component } from "react";
import DialogOptions from "./DialogOptions";
import { useEffect , useState} from "react";
import './option_window.css'
import { useUndoableStoriesContext } from "../../../store/undoable-stories";
import { updatePassage } from "../../../store/stories";

type OptionDialogProps = {    
    passage : any
    story : any
    onClose : any
}


export const OptionDialog: React.FC<OptionDialogProps> = (props) => {

    const [title, setTitle] = useState(props.passage.name); 
    const [textUser, setTextUser] = useState(props.passage.text_user);
    const [options, setOptions] = useState(props.passage.options);
    const {dispatch, stories} = useUndoableStoriesContext();
    let regex = /\[\[.*\]\]/g

    console.log("Log : UserDialog() - "); 
    console.log(props.passage);
    //isFriendly:"complex", //friendly, complex, hostile 중 하나.
    
    //제목 변경 함수
    function handleRename(name: string) {
		dispatch(updatePassage(props.story, props.passage, {name}, {dontUpdateOthers: true}));
	}

    function handlePassageTextChange(text_user, options){
        console.log("Log : handlePassageTextChange() - ");
        
        let text = text_user.replace(/\n\[\[.*\]\]/g,''); //text_user에 [[]] 따위를 직접 입력하지 못하도록 모두 제거
        for(let i = 0; i< options.length; i++){
            text = text + "\n" + "[[" + options[i] + "]]";
        }
        dispatch(updatePassage(props.story, props.passage, {text, text_user, options}));
    }

    //본문 + [[선택지]] 로 된 문자열 생성

    return(
        <div className="making-all-container">
            <div className="making-window">
                <div className="making-window-main">
                    <div className="main-info-icon info-icon">본문</div>
                    <textarea value={textUser} name="" id="" cols={30} rows={10} onChange={function(e){
                        setTextUser(e.target.value)
                    }}></textarea>
                </div>
                <DialogOptions onTrackingOption={function(optionArr){
                    console.log("Log : onTrackingOption");
                    let _options = optionArr.concat();
                    
                    setOptions( _options);
                }} options = {options}></DialogOptions>
                <div className="save-btn-container">
                    <button onClick={function(e){
                        console.log("Log : onclick()");
                        handleRename(title);
                        handlePassageTextChange(textUser, options);
                        props.onClose();
                    }}
                    >작성완료</button>
                </div>
            </div>
        </div>
    );

}
