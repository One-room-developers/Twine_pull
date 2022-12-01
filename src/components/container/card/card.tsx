import * as React from 'react';                            // 스토리 카드 구성
import classNames from 'classnames';
import './card.css';

export interface CardProps {
	floating?: boolean;                      // 카드 띄울지 말지
	highlighted?: boolean;                   // 카드에 하이라이트 넣을지 말지
}

export const Card: React.FC<CardProps> = props => {
	const {children, floating, highlighted} = props;

	const className = classNames('card', {             // card.css에 있는 스타일 적용
		floating,
		highlighted
	});

	return <div className={className}>{children}</div>;    // 자식 스토리 카드를 반환
};
