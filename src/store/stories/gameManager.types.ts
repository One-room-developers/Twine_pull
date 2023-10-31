export interface Status {
    health: number,
    money: number,
    hungry: number,
    // strength: number,
    // agility: number,
    // armour: number,
    // mental: number,
};


export type MainProps = {
    passage_text_div : React.MutableRefObject<any>,
    text_view_div : React.MutableRefObject<any>,
    main_text_view_div : React.MutableRefObject<any>,
    options_div : React.MutableRefObject<any>,
    result_text_div : React.MutableRefObject<any>,
    result_option_div : React.MutableRefObject<any>,
    header_text_view_div : React.MutableRefObject<any>
    passageTitleState : [string, React.Dispatch<React.SetStateAction<string>>]
    storyTitleState : [string, React.Dispatch<React.SetStateAction<string>>]
    passageTextState : [string, React.Dispatch<React.SetStateAction<string>>]
    resultTextState : [string, React.Dispatch<React.SetStateAction<string>>]
}

export type NextStoryAndPassagesArr = [NextStory, NextPassage[], NextOption[][]]

export interface NextStory{
    pk : string,
    level : number,
    userNickname : string,
    name : string,
    startPassage : string,
    like : number,
    dislike : number,
    lastUpdate : Date
}

export interface NextPassage{
    pk : string,
    name : string,
    visibleText : string,
    id : string
}

export interface NextOption{
	//실제 출력되는 선택지 제목
	optionVisibleName : string,

	//선택지 입력후 나오는 결과 이야기
	afterStory: string,

	//능력치 1
	status1: string,
	//능력치 1 수치
	status1Num: number,
	//능력치 2
	status2: string,
	//능력치 2 수치
	status2Num: number,

	nextNormalPassage : string
}

export interface NextStoryAndPassages{
    nextStory : NextStory,
    nextPassages : NextPassage[],
    nextOptions : NextOption[][]}


export const NextStoryDefault : NextStory = {
    pk : "",
    level : 0,
    userNickname : "",
    name : "",
    startPassage : "",
    like : 0,
    dislike : 0,
    lastUpdate : new Date(2023, 11, 3)
}

export const NextPassageDefault : NextPassage = {
    pk : "",
    name : "",
    visibleText : "",
    id : ""
}

export const NextOptionDefault : NextOption = {
	optionVisibleName : "",
	afterStory: "",
	status1: "",
	status1Num: 0,
	status2: "",
	status2Num: 0,
	nextNormalPassage : "",
}