import classNames from 'classnames';                                  // 스토리 카드 선택 기능
import * as React from 'react';
import {Card, CardProps} from './card';
import './selectable-card.css';

export interface SelectableCardProps extends CardProps {            // 선택가능한 카드 card.tsx의 인터페이스 상속
	label: string;                                                   // 카드 이름
	onDoubleClick?: React.MouseEventHandler;                         // 마우스 이벤트(더블클릭)
	onSelect: (value: boolean, exclusive: boolean) => void;          // 선택한 카드(선택 여부?, 뭔지 모르겠음)
	selected?: boolean;                                              // 선택됐는지 여부 (위랑 뭔 차이인지 모르겠음)
}

export const SelectableCard: React.FC<SelectableCardProps> = props => {
	const {label, onDoubleClick, onSelect, selected, ...other} = props;        // props 전달
	const onClick = React.useCallback(                    // 재사용 함수
		(event: React.MouseEvent) => {
			if (event.ctrlKey || event.shiftKey) {            // 스토리 카드를 클릭하면
				onSelect(!selected, false);                     // onSelect(!카드 선택 여부, exclusive=false)
			} else {                                          // 클릭 안하면
				onSelect(true, true);                           // onSelect(카드 선택 여부=true, exclusive=true)
			}
		},
		[onSelect, selected]
	);
	const onKeyDown = React.useCallback(
		(event: React.KeyboardEvent) => {                         
			if (event.key === ' ' || event.key === 'Enter') {        // 스페이스바나 엔터를 누르면
				event.preventDefault();                                // 이벤트의 기본 동작을 수행하지 않음. onKeyDown에 넘겨준 것만 실행

				if (event.ctrlKey || event.shiftKey) {                 // 컨트롤이나 쉬프트를 누른 상태라면
					onSelect(!selected, false);                          // 카드 선택
				} else {
					onSelect(true, true);                                // 선택 안함
				}
			}
		},
		[onSelect, selected]
	);

	return (
		<div
			className={classNames('selectable-card', {selected})}      
			role="button"
			aria-label={label}
			aria-pressed={selected}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onKeyDown={onKeyDown}
			tabIndex={0}
		>
			<Card {...other} />         
		</div>                     // card.tsx의 const Card 실행
	);
};
