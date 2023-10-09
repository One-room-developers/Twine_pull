


import classNames from 'classnames';                                     // 태그에 class를 부여하는 라이브러리
import {deviceType} from 'detect-it';                                    // 마우스 클릭을 감지
import * as React from 'react';
import {DraggableCore, DraggableCoreProps} from 'react-draggable';       // 객체를 드래그할 수 있는 라이브러리
import {useTranslation} from 'react-i18next';
import {Passage, TagColors} from '../../store/stories';
import {CardContent} from '../container/card';
import {SelectableCard} from '../container/card/selectable-card';
import {TagStripe} from '../tag/tag-stripe';
import './passage-card.css';

export interface PassageCardProps {
	onEdit: (passage: Passage) => void;                       // Passage interface 타입을 인자로 보내서 void를 반환하는 함수 타입
	onDeselect: (passage: Passage) => void;                   // 위와 같음
	onDragStart?: DraggableCoreProps['onStart'];             // DraggableCoreProps의 onStart 속성으로 타입 지정
	onDrag?: DraggableCoreProps['onDrag'];                   // DraggableCoreProps의 onDrag 속성으로 타입 지정
	onDragStop?: DraggableCoreProps['onStop'];               // DraggableCoreProps의 onStop 속성으로 타입 지정
	onSelect: (passage: Passage, exclusive: boolean) => void;  // Passage 타입과 boolean을 인자로 보내서 void를 반환하는 함수 타입
	passage: Passage;
	tagColors: TagColors;
}

// Needs to fill a large-sized passage card.
const excerptLength = 400;

export const PassageCard: React.FC<PassageCardProps> = React.memo(props => {
	const {
		onDeselect,
		onDrag,
		onDragStart,
		onDragStop,
		onEdit,
		onSelect,
		passage,
		tagColors
	} = props;
	const {t} = useTranslation();                  // t('...') 형식의 문자열을 번역해줌.
	/**
	 * passage.select, passage.tags.length, passage.text의 값이 바뀌면,
	 * classNames()호출. 
	 * passage-card 클래스는 기본적으로 추가.
	 * empty는 passage.text가 공백이며, passage.tags.length가 0일 때 추가.
	 * selected는 passage.selected가 true일 때 추가
	 */
	
	const className = React.useMemo(                                 
		() =>
			classNames('passage-card', {
				empty: passage.text === '' && passage.tags.length === 0,
				selected: passage.selected,
				'nomal-passage' : passage.passageType === "normalPassage",
				'option-passage' : passage.passageType === "optionPassage"
			}),
		[passage.selected, passage.tags.length, passage.text, passage.passageType]
	);
	const container = React.useRef<HTMLDivElement>(null);     // div 엘리먼트의 초기값을 current 속성에 할당. 상태가 변경되어도 다시 렌더링되지 않음
	/**
	 * passage.text, t값이 변할 때마다
	 * 본문이 있으면, passage의 본문을 발췌하여 excerpt에 리턴.
	 * 본문이 공백 상태라면, placeholder 출력
	 */
	const excerpt = React.useMemo(() => {
		if (passage.text.length > 0) {
			if(passage.passageType === "normalPassage"){//이지원 제작 코드, passage가 normal이면 text대신 visibleText와 optionVisibleName을 결합해 출력
				let returnText = passage.visibleText;
				passage.options.forEach(option => {
					returnText += "\n[[" + option.optionVisibleName  + "]]"
				})
				return returnText;
			}
			else if(passage.passageType === "optionPassage"){
				return passage.text.substring(0, excerptLength);
			}
			else{
				debugger;
				console.log("passage-card에서 잘못된 접근")
			}
		}

		return (
			<span className="placeholder">
				{t(
					deviceType === 'touchOnly'
						? 'components.passageCard.placeholderTouch'
						: 'components.passageCard.placeholderClick'
				)}
			</span>
		);
	}, [passage.text, t]);
	/**
	 * passage.height, passage.left, passage.top, passage.width 값이 바뀌면,
	 * style에 height, left, top, width 값을 반환
	 */
	const style = React.useMemo(
		() => ({
			height: passage.height,
			left: passage.left,
			top: passage.top,
			width: passage.width
		}),
		[passage.height, passage.left, passage.top, passage.width]
	);
	/**
	 * shift+좌클릭, ctrl+좌클릭하면 passage card 여러 개 선택하는 기능
	 */
	const handleMouseDown = React.useCallback(
		(event: MouseEvent) => {
			if (event.shiftKey || event.ctrlKey) {
				if (passage.selected) {
					onDeselect(passage);
				} else {
					onSelect(passage, false);
				}
			} else if (!passage.selected) {
				onSelect(passage, true);
			}
		},
		[onDeselect, onSelect, passage]
	);
	/**
	 * passage 값이 바뀌면 새로운 onEdit 호출
	 */
	const handleEdit = React.useCallback(
		() => onEdit(passage),
		[onEdit, passage]
	);
	/**
	 * passage 값이 바뀌면 새로운 onSelect 호출
	 */
	const handleSelect = React.useCallback(
		(value: boolean, exclusive: boolean) => {
			onSelect(passage, exclusive);
		},
		[onSelect, passage]
	);

	return (
		<DraggableCore
			nodeRef={container}
			onMouseDown={handleMouseDown}
			onStart={onDragStart}
			onDrag={onDrag}
			onStop={onDragStop}
		>
			<div className={className} ref={container} style={style}>
				<SelectableCard                                            // 선택 가능한 passage card
					highlighted={passage.highlighted}
					label={passage.name}
					onDoubleClick={handleEdit}             // 더블클릭 시 handleEdit 호출
					onSelect={handleSelect}                // 텍스트가 선택될 때 handleSeelct 호출
					selected={passage.selected}
				>
					<TagStripe tagColors={tagColors} tags={passage.tags} />
					<h2>{(passage.passageType === "normalPassage")?(passage.name):(passage.optionVisibleName)}</h2>
					<CardContent>{excerpt}</CardContent>
				</SelectableCard>
			</div>
		</DraggableCore>
	);
});

PassageCard.displayName = 'PassageCard';