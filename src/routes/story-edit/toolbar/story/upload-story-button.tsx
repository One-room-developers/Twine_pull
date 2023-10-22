import {IconHash} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../../../components/control/icon-button';
import {StoryStylesheetDialog, useDialogsContext} from '../../../../dialogs';
import {Passage, Story, passageWithIdAsStory, passageWithNameAsStory} from '../../../../store/stories';

export interface UploadStoryButtonProps {
	story: Story;
}

export const UploadStoryButton: React.FC<UploadStoryButtonProps> = props => {
	const {story} = props;
	const {dispatch} = useDialogsContext();

    //모든 normalPassage에 option passage가 있는지 검사하는 함수
    function checkHaveOption() : boolean{
        let errorPassages : Passage[]= [];
        let errorString = ""
        //passage에 option passage가 있는지 확인
        story.passages.forEach(passage => {
            if(passage.passageType === "normalPassage")
                if(passage.options.length === 0)
                    errorPassages.push(passage);
        })
        //errorpassage가 있다면 alert에 해당 passage가 문제가 있다고 출력
        if(errorPassages.length !== 0){
            errorPassages.forEach(errorPassage => {
                errorString += (errorPassage.name + "에 선택지가 없습니다!\n");
            })
            errorString += "(모든 passage에는 최소 한 개의 선택지가 있어야 합니다)"
            alert(errorString);
        }

        if(errorPassages.length === 0)
            return true
        else
            return false
    }



    function checkNotLoop(nowPassageProp : Passage = null, checkedPassageProp : Passage[] = []) : boolean{
        let checkedPassages : Passage[] = checkedPassageProp.slice(); //slice를 해줘야 원본 배열을 참조하지 않고 값만 복사할 수 있다
        let nowPassage : Passage = nowPassageProp;
        //nowPassage가 null일 때 = 함수를 처음 시작할 때
        if(nowPassage === null){
            nowPassage = passageWithIdAsStory(story, story.startPassage)
        }
        if(nowPassage.passageType === "normalPassage")
            console.log(nowPassage.name);
        else
            console.log(nowPassage.optionVisibleName)
        
        console.log(checkedPassages);
        debugger;
        //checkdPassage
        if(!checkedPassages.find(checkedPassage => checkedPassage === nowPassage)){
            checkedPassages.push(nowPassage)
            //자식 passage 찾기
            let childPassagesName : string[] = nowPassage.text.match(/\n\[\[.*\]\]/g) ?? []; //text_user에 [[]] 따위를 직접 입력하지 못하도록 모두 제거
            childPassagesName = childPassagesName.map(childPassageName => {
                return childPassageName.replace(/\n\[\[/, '').replace(/\]\]/, '')
            })
            for(let i =0; i<childPassagesName.length; i++){
                const childPassage = passageWithNameAsStory(story, childPassagesName[i])
                if(checkNotLoop(childPassage, checkedPassages) === false){
                    return false
                }
            }
        }
        else{
            alert(nowPassage.name + "에서 loop가 발생합니다!")
            return false;
        }
        return true;
    }

	return (
		<IconButton
			icon={<IconHash />}
			label={'업로드'}
			onClick={() =>
				{
                    const isHaveOption : boolean = checkHaveOption();
                    const isNotLoop : boolean = checkNotLoop();
                    if(isHaveOption && isNotLoop)
                        alert("오류 없음!")
                }
			}
		/>
	);
};
