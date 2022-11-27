/**
 * Twine의 상단 Menu-bar를 구성하는 코드.
 * 위에서 두 번째 Menu-bar
 */


import * as React from 'react';
import classNames from 'classnames';
import './button-bar.css';

export interface ButtonBarProps {
	orientation?: 'horizontal' | 'vertical';
}

export const ButtonBar: React.FC<ButtonBarProps> = props => (
	<div                        
		className={classNames(   
			'button-bar',
			`orientation-${props.orientation ?? 'horizontal'}`
		)}
	>          
		{props.children}
	</div>
);
