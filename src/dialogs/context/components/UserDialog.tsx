import React from "react";
import { Component } from "react";
import {DialogOptions} from "./DialogOptions";
import { useEffect , useState} from "react";
import './option_window.css'
import { Passage, Story, option } from "../../../store/stories";
import { DialogBody } from "./DialogBody";
import { DialogHeader } from "./DialogHeader";
import { DialogButton } from "./DialogButton";
import { useUndoableStoriesContext } from "../../../store/undoable-stories";

type UserDialogProps = {    
    passage : Passage
    story : Story
    onClose : () => void
}


export const UserDialog: React.FC<UserDialogProps> = (props) => {

    const [title, setTitle] = useState(props.passage.name); 
    const [textUser, setTextUser] = useState(props.passage.text_user);
    const [options, setOptions] = useState(props.passage.options);
    const {dispatch, stories} = useUndoableStoriesContext();

    console.log("Log : UserDialog() - "); 
    console.log(props.passage);
    
    //본문 + [[선택지]] 로 된 문자열 생성

    return(
        <div className="making-all-container">
            <div className="making-window">
                <DialogHeader
                    passage = {props.passage}
                    title = {title}
                    setTitle = {setTitle}>
                </DialogHeader>

                <DialogBody
                    textUser = {textUser}
                    setTextUser = {setTextUser}
                    passage = {props.passage}
                    stories = {stories}
                    story = {props.story}>
                </DialogBody>

                <DialogOptions 
                    onTrackingOption={
                        function(optionArr : option[]){
                            console.log("Log : onTrackingOption");
                            let _options = optionArr
                            setOptions( _options);
                        }
                    }
                    options = {options}
                    passage = {props.passage}
                    dispatch = {dispatch}
                    story = {props.story}
                    onClose = {props.onClose}>
                </DialogOptions>

                <DialogButton
                    {...props}
                    title = {title}
                    textUser= {textUser}
                    options = {options}
                    dispatch = {dispatch}>
                </DialogButton>
            </div>
        </div>
    );

}
