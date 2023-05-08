/*
Parses passage text for links. Optionally, it returns internal links only --
e.g. those pointing to other passages in a story, not to an external web site.
*/

import uniq from 'lodash/uniq';

// The top level regular expression to catch links -- i.e. [[link]].
//모든 일치 항목의 배열을 반환하며, 없으면 빈 배열을 반환함.
const extractLinkTags = (text: string) => text.match(/\[\[.*?\]\]/g) || [];

// Links _not_ starting with a protocol, e.g. abcd://.
// http:// 와 같이 링크 형식인지 확인하는 것 같음.
const internalLinks = (link: string) => !/^\w+:\/\/\/?\w/i.test(link);

// Links with some text in them.
const nonEmptyLinks = (link: string) => link !== '';

// Setter is the second [] block if exists.
const removeSetters = (link: string) => {
	const noSetter = getField(link, '][', 0);

	return noSetter ?? link;
};

const removeEnclosingBrackets = (link: string) =>
	link.substr(2, link.length - 4);

/**
 * Split the link by the separator and return the field in the given index.
 * Negative indices start from the end of the array.
 */
const getField = (link: string, separator: string, index: number) => {
	const fields = link.split(separator);

	if (fields.length === 1) {
		/* Separator not present. */
		return undefined;
	}

	return index < 0 ? fields[fields.length + index] : fields[index];
};

// Arrow links:
// [[display text->link]] format
// [[link<-display text]] format
// Interpret the rightmost '->' and the leftmost '<-' as the divider.

const extractLink = (tagContent: string) => {
	return (
		getField(tagContent, '->', -1) ||
		getField(tagContent, '<-', 0) ||
		//  TiddlyWiki links:
		//  [[display text|link]] format

		getField(tagContent, '|', -1) ||
		// [[link]] format
		tagContent
	);
};

/**
 * Returns a list of unique links in passage source code.
 */
export function parseLinks(text: string, internalOnly?: boolean) {
	// Link matching regexps ignore setter components, should they exist.

	//map함수는 배열의 각 요소에 모두 접근하여 인자로 주는 함수를 적용하는 함수.
	let result = uniq(
		extractLinkTags(text)
			.map(removeEnclosingBrackets)
			.map(removeSetters)
			.map(extractLink)
			.filter(nonEmptyLinks)//filter는 배열중 인자로 주어진 조건을 만족하는 애들만 추출해서 얕은 복사를 함.
	);

	if (internalOnly) {
		result = result.filter(internalLinks);
	}

	return result;
}
