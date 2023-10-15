import {
	IconEye,
	IconFileText,
	IconPlayerPlay,
	IconTool,
	IconX,
	IconDisc
} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next/';
import {ButtonBar} from '../components/container/button-bar';
import {CardContent} from '../components/container/card';
import {CardButton} from '../components/control/card-button';
import {IconButton} from '../components/control/icon-button';
import {storyFileName} from '../electron/shared';
import {Story, option} from '../store/stories';
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
	let normalIndex = 0;
	let optionIndex = 0;

	function resetErrors() {
		setPlayError(undefined);
		setProofError(undefined);
		setPublishError(undefined);
		setTestError(undefined);
	}

	async function handlePlay() {
		if (!story) {
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
	async function makeNormalPassages(){
		debugger;
		while(normalIndex < 2){
			let text = ""
			for(let j=0; j<2; j++){
				text += ("[["+(1000-optionIndex-j)+"]]")
			}
			await dispatch({ //지금 passage의 [[]]안에 들어있는 text를 자식으로 만들어줌
				type: 'createPassage',
				storyId: story.id,
				props: {
					left : 100*(normalIndex),
					name : normalIndex.toString(), 
					top : 100*(normalIndex), 
					passageType : "normalPassage", 
					parentOfOption : "", 
					width : 100, 
					height : 100, 
					optionVisibleName : "",
					options : [],
					text : text
				}
			});
			for(let j=0; j<2; j++){
				await makeOptionPassages(j)
			}
			normalIndex+=1
		}
	}
	async function makeOptionPassages(index){
		debugger;
		await dispatch({ //지금 passage의 [[]]안에 들어있는 text를 자식으로 만들어줌
			type: 'createPassage',
			storyId: story.id,
			props: {
				left : 100*(1+normalIndex), 
				name : (1000-optionIndex).toString(), 
				top : 100*(1+optionIndex), 
				passageType : "optionPassage", 
				parentOfOption : "", 
				width : 75, 
				height : 75, 
				optionVisibleName : (1000-optionIndex).toString(),
				options : [],
				text : "[["+(1+normalIndex+index)+"]]"
			}
		});
		optionIndex+=1
	}
	// options.push(
				// 	{
				// 		pk : "",
				// 		optionVisibleName : "옵션",
				// 		name: j.toString(),
				// 		afterStory: "애프터 스토리",
				// 		status1: "",
				// 		status1Num: 0,
				// 		status2: "",
				// 		status2Num: 0,
				// 		nextNormalPassage : ""
				// 	}
				// )

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
					debugger;
					makeNormalPassages()}
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
