import uniq from 'lodash/uniq';
import {Passage, StorySearchFlags, Story, StoriesState} from './stories.types';
import {createRegExp} from '../../util/regexp';
import {parseLinks} from '../../util/parse-links';
import { StoryImportDialogProps } from '../../dialogs';
import { StoriesActionOrThunk } from '../undoable-stories';
import { updatePassages } from './reducer/update-passages';


//외부로 내보내는 함수.
//passage.선택지 = "";
export function passageWithId(
	stories: Story[],
	storyId: string,
	passageId: string
) {
	console.log("Log:passageWithId - ")
	console.log(stories);
	debugger;
	const story = storyWithId(stories, storyId);
	const result = story.passages.find(p => p.id === passageId);

	if (result) {
		return result;
	}

	throw new Error(
		`There is no passage with ID "${passageId}" in a story with ID "${storyId}".`
	);
}

//이지원 자체제작 함수!
//passage 출력하기
export function passagesConsole(
	stories: Story[],
	storyId: string,
) {
	const story = storyWithId(stories, storyId);
	console.log(story.passages)
}

//Story 배열과 StoryId 와 passage 이름을 인자로 넣으면 
//find함수는 배열의 특정 값을 찾는 함수이다.
//passages는 Passage의 배열이므로 값 하나는 passage하나이다.
export function passageWithName(
	stories: Story[],
	storyId: string,
	passageName: string
) {
	console.log("Log:getters.ts - passageWithName -");
	console.log(stories);
	const story = storyWithId(stories, storyId);
	const result = story.passages.find(p => p.name === passageName);

	if (result) {
		return result;
	}

	throw new Error(
		`There is no passage with name "${passageName}" in a story with ID "${storyId}".`
	);
}

//이지원 자체제작 함수
export function passageWithNameAsStory(
	story : Story, 
	passageName : string
){
	const result = story.passages.find(p => p.name === passageName);

	if (result) {
		return result;
	}

	throw new Error(
		`There is no passage with name "${passageName}" in a story with ID ${story.id}`
	);
}



/**
 * Returns connections between passages in a structure optimized for rendering.
 * Connections are divided between draggable and fixed, depending on whether
 * either of their passages are selected (and could be dragged by the user).
 */
/*
*렌더링에 최적화된 구조의 'passage(통로)' 사이의 연결을 반환합니다. 
연결은 'passage' 중 하나가 선택되었는지(그리고 사용자가 드래그할 수 있는지)에 따라 드래그 가능과 고정으로 나뉩니다.
*/
//passage 사이의 연결을 result 변수로 반환하는 함수(이 함수는 passage 사이를 잇는 화살표의 생성에 정보를 제공하기 위한 함수로 보인다)
export function passageConnections(
	passages: Passage[],
	connectionParser?: (text: string) => string[]
) {
	const parser = connectionParser ?? ((text: string) => parseLinks(text, true)); //passage의 text에서 [[]] 안에 들어 있는 값을 배열 형식으로 parsing 해주는 함수
	const passageMap = new Map(passages.map(p => [p.name, p]));
	const result = {
		draggable: {  //아마 현재 선택된 passage는 drag가 가능하니까 draggable 같음
			broken: new Set<Passage>(),
			connections: new Map<Passage, Set<Passage>>(),
			self: new Set<Passage>()
		},
		fixed: {
			broken: new Set<Passage>(),
			connections: new Map<Passage, Set<Passage>>(),
			self: new Set<Passage>()
		}
	};

	
	passages.forEach(passage =>
		parser(passage.text).forEach(targetName => { //targetName은 [[ ]] 안에 들어 있는 다음 passage
			if (targetName === passage.name) { // 자기 참조 passage
				(passage.selected ? result.draggable : result.fixed).self.add(passage);
			} else {
				const targetPassage = passageMap.get(targetName);

				if (targetPassage) {
					const target =
						passage.selected || targetPassage.selected
							? result.draggable
							: result.fixed;

					if (target.connections.has(passage)) {
						target.connections.get(passage)!.add(targetPassage);
					} else {
						target.connections.set(passage, new Set([targetPassage]));
					}
				} else {
					(passage.selected ? result.draggable : result.fixed).broken.add(
						passage
					);
				}
			}
		})
	);

	return result;
}

/**
 * Returns all passages matching a search criteria. Use
 * `highlightPassageMatches()` to highlight exactly what matched.
 */
/* 
검색 조건과 일치하는 모든 구절을 반환합니다. 
일치하는 구절을 정확히 강조 표시하려면 `highlightPassageMatches()`를 사용합니다.
*/
export function passagesMatchingSearch(
	passages: Passage[],
	search: string,
	flags: StorySearchFlags
): Passage[] {
	if (search === '') {
		return [];
	}

	const {includePassageNames, matchCase, useRegexes} = flags;
	let matcher: RegExp;

	try {
		matcher = createRegExp(search, {matchCase, useRegexes});
	} catch (error) {
		// The regexp was malformed. Take no action.
		return [];
	}

	return passages.reduce((result, passage) => {
		if (
			matcher.test(passage.text) ||
			(includePassageNames && matcher.test(passage.name))
		) {
			return [...result, passage];
		}

		return result;
	}, [] as Passage[]);
}

export function storyPassageTags(story: Story) {
	return Array.from(
		story.passages.reduce((result, passage) => {
			passage.tags && passage.tags.forEach(tag => result.add(tag));
			return result;
		}, new Set<string>())
	).sort();
}

export function storyStats(story: Story) {
	const links = story.passages.reduce<string[]>(
		(links, passage) => [
			...links,
			...parseLinks(passage.text).filter(link => links.indexOf(link) === -1)
		],
		[]
	);

	const brokenLinks = uniq(links).filter(
		link => !story.passages.some(passage => passage.name === link)
	);

	return {
		brokenLinks,
		links,
		characters: story.passages.reduce(
			(count, passage) => count + passage.text.length,
			0
		),
		passages: story.passages.length,
		words: story.passages.reduce(
			(count, passage) => count + passage.text.split(/\s+/).length,
			0
		)
	};
}

export function storyTags(stories: Story[]) {
	return Array.from(
		stories.reduce((result, story) => {
			story.tags && story.tags.forEach(tag => result.add(tag));
			return result;
		}, new Set<string>())
	).sort();
}

//story id로 story 배열을 받아오는 함수. passage 배열이 아닌, story 배열인게 의아함.
export function storyWithId(stories: Story[], storyId: string) {
	const result = stories.find(s => s.id === storyId);

	if (result) {
		return result;
	}

	throw new Error(`There is no story with ID "${storyId}".`);
}

export function storyWithName(stories: Story[], name: string) {
	const result = stories.find(s => s.name === name);

	if (result) {
		return result;
	}

	throw new Error(`There is no story with name "${name}".`);
}
