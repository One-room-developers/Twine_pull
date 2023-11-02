import React from "react";
import { Component } from "react";
import {DialogOptions} from "./DialogOptions";
import { useEffect , useState} from "react";
import './option_window.css'
import { Passage, Story, option, passageWithName, passageWithNameAsStory } from "../../../store/stories";
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
    const lastTitle = props.passage.name;
    const [name, setName] = useState(props.passage.name); 
    const [text, setText] = useState(props.passage.text)
    const [visibleText, setVisibleText] = useState(props.passage.visibleText);
    const [options, setOptions] = useState(props.passage.options);
    const [optionVisibleName, setOptionVisibleName] = useState(props.passage.optionVisibleName)
    const {dispatch, stories} = useUndoableStoriesContext();
    console.log("Log : UserDialog() - "); 
    console.log(props.passage);
    React.useEffect(function(){//props가 변경될 때마다 useState의 값 업데이트(수동으로 해줘야됨)
        setName(props.passage.name)
        setText(props.passage.text)
        setVisibleText(props.passage.visibleText)
        setOptions(props.passage.options)
        setOptionVisibleName(props.passage.optionVisibleName)
    }, [props.passage.name])
    
    return(
        <div className="making-all-container">
            <div className="making-window">
                <DialogHeader
                    passage = {props.passage}
                    name = {name}
                    optionVisibleName = {optionVisibleName}
                    setName = {setName}
                    setOptionVisibleName = {setOptionVisibleName}>
                </DialogHeader>

                <DialogBody
                    visibleText = {visibleText}
                    setVisibleText = {setVisibleText}
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
                    onClose = {props.onClose}
                    setText = {setText}>
                    
                </DialogOptions>

                <DialogButton
                    {...props}
                    lastPassage = {props.passage}
                    name = {name}
                    visibleText= {visibleText}
                    options = {options}
                    dispatch = {dispatch}
                    lastTitle = {lastTitle}
                    stories = {stories}
                    text = {text}
                    optionVisibleName = {optionVisibleName}>
                </DialogButton>
            </div>
        </div>
    );

}
