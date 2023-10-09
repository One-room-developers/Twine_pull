import React from "react";
import { Passage, StoriesState, Story, passageWithName } from "../../../store/stories";

type DialogBodyProps = {
    visibleText : string,
    setVisibleText : React.Dispatch<React.SetStateAction<string>>,
    passage : Passage
    stories : StoriesState
    story : Story
}
export const DialogBody: React.FC<DialogBodyProps> = (props) => {
    let optionAfterStory = ""
    if(props.passage.passageType === "optionPassage"){
        const parentPassage = passageWithName(props.stories, props.story.id, props.passage.parentOfOption)
        parentPassage.options.forEach(option => {
            if(option.name === props.passage.name){
                optionAfterStory = option.afterStory
            }
        })
    }
    return(
        (props.passage.passageType === "normalPassage") ? ( //normalPassage면 제목 출력 아니면 미출력
            <div className="making-window-main">
                <div className="main-info-icon info-icon">본문</div>
                <textarea 
                    value={props.visibleText} 
                    name="" 
                    id="" 
                    cols={30} 
                    rows={10} 
                    onChange={
                        function(e){
                            props.setVisibleText(e.target.value)
                        }
                    }>
                </textarea>
            </div>
        ) : (
            <div className="making-window-main option">
                <div className="main-info-icon info-icon">after<br/>story</div>
                <textarea 
                    value={optionAfterStory} 
                    name="" 
                    id="" 
                    cols={30} 
                    rows={10} 
                    onChange={
                        function(e){
                            props.setVisibleText(e.target.value)
                        }
                    }
                    readOnly>
                </textarea>
            </div>
        )
    )

}
