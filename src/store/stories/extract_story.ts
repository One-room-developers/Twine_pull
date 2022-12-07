import {Passage, StorySearchFlags, Story} from './stories.types';
import { passageWithId, storyWithId } from './getters'

//첫번째 passage 찾기. 첫번째 passage ID반환. 아직 사용 X.
export function findFirstPassage(
    story : Story
){
    return story.startPassage
}

//
export function extractFirstEpsiodeTitle(
    story : Story
) {
    const firstPassageID = findFirstPassage(story);//ID반환
    const firstPassage = story.passages.find(p => p.id === firstPassageID);
    
    if (firstPassage) {
		let title : string = firstPassage.name;
        return title;
    }
    return "error"
}


//[[]] 안에 있는 모든 string들 따로 따로 넣어줌.
export function searchOptionsString(
	sentences : String[]
) {
	
	let optionsText : String[] = [];

	//const regex : RegExp = /\[\[.*\]\]/;
    for(let i =0; i < sentences.length; i++) {
        if(
            sentences[i].charAt(0) == "[" && sentences[i].charAt(1) == "["
        ){
    
            //optionTemp = sentences[i].match(regex)[0]; Refectory할 때 사용할것.
    
            optionsText.push( sentences[i].replace('[[', '').replace(']]', '') );
        }
    };
    
	return optionsText
}


//일단 첫번째 passage 텍스트만 출력
//story를 인자로 받을 수 있는듯 함
export function extractEpsiodeText(
    // stories: Story[],
    // storyId: string,
    story : Story
) {
    const firstPassageID = findFirstPassage(story);//ID반환
    const firstPassage = story.passages.find(p => p.id === firstPassageID);
    
    if (firstPassage) {
		let paragraph : String[] = splitPassageText(firstPassage.text);
        return paragraph;
    }
    return "error"
}

//passage이름과 story를 입력받으면 Text추출하는 함수
//이걸 이용해서 선택지 passage만들어보기
export function extractSomeEpisodeText(
    story : Story,
    passageName: String
) {
    const Passage = story.passages.find(p => p.name === passageName);//passage반환
    
    if (Passage) {
		let paragraph : String[] = splitPassageText(Passage.text);
        return paragraph;
    }
    return "error"
}

//단락마다 쪼개는 함수. 쪼갠 값을 배열로 만들어 return한다.
export function splitPassageText(
    passageText: string
){
    let paragraph : string[] = passageText.split('\n');
    
    //이건 따로 option을 인식해서 link로 만들어주는 함수가 있을테니 다음에 확인
    // let option : string[];
    
    return paragraph;
}