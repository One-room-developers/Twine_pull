import React from "react";
import { Passage, Story, updatePassage, option, StoriesState, passageWithName, passageWithNameAsStory } from "../../../store/stories";
import { StoriesActionOrThunk } from "../../../store/undoable-stories";
import { parseLinks } from "../../../util/parse-links";
import uuid from 'tiny-uuid';
type DialogButtonProps = {
    story : Story,
    passage : Passage
    name : string
    visibleText : string
    options : option[]
    onClose : () => void
    dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void
    lastTitle : string,
    stories : StoriesState,
    text : string,
    optionVisibleName : string,
    lastPassage : Passage
}
export const DialogButton: React.FC<DialogButtonProps> = (props) => {
    const {dispatch} = props
    

    function handlePassageTextChange(
        name : string, 
        visibleText : string, 
        options : option[], 
        passage : Passage, 
        story : Story, 
        previousText : string,
        optionVisibleName : string)
    {
        console.log("Log : handlePassageTextChange() - ");
        
        let text = visibleText.replace(/\n\[\[.*\]\]/g,''); //text_user에 [[]] 따위를 직접 입력하지 못하도록 모두 제거
        if(passage.passageType === "normalPassage"){
            options.forEach(option => {
                text = text + "\n" + "[[" + option.name + "]]";
            })
            //만약 option 속성속 visible name이 변경되었다면 그 option passage의 visible name도 수정
            
            props.options.forEach((option, index) => {
                if(props.lastPassage.options[index]){
                    const changeOptionVisibleName = option.optionVisibleName;
                    const lastOptionVisibleName = props.lastPassage.options[index].optionVisibleName
                    if(changeOptionVisibleName !== lastOptionVisibleName)
                    {
                        const optionPassage = passageWithNameAsStory(props.story, option.name)
                        dispatch({
                            storyId: props.story.id,
                            passageId: optionPassage.id,
                            props : {optionVisibleName : changeOptionVisibleName},
                            type: 'updatePassage'
                        });
                    }
                }
            })
            
        }else if(passage.passageType === "optionPassage"){
            //option passage에서 수정 없이 작성완료를 클릭했을 시에만 작동
            text = previousText;
        }
        debugger;
        dispatch(updatePassage(story, passage, {name, optionVisibleName, text, visibleText, options}));
    }

    return(
        <div className="save-btn-container">
            <button onClick={function(e){
                let doUpdate : boolean = false;
                const passages = props.story.passages;
                const name = props.name;
                const lastTitle = props.lastTitle
                if(name === lastTitle)//passage 이름 중복 막기, 이전 이름과 같다면 통과
                    doUpdate = true;
                else if(!passages.find(passage => passage.name === name))
                    doUpdate = true;
                
                if(doUpdate){
                    console.log("Log : onclick()");
                    handlePassageTextChange(props.name, props.visibleText, props.options, props.passage, props.story, props.text, props.optionVisibleName);
                    props.onClose();
                }
                else{
                    window.alert("중복된 이름입니다!");
                }
            }}>
                작성완료
            </button>
        </div>
    )

}
