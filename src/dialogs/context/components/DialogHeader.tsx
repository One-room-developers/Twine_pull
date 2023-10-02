import React from "react";
import { Passage } from "../../../store/stories";

type DialogHeaderProps = {    
    passage : Passage
    title : string
    setTitle : React.Dispatch<React.SetStateAction<string>>
}
export const DialogHeader: React.FC<DialogHeaderProps> = (props) => {

    return(
            (props.passage.passageType === "normalPassage") ? ( //normalPassage면 제목 출력 아니면 미출력
                <div className="making-window-header">
                    <div className="title-info-icon info-icon">제목</div>
                    <input value={props.title} onChange={function(e){
                        props.setTitle(e.target.value)
                    }} />
                </div>
            ) : 
            (
                <div className="making-window-header">
                    <div className="title-info-icon info-icon">제목</div>
                    <input value={props.title} onChange={function(e){
                        props.setTitle(e.target.value)
                    }} readOnly/>
                </div>
            ) 
    )

}
