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
}
export const DialogButton: React.FC<DialogButtonProps> = (props) => {
    const {dispatch} = props
    
    //제목 변경 함수
    function handleRename(name: string) {
		dispatch(updatePassage(props.story, props.passage, {name}, {dontUpdateOthers: true}));
	}

    function handlePassageTextChange(text_user, options : option[]){
        console.log("Log : handlePassageTextChange() - ");
        
        let text = text_user.replace(/\n\[\[.*\]\]/g,''); //text_user에 [[]] 따위를 직접 입력하지 못하도록 모두 제거
        for(let i = 0; i< options.length; i++){
            text = text + "\n" + "[[" + options[i].title + "]]";
        }
        const nextPassages = options.map(option => option.title)
        dispatch(updatePassage(props.story, props.passage, {text, text_user, options, nextPassages}));
    }

    return(
        <div className="save-btn-container">
            <button onClick={function(e){
                console.log("Log : onclick()");
                handleRename(props.title);
                handlePassageTextChange(props.textUser, props.options);
                props.onClose();
            }}>
                작성완료
            </button>
        </div>
    )

}
