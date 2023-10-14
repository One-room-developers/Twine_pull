import {Thunk} from 'react-hook-thunk-reducer';
import {Color} from '../../util/color';
import {StoryFormat} from '../story-formats';

/**
 * A single passage in a story.
 */
/*
Passge 하나 (글상자) 하나에 대한 타입 선언임
글상자 하나의 높이, 너비, id 등등이 저장되어 있음.
story는 아마도 이 passge를 품고 있는 총 story를 말하는 것 같고,
passage안에 들어있는 글자들이 text인듯함.
*/
export interface Passage {
	/**
	 * Height of the passage in pixels.
	 */
	height: number;
	/**
	 * Should the passage be drawn highlighted?
	 */
	highlighted: boolean;
	/**
	 * GUID identifying the passage.
	 */
	id: string;
	/**
	 * Left (e.g. X) position of the top-left corner of the passage in pixels.
	 */
	left: number;
	/**
	 * Name of the passage.
	 */
	name: string;

	//유저에게 보이는 옵션의 이름
	optionVisibleName : string;
	/**
	 * Is the passage currently selected by the user?
	 */
	selected: boolean;
	/**
	 * ID of the parent story.
	 */
	story: string;
	/**
	 * Passage tags.
	 */
	tags: string[];
	/**
	 * Body text of the passage.
	 */
	text: string;
	/**
	 * Top (e.g. Y) position of the top-left corner of the passage in pixels.
	 */
	top: number;
	/**
	 * Width of the passage in pixels.
	 */
	width: number;
	
	parentOfOption : string; //option passage의 부모 passage

	options : option[];

	//유저에게 보이는 본문
	visibleText:string;

	passageType : string; //"normalPassage" "optionPassage"

	//db에 저장될 고유 id. userID와 passageId의 합으로 만듬
	pk : string
}

export interface option{
	// option passage의 pk
	pk: string;

	//실제 출력되는 선택지 제목
	optionVisibleName : string;

	//선택지 제목(더미 값을 넣는다)
	name: string;

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

/* story 이거 안에 보면 passage들의 배열이 있음.
이 배열에 passage들이 모두 들어감. 
배열에 순차적으로 다 들어가는데 어떻게 선택지와  다음 passage가 연결 되느냐?
선택지 이름이 passage의 name과 일치하는 애들이 서로 연결해주는 코드가 있기 때문임.

stylesheet는 passage들 전부에 적용되는 css? 인것 같은데 우리는 이 기능을 빼버려야 할듯
*/
export interface Story {
	/**
	 * IFID of the story. An IFID should stay stable when a story is imported or exported.
	 */
	ifid: string;
	/**
	 * GUID identifying the story.
	 */
	id: string;
	/**
	 * When the story was last changed.
	 */
	lastUpdate: Date;
	/**
	 * Name of the story.
	 */
	name: string;
	/**
	 * Passages in the story.
	 */
	passages: Passage[];
	/**
	 * Author-created JavaScript associated with the story.
	 */
	script: string;
	/**
	 * Is the story currently selected by the user?
	 */
	selected: boolean;
	/**
	 * Should passages snap to a grid?
	 */
	snapToGrid: boolean;
	/**
	 * ID of the passage that the story begins at.
	 */
	startPassage: string;
	/**
	 * Name of the story format the story uses.
	 */
	storyFormat: string;
	/**
	 * Version of the story format that this story uses.
	 */
	storyFormatVersion: string;
	/**
	 * Author-created CSS associated with the story.
	 */
	stylesheet: string;
	/**
	 * Tags applied to the story.
	 */
	tags: string[];
	/**
	 * Author-specified colors for passage tags.
	 */
	tagColors: TagColors;
	/**
	 * Zoom level the story is displayed at.
	 */
	zoom: number;

	//스토리 난이도
	level : number;

	//장르
	genre : string;

	//유저 nickname
	userNickname : string;

	//db에 사용되는 고유 id. 유저 id와 storyid를 합쳐서 제작.
	pk : string;
}
/* 내 스토리들 모아놓는 화면에서 아마 작동하는 스토리 배열일거임 */
export type StoriesState = Story[];

// Action types.

//스토리 주입. 관련 타입. 아마 존나 긴 html로 story전부 적용하는 기능에 사용되는 듯.
export interface InitStoriesAction {
	type: 'init';
	state: Story[];
}

//이건 스토리 수정 관련 타입? 근데 밑어 update가 있긴 함 후에 구연해야함.
export interface RepairStoriesAction {
	type: 'repair';
	allFormats: StoryFormat[];
	defaultFormat: StoryFormat;
}

//스토리 생성? 관련 타입인데?
export interface CreateStoryAction {
	type: 'createStory';
	props: Partial<Story>;
}

//update 관련
export interface UpdateStoryAction {
	type: 'updateStory';
	props: Partial<Omit<Story, 'id'>>;
	storyId: string;
}

//지우기. 스토리 id만 받아가면 그 id랑 관련된거 지우는 듯
export interface DeleteStoryAction {
	type: 'deleteStory';
	storyId: string;
}

//passage 하나 만들기에 대한 interface
export interface CreatePassageAction {
	type: 'createPassage';
	props: Partial<Passage>;
	storyId: string;
}

/*passage 배열을 만드는 action인데 아마 맨 처음 스토리를 만들 때,
passage 배열이 필요하니까 넣은거던가 아니면 매크로로 한번에 story들 만들때
필요하니까 만든 것인듯.*/

export interface CreatePassagesAction {
	type: 'createPassages';
	props: Partial<Passage>[];
	storyId: string;
}

//passage 하나 업데이트
export interface UpdatePassageAction {
	type: 'updatePassage';
	passageId: string;
	props: Partial<Passage>;
	storyId: string;
}

//passage 여럿 업데이트
export interface UpdatePassagesAction {
	type: 'updatePassages';
	passageUpdates: Record<string, Partial<Passage>>;
	storyId: string;
}
	
export interface DeletePassageAction {
	type: 'deletePassage';
	passageId: string;
	storyId: string;
	passageName : string
}

export interface DeletePassagesAction {
	type: 'deletePassages';
	passageIds: string[];
	storyId: string;
	passageNames : string[];
}

// ??
export type StoriesAction =
	| InitStoriesAction
	| RepairStoriesAction
	| CreateStoryAction
	| UpdateStoryAction
	| DeleteStoryAction
	| CreatePassageAction
	| CreatePassagesAction
	| UpdatePassageAction
	| UpdatePassagesAction
	| DeletePassageAction
	| DeletePassagesAction;

//?
export type StoriesDispatch = React.Dispatch<
	StoriesAction | Thunk<StoriesState, StoriesAction>
>;

export interface StorySearchFlags {
	includePassageNames?: boolean;
	matchCase?: boolean;
	useRegexes?: boolean;
}

export type TagColors = Record<string, Exclude<Color, 'none'>>;

export interface StoriesContextProps {
	dispatch: StoriesDispatch;
	stories: Story[];
}
