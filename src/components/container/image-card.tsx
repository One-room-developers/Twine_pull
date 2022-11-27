/*
	<Card {...otherProps}는 img, imggaBackground, tine 외에 다른 속성을 넣을 때 보내는 Props
	이미지, 배경이미지, 색상을 기본 Props로 넘겨줌.
*/


import * as React from 'react';
import {Card, CardProps} from './card';
import './image-card.css';

export interface ImageCardProps extends CardProps {
	image: React.ReactNode;
	imageBackground?: string;
	tint?: string;
}

export const ImageCard: React.FC<ImageCardProps> = props => {
	const {children, image, imageBackground, tint, ...otherProps} = props;

	return (                          
		<div className="image-card">               
			<Card {...otherProps}>            
				{tint && <div className="image-card-tint" style={{background: tint}} />}
				<div className="image-card-image" style={{background: imageBackground}}>
					{image}
				</div>
				<div className="image-card-content">{children}</div>
			</Card>
		</div>
	);
};