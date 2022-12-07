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
import {Story} from '../store/stories';
import {usePublishing} from '../store/use-publishing';
import {useStoryLaunch} from '../store/use-story-launch';
import {saveHtml} from '../util/save-html';

//story 텍스트를 추출하기 위해 추가한 능력
import {extractEpsiodeText, extractSomeEpisodeText, extractFirstEpsiodeTitle} from './../store/stories/extract_story';

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

	//추가해준 함수.
	//save버튼 누르면 실행.
	async function handleSaveFile() {
		if (!story) {
			throw new Error('No story provided to publish');
		}

		resetErrors();

		try {

			//await testStory(story.id);
			//await는 왜 씀?
			console.log(extractFirstEpsiodeTitle(story));
			console.log(extractEpsiodeText(story));
			console.log(extractSomeEpisodeText(story, "option"));
		} catch (error) {
			setTestError(error as Error);
		}
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
		</ButtonBar>
	);
};
