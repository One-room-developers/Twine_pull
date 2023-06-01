/**
 * Passage를 더블클릭 하면 옆에 나오는 입력 창을 구성하는 코드.
 * 더블클릭 했을 때 나타나는 효과, 여러 개를 띄워놓았을 때 크기가 동적으로 변하는 애니메이션 등을 지정해준 것 같음.
 * dialog card의 제목, 최대화 버튼, 닫기 버튼 기능이 들어가 있음.
 */


import * as React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';             // 언어 번역할 때 쓰는 라이브러리 여기서 정확히 어떻게 쓰인 건지는 모르겠음
import {
	IconArrowsDiagonal,
	IconArrowsDiagonalMinimize,
	IconChevronDown,
	IconChevronUp,
	IconX
} from '@tabler/icons';
import { Card } from '../card';
import { IconButton } from '../../control/icon-button';
import './dialog-card.css';
import useErrorBoundary from 'use-error-boundary';      // 컴포넌트에서 에러가 나는지 추적하는 라이브러리
import { ErrorMessage } from '../../error';

export interface DialogCardProps {
	className?: string;
	collapsed: boolean;
	fixedSize?: boolean;
	headerLabel: string;
	highlighted?: boolean;
	maximizable?: boolean;
	maximized?: boolean;
	onChangeCollapsed: (value: boolean) => void;
	onChangeHighlighted: (value: boolean) => void;
	onChangeMaximized: (value: boolean) => void;
	onClose: () => void;
	setEzoneButton : any;
}

export const DialogCard: React.FC<DialogCardProps> = props => {
	const {
		children, //props.children은 이 컴포넌트를 부른 부모 태그에서 DialogCard안에 쓴 컴포넌트들을 자식으로 불러옴
		className,
		collapsed,
		fixedSize,
		headerLabel,
		highlighted,
		maximizable,
		maximized,
		onChangeCollapsed,
		onChangeHighlighted,
		onChangeMaximized,
		onClose
	} = props;
	const { didCatch, ErrorBoundary, error } = useErrorBoundary();
	const { t } = useTranslation();

	React.useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	React.useEffect(() => {
		if (highlighted) {
			const timeout = window.setTimeout(() => onChangeHighlighted(false), 400);

			return () => window.clearTimeout(timeout);
		}
	}, [highlighted, onChangeHighlighted]);                 // highlighted값이 바뀔 때 useEffect가 실행되고, 끝나는 시점에 onChangeHilighted 호출

	const calcdClassName = classNames('dialog-card', className, {    // 클래스 추가 함수
		collapsed,
		highlighted,                       // collapsed, highlighted, maximized 클래스는 기본적으로 추가
		'fixed-size': fixedSize,           // fixed-size 클래스는 fixedSize값이 true일 경우에만 추가        
		maximized
	});

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Escape') {                          // esc 누르면 dialog card 닫힘
			onClose();
		}
	}

	return (
		<div
			aria-label={headerLabel}
			role="dialog"
			className={calcdClassName}
			onKeyDown={handleKeyDown}
		>
			<Card floating>
				<h2>
					<div className="dialog-card-header">
						<IconButton         
							icon={collapsed ? <IconChevronUp /> : <IconChevronDown />}   // dialog card가 접혔는지 여부에 따라 아이콘 표시 여부 결정
							label={headerLabel}                                          // dialog card 제목
							onClick={() => onChangeCollapsed(!collapsed)}                // 카드 접기&펼치기 기능
						/>
					</div>
					<div className="dialog-card-header-controls">
						{maximizable && (                                 				//Iconbutton들의 기능
																						//최대화 버튼 
							<IconButton
								icon={
									maximized ? (
										<IconArrowsDiagonalMinimize />
									) : (
										<IconArrowsDiagonal />
									)
								}
								iconOnly
								label={
									maximized ? t('common.unmaximize') : t('common.maximize')
								}
								onClick={() => onChangeMaximized(!maximized)}
								// onClick={()=>props.setEzoneButton(true)}	
								tooltipPosition="bottom"
							/>
						)}
						<IconButton
							icon={<IconX />}
							iconOnly
							label={t('common.close')}
							onClick={onClose}                 // 닫기 버튼
							tooltipPosition="bottom"
						/>
					</div>
				</h2>
				{didCatch ? (
					<ErrorMessage>
						{t('components.dialogCard.contentsCrashed')}
					</ErrorMessage>
				) : (
					<ErrorBoundary>{!collapsed && children }</ErrorBoundary> //여기 children에 마지막 anonymous 
				)}
			</Card>
		</div>
	);
};
