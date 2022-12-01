// css 적용하는 코드인듯


import * as React from 'react';
import {Card, CardProps} from './card/card';
import './button-card.css';

export const ButtonCard: React.FC<CardProps> = props => (
	<div className="button-card">
		<Card {...props} />
	</div>
);
