import React from "react";
import { Passage, Story, updatePassage, option, StoriesState } from "../../../store/stories";
import { StoriesActionOrThunk } from "../../../store/undoable-stories";
type DialogButtonProps = {
    story : Story,
    passage : Passage
    title : string
    textUser : string
    options : option[]
    onClose : () => void
    dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void
    lastTitle : string
    nextPassages : string[]
}
export const DialogButton: React.FC<DialogButtonProps> = (props) => {
    const {dispatch} = props
    
    //제목 변경 함수
    function handleRename(name: string) {
		dispatch(updatePassage(props.story, props.passage, {name}, {dontUpdateOthers: true}));
	}

    function handlePassageTextChange(text_user : string, options : option[], nextPassages : string[]){
        debugger;
        console.log("Log : handlePassageTextChange() - ");
        
        let text = text_user.replace(/\n\[\[.*\]\]/g,''); //text_user에 [[]] 따위를 직접 입력하지 못하도록 모두 제거
        for(let i = 0; i< nextPassages.length; i++){
            text = text + "\n" + "[[" + nextPassages[i] + "]]";
        }
        dispatch(updatePassage(props.story, props.passage, {text, text_user, options, nextPassages}));
    }

    return(
        <div className="save-btn-container">
            <button onClick={function(e){
                let doUpdate : boolean = false;
                const passages = props.story.passages;
                const title = props.title;
                const lastTitle = props.lastTitle
                if(title === lastTitle)//passage 이름 중복 막기, 이전 이름과 같다면 통과
                    doUpdate = true;
                else if(!passages.find(passage => passage.name === title))
                    doUpdate = true;
                
                if(doUpdate){
                    console.log("Log : onclick()");
                    handleRename(title);
                    handlePassageTextChange(props.textUser, props.options, props.nextPassages);
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
