import React from "react";
import { Component } from "react";
import DialogOptions from "./DialogOptions";
import { useEffect , useState} from "react";
import './option_window.css'
import { useUndoableStoriesContext } from "../../../store/undoable-stories";
import { updatePassage } from "../../../store/stories";

type Modes_props = {    
    passage : any
    story : any
    onWrite : any
}


export const UserDialog: React.FC<Modes_props> = (props) => {

    const [title, setTitle] = useState(props.passage.name);
    const [context, setContext] = useState(props.passage.text);
    const [optionsTitle, setOptionsTitle] = useState([]);
    const {dispatch, stories} = useUndoableStoriesContext();
    let regex = /\[\[.*\]\]/g
    useEffect(()=>{
        console.log(context.match(regex))
    }, [])   
    //isFriendly:"complex", //friendly, complex, hostile 중 하나.
    useEffect(()=>{
        setTitle(props.passage.name);
        setContext(props.passage.text);
        
    },[props.passage.name, props.passage.text])
    
    let convertedString:string = "";

    //제목 변경 함수
    function handleRename(name: string) {
		dispatch(updatePassage(props.story, props.passage, {name}, {dontUpdateOthers: true}));
	}

    //main과 options에 this.updateContext()로 추가해주기
    function updateContext():void{
        //값 초기화.
        convertedString = context;
        for(let i = 0; i< optionsTitle.length; i++){
            convertedString = convertedString + "\n" + "[[" + optionsTitle[i] + "]]";
        }
    }

    return(
        <div className="making-all-container">
            <div className="making-window">
                <div className="making-window-header">
                    <div className="title-info-icon info-icon">제목</div>
                    <input value={title} onChange={function(e){
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className="making-window-main">
                    <div className="main-info-icon info-icon">본문</div>
                    <textarea value={context} name="" id="" cols={30} rows={10} onChange={function(e){
                        setContext(e.target.value)
                        // if(Array.isArray(optionsTitle)){
                        //     updateContext(optionsTitle.length);
                        // }
                    }}></textarea>
                </div>
                <DialogOptions onTrackingOption={function(optionTitleArr){
                    let _optionsTitle = optionTitleArr.concat();
                    
                    setOptionsTitle(_optionsTitle);
                    // if(Array.isArray(_optionsTitle)){
                    //     updateContext(_optionsTitle);
                    // }
                }}></DialogOptions>
                <div className="save-btn-container">
                    <button onClick={function(e){
                        updateContext();
                        handleRename(title)
                        props.onWrite(convertedString)
                    }}
                    >작성완료</button>
                </div>
            </div>
        </div>
    );

}
