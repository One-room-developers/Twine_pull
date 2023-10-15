export interface Status {
    health: number,
    money: number,
    hungry: number,
    strength: number,
    agility: number,
    armour: number,
    mental: number,
};

export type MainProps = {
    episode_text_div : React.MutableRefObject<any>,
    text_view_div : React.MutableRefObject<any>,
    main_text_view_div : React.MutableRefObject<any>,
    episode_option_div : React.MutableRefObject<any>,
    episode_result_text_div : React.MutableRefObject<any>,
    episode_result_option_div : React.MutableRefObject<any>,
    header_text_view_div : React.MutableRefObject<any>
    episodeTitleState : [string, React.Dispatch<React.SetStateAction<string>>]
    episodeNumberTextState : [number, React.Dispatch<React.SetStateAction<number>>]
    episodeTextState : [string, React.Dispatch<React.SetStateAction<string>>]
    episodeResultText : [string, React.Dispatch<React.SetStateAction<string>>]
}

export interface Episode {
    Episode_Text: EpisodeText,
    Option_Stat_Changes: Status[],
    Option_Texts: Option_Texts[]
}

export interface EpisodeText {
    id: number,
    main_text: string,
    mode: number,
    title: string
}

export interface Option_Texts {
    text: string,
    result_text: string
};

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
    visibleText : string
}

export interface NextOption{
	//실제 출력되는 선택지 제목
	optionVisibleName : string;

	//선택지 입력후 나오는 결과 이야기
	afterStory: string;

	//능력치 1
	status1: string;
	//능력치 1 수치
	status1Num: number;
	//능력치 2
	status2: string;
	//능력치 2 수치
	status2Num: number;

	nextNormalPassage : string;
}