/**
 * 스토리를 스토리 포맷에 바인딩하는 코드
 */

import * as React from 'react';
import {
	publishArchive,
	publishStory,
	publishStoryWithFormat,
	PublishOptions
} from '../util/publish';
import {usePrefsContext} from './prefs';
import {
	formatWithNameAndVersion,
	loadFormatProperties,
	useStoryFormatsContext
} from './story-formats';
import {storyWithId, useStoriesContext} from './stories';
import {getAppInfo} from '../util/app-info';

export interface UsePublishingProps {
	proofStory: (storyId: string) => Promise<string>;
	publishArchive: (storyIds?: string[]) => Promise<string>;
	publishStory: (
		storyId: string,
		publishOptions?: PublishOptions
	) => Promise<string>;
	publishStoryData: (storyId: string) => string;
}

/**
 * A React hook publish stories from context. You probably want to use
 * `useStoryLaunch` instead--this is for doing the actual binding of the story
 * and story format.
 * 
 * React 후크는 컨텍스트에서 스토리를 게시합니다. 대신 `useStoryLaunch`를 사용하고 싶을 것입니다.
 * 이것은 스토리와 스토리 형식의 실제 바인딩을 수행하기 위한 것입니다.
 */

//위에 interface받음
export function usePublishing(): UsePublishingProps {
	// As little logic as possible should live here--instead it should be in
	// util/publish.ts.

	//반환될 데이터들
	const {prefs} = usePrefsContext();
	const {dispatch: storyFormatsDispatch, formats} = useStoryFormatsContext();
	const {stories} = useStoriesContext();

	return {
		publishArchive: React.useCallback(                      // 현재 있는 스토리들을 모아서 아카이브 파일 생성
			async () => publishArchive(stories, getAppInfo()),
			[stories]
		),

		proofStory: React.useCallback(
			async storyId => {
				const story = storyWithId(stories, storyId);         // 스토리에 아이디를 부여해서 변수에 저장
				const format = formatWithNameAndVersion(             // 스토리 포맷과 포맷 이름, 버전을 변수에 저장
					formats,
					prefs.proofingFormat.name,
					prefs.proofingFormat.version
				);
				const formatProperties = await loadFormatProperties(format)(       // 스토리 포맷 프로퍼티 가져옴
					storyFormatsDispatch
				);

				if (!formatProperties) {
					throw new Error(`Couldn't load story format properties`);
				}

				/**
				 * 스토리와 스토리 포맷 source를 넘겨서 
				 * 스토리를 스토리 포맷에 맞게 바인딩
				 */

				return publishStoryWithFormat(                                    
					story,
					formatProperties.source,
					getAppInfo()                   // 현재 Twine의 정보. 버전 등. <tw-storydata> 태그의 creator, creator-version 속성에 들어가는 정보
				);
			},
			[
				formats,
				prefs.proofingFormat.name,
				prefs.proofingFormat.version,
				stories,
				storyFormatsDispatch
			]
		),

		publishStory: React.useCallback(
			async (storyId, publishOptions) => {
				const story = storyWithId(stories, storyId);
				const format = formatWithNameAndVersion(
					formats,
					story.storyFormat,
					story.storyFormatVersion
				);
				const formatProperties = await loadFormatProperties(format)(
					storyFormatsDispatch
				);

				if (!formatProperties) {
					throw new Error(`Couldn't load story format properties`);
				}

				return publishStoryWithFormat(
					story,
					formatProperties.source,
					getAppInfo(),
					publishOptions
				);
			},
			[formats, stories, storyFormatsDispatch]
		),

		publishStoryData: React.useCallback(
			(storyId: string) => {
				const story = storyWithId(stories, storyId);

				return publishStory(story, getAppInfo(), {startOptional: true});
			},
			[stories]
		)

	};
}
