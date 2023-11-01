import React from "react";
import { Passage } from "../../../store/stories";

type DialogHeaderProps = {    
    passage : Passage
    name : string
    setName : React.Dispatch<React.SetStateAction<string>>
    optionVisibleName : string
    setOptionVisibleName : React.Dispatch<React.SetStateAction<string>>
}
export const DialogHeader: React.FC<DialogHeaderProps> = (props) => {

    return(
            (props.passage.passageType === "normalPassage") ? ( //normalPassage면 제목 출력 아니면 미출력
                <div className="making-window-header">
                    <div className="title-info-icon info-icon">제목</div>
                    <input value={props.name} onChange={function(e){
                        props.setName(e.target.value)
                    }} />
                </div>
            ) : 
            (
                <div className="making-window-header">
                    <div className="title-info-icon info-icon">선택지</div>
                    <input value={props.optionVisibleName} onChange={function(e){
                        props.setOptionVisibleName(e.target.value)
                    }}/>
                </div>
            ) 
    )

}
