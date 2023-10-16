import {
	IconEye,
	IconFileText,
	IconPlayerPlay,
	IconTool,
	IconX,
	IconDisc
} from '@tabler/icons';
import uuid from 'tiny-uuid';
import * as React from 'react';
import {useTranslation} from 'react-i18next/';
import {ButtonBar} from '../components/container/button-bar';
import {CardContent} from '../components/container/card';
import {CardButton} from '../components/control/card-button';
import {IconButton} from '../components/control/icon-button';
import {storyFileName} from '../electron/shared';
import {Story, option, passageWithNameAsStory} from '../store/stories';
import {usePublishing} from '../store/use-publishing';
import {useStoryLaunch} from '../store/use-story-launch';
import {saveHtml} from '../util/save-html';
import axios from 'axios';

//story 텍스트를 추출하기 위해 추가한 능력
import {extractEpsiodeText, extractSomeEpisodeText, extractFirstEpsiodeTitle , searchOptionsString} from './../store/stories/extract_story';
import { useUndoableStoriesContext } from '../store/undoable-stories';

export interface BuildActionsProps {
	story?: Story;
}

let normalIndex = 1;
let lastNormalIndex = 1;
let optionIndex = 0;
let basicX = 200;
let basicY = 400;
let layer = 0;
let thisLayerNodeNum = 1;
const endNum = 5;

export const BuildActions: React.FC<BuildActionsProps> = ({story}) => {
	//html publish함수
	const {publishStory} = usePublishing();

	const [playError, setPlayError] = React.useState<Error>();
	const [proofError, setProofError] = React.useState<Error>();
	const [publishError, setPublishError] = React.useState<Error>();
	const [testError, setTestError] = React.useState<Error>();
	const {playStory, proofStory, testStory} = useStoryLaunch();
	const {t} = useTranslation();
	const {dispatch, stories} = useUndoableStoriesContext();

	function resetErrors() {
		setPlayError(undefined);
		setProofError(undefined);
		setPublishError(undefined);
		setTestError(undefined);
	}

	async function handlePlay() {
		if (!story) 
		{
			throw new Error('No story provided to publish');
		}

		resetErrors();

		try {
			await playStory(story.id);
		} catch (error) {
			setPlayError(error as Error);
		}
	}

	async function handleProof() {
		if (!story) {
			throw new Error('No story provided to publish');
		}

		resetErrors();

		try {
			await proofStory(story.id);
		} catch (error) {
			setProofError(error as Error);
		}
	}

	async function handlePublishFile() {
		if (!story) {
			throw new Error('No story provided to publish');
		}

		resetErrors();

		//Html저장 함수
		//saveHtml의 첫번째 인자가 모든 html의 데이터를 받는다.
		//즉 publishStory가 스토리 출력 함수가 됨.
		try {
			saveHtml(await publishStory(story.id), storyFileName(story));
		} catch (error) {
			setPublishError(error as Error);
		}
	}

	async function handleTest() {
		if (!story) {
			throw new Error('No story provided to publish');
		}

		resetErrors();

		try {
			await testStory(story.id);
		} catch (error) {
			setPublishError(error as Error);//모르겠으니 일단 publish error
		}
	}

	async function postEpisode(option_text : String[], sentences : String[], episode_id : number) {
		let health_change : String;
		let money_change : String;
		let hungry_change : String;
		let strength_change : String;
		let agility_change : String;
		let armour_change : String;
		let mental_change : String;

		for(let i = 0; i < option_text.length; i++) {
			const option_data = extractSomeEpisodeText(story, option_text[i]);

			health_change = '0';
			money_change = '0';
			hungry_change = '0';
			strength_change = '0';
			agility_change = '0';
			armour_change = '0';
			mental_change = '0';
			
			switch(option_data[0]) {
				case 'health':
					health_change = option_data[1];
					break;
				case 'money':
					money_change = option_data[1];
					break;
				case 'hungry':
					hungry_change = option_data[1];
					break;
				case 'strength':
					strength_change = option_data[1];
					break;
				case 'agility':
					agility_change = option_data[1];
					break;
				case 'armour':
					armour_change = option_data[1];
					break;
				case 'mental':
					mental_change = option_data[1];
					break;
			}
			try {
				console.log(option_text[i], option_data[2]);
				await axios.post(`http://localhost:3001/game_play/option`, {
				episode: episode_id,
				text: option_text[i],
				result_text: option_data[2],//값이 안 들어감
				health_change: health_change,
				money_change: money_change,
				hungry_change: hungry_change,
				strength_change: strength_change,
				agility_change: agility_change,
				armour_change: armour_change,
				mental_change: mental_change
			})
			.then((res) => {
				console.log(res.data);
				console.log(option_text[i]);
			})
			.catch((error) => {
				console.log(error);
			});
		} catch (error) {
			console.log(error);
		}
	}
}

	//추가해준 함수.
	//save버튼 누르면 실행.
	async function handleSaveFile(): Promise<void> {
		if (!story) {
			throw new Error('No story provided to publish');
		}

		resetErrors();

	
		try {
			
			let sentences : String[];
			//await testStory(story.id);
			//await는 왜 씀?
			
			sentences = extractEpsiodeText(story) as String[];

			//배열에 들어있는 선택지 수많큼 반복 출력

			axios.post(`http://localhost:3001/game_play`, {
				genre: 1,
				title: extractFirstEpsiodeTitle(story),
				mainText: sentences[0]
			})
			.then((res) => {
				const option_text = searchOptionsString(sentences);
				const episode_id = res.data;
				postEpisode(option_text, sentences, episode_id);
				alert('에피소드 생성 성공');
			})
			.catch((error) => {
				console.log(error);
			});
		} catch (error) {
			setTestError(error as Error);
		}
	}

	async function wait(timeToDelay){
        return new Promise((resolve) => setTimeout(resolve, timeToDelay))
    } //timeToDelay만큼 코드를 대기시키는 함수

	const randomName = (length = 8) => {
		const strings = ['핵','전','쟁', '세','상', '멸','망', '서','울', '폐','허',
		 '몇', '현','명','한', '사','람','들', '누','구','은','신','처','성','공', ' ', ' ', ' ']
		let str = '';
	  
		for (let i = 0; i < length; i++) {
			str += strings[Math.floor(Math.random()*strings.length)]
			
		}
	  
		return str;
	};	  
	const randomText = (length = 8) => {
		const strings = ["핵전쟁으로", "세상이", "멸망하고", "난 뒤", "서울은", "폐허가", "되었지만",
		 "몇몇", '현명한', '사람들은', '누구에게도', '들키지', '않을 곳에', '은신처를', '만드는 데', '성공했습니다.']
		let str = '';
	  
		for (let i = 0; i < length; i++) {
			str += strings[Math.floor(Math.random()*strings.length)] + " "
		}
	  
		return str;
	};	  



	async function makeNormalPassage(){
		layer = 0;
		thisLayerNodeNum = 1;
		normalIndex = 1;
		optionIndex = 0;
		lastNormalIndex = 1;
		for(;layer < endNum;){
			let upperNum = (thisLayerNodeNum/2)-1;
			let currentY = basicY
			let optionVisibleNames = []
			for(let i = 0; i <thisLayerNodeNum; i++){
				let options : option[] = [];

				let visibleText = randomText(5);
				let text = visibleText;

				for(let j=0; j<2; j++){

					let afterStory = randomText(5);
					text += ("[["+(1000-optionIndex-(i
						*2)-j)+"]]")
					optionVisibleNames.push(randomName(Math.ceil(Math.random()*5)+2))
					let nextNormalPassage;
					if(layer+2 < endNum){
						nextNormalPassage = lastNormalIndex+thisLayerNodeNum+(2*i)+j
					}
					
					options.push(
						{
							pk : uuid()+randomText(1),
							optionVisibleName : optionVisibleNames[(2*i)+j],
							name:(1000-optionIndex-(i*2)-j).toString(),
							afterStory:afterStory,
							status1:"health",
							status1Num: -1,
							status2:"hungry",
							status2Num: -1,
							nextNormalPassage :nextNormalPassage
						}
					)
				}

				if(thisLayerNodeNum > 1){
					if(i <= upperNum)
						currentY = basicY - ((thisLayerNodeNum/2)-i)*100
					else
						currentY = basicY+ (i-upperNum)*100
					
					await dispatch({ //지금 passage의 [[]]안에 들어있는 text를 자식으로 만들어줌
						type: 'createPassage',
						storyId: story.id,
						props: {
							left : basicX + 200*layer,
							top : currentY,
							name : normalIndex.toString(), 
							passageType : "normalPassage", 
							parentOfOption : "", 
							width : 100, 
							height : 100, 
							optionVisibleName : "",
							options : options,
							text : text,
							visibleText : visibleText
						}
					});
				}
				else{
					let startPassage;
					if(story.passages.find(passage => passage.name === "Untitled Passage"))
						startPassage = passageWithNameAsStory(story, "Untitled Passage");
					else if((story.passages.find(passage => passage.name === "1")))
						startPassage = passageWithNameAsStory(story, "1");
					else{
						return; 
					}
					
					await dispatch({
						props : {
							...startPassage,
							name : normalIndex.toString(),
							left : basicX + 200*layer,
							top : basicY,
							text : text,
							options : options,
							visibleText : visibleText
						},
						type: 'updatePassage',
						passageId: startPassage.id,
						storyId: story.id
					})

				}
				normalIndex+=1
				await wait(50);
			}
			layer++;
			for(let k=0; k<thisLayerNodeNum*2; k++){
				await makeOptionPassage(k, optionVisibleNames[k])
				await wait(50);
			}
			layer++;
			thisLayerNodeNum*=2;
			lastNormalIndex = normalIndex;
		}	
		debugger;
		
	}
	async function makeOptionPassage(index, visibleName){
		let text = ""
		let upperNum = thisLayerNodeNum-1;
		let currentY = basicY
		if(layer+1 < endNum){
			text = "[["+(lastNormalIndex*2+index)+"]]"
		}
		if(index <= upperNum)
			currentY = basicY - (thisLayerNodeNum-index)*100
		else
			currentY = basicY + (index-upperNum)*100
		await dispatch({ //지금 passage의 [[]]안에 들어있는 text를 자식으로 만들어줌
			type: 'createPassage',
			storyId: story.id,
			props: {
				left : basicX + (200*layer), 
				name : (1000-optionIndex).toString(), 
				top : currentY, 
				passageType : "optionPassage", 
				parentOfOption : (thisLayerNodeNum+Math.floor(index/2)).toString(), 
				width : 75, 
				height : 75, 
				optionVisibleName : visibleName,
				options : [],
				text : text
			}
		});
		optionIndex+=1
	}
	function checkStory(){
		debugger;
		console.log(story);
		story.passages.forEach(passage => {
			dispatch({type : 'updatePassage', passageId : passage.id, storyId : story.id, props:{...passage}})
		})
	}

	return (
		<ButtonBar>
			<CardButton
				ariaLabel={testError?.message ?? ''}
				disabled={!story}
				icon={<IconTool />}
				label={t('routeActions.build.test')}
				onChangeOpen={() => setTestError(undefined)}
				onClick={handleTest}
				open={!!testError}
			>
				<CardContent>
					<p>{testError?.message}</p>
					<IconButton
						icon={<IconX />}
						label={t('common.close')}
						onClick={() => setTestError(undefined)}
						variant="primary"
					/>
				</CardContent>
			</CardButton>
			<CardButton
				ariaLabel={playError?.message ?? ''}
				disabled={!story}
				icon={<IconPlayerPlay />}
				label={t('routeActions.build.play')}
				onChangeOpen={() => setPlayError(undefined)}
				onClick={handlePlay}
				open={!!playError}
			>
				<CardContent>
					<p>{playError?.message}</p>
					<IconButton
						icon={<IconX />}
						label={t('common.close')}
						onClick={() => setPlayError(undefined)}
						variant="primary"
					/>
				</CardContent>
			</CardButton>
			<CardButton
				ariaLabel={proofError?.message ?? ''}
				disabled={!story}
				icon={<IconEye />}
				label={t('routeActions.build.proof')}
				onChangeOpen={() => setProofError(undefined)}
				onClick={handleProof}
				open={!!proofError}
			>
				<CardContent>
					<p>{proofError?.message}</p>
					<IconButton
						icon={<IconX />}
						label={t('common.close')}
						onClick={() => setProofError(undefined)}
						variant="primary"
					/>
				</CardContent>
			</CardButton>
			

			<CardButton
				ariaLabel={publishError?.message ?? ''}
				disabled={!story}
				icon={<IconFileText />}
				label={t('routeActions.build.publishToFile')}
				onChangeOpen={() => setPublishError(undefined)}
				onClick={handlePublishFile}
				open={!!publishError}
			>
				<CardContent>
					<p>{publishError?.message}</p>
					<IconButton
						icon={<IconX />}
						label={t('common.close')}
						onClick={() => setPublishError(undefined)}
						variant="primary"
					/>
				</CardContent>
			</CardButton>

			<CardButton
				ariaLabel={publishError?.message ?? ''}
				disabled={!story}
				icon={<IconDisc/>}
				label={"저장하기"}
				onChangeOpen={() => setPublishError(undefined)}
				onClick={handleSaveFile}
				open={!!publishError}
			>
				<CardContent>
					<p>{publishError?.message}</p>
					<IconButton
						icon={<IconX />}
						label={t('common.close')}
						onClick={() => setPublishError(undefined)}
						variant="primary"
					/>
				</CardContent>
			</CardButton>
			<CardButton
				label={"passage 목록 제작하기"}
				onClick={function(){
					makeNormalPassage()}
				}
				ariaLabel={''}
				disabled={false}
				icon={<IconDisc/>}
				onChangeOpen={() => {}}
			>
			</CardButton>
			<CardButton
				label={"story 확인하기"}
				onClick={function(){
					checkStory()}
				}
				ariaLabel={''}
				disabled={false}
				icon={<IconDisc/>}
				onChangeOpen={() => {}}
			>
			</CardButton>
		</ButtonBar>
	);
};
