import * as React from 'react';
import { useRef } from 'react';
import {
	Controlled as CodeMirror,
	IControlledCodeMirror
} from 'react-codemirror2';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import './code-area.css';
import './codemirror-theme.css';
import classnames from 'classnames';
import {initPrefixTriggerGlobally} from '../../../codemirror/prefix-trigger';

// Not ideal by far to do this init here, outside of a component, but we have to
// set up CodeMirror before the first render. Otherwise, CodeMirror doesn't pick
// up on options properly.

initPrefixTriggerGlobally();

export interface CodeAreaProps extends IControlledCodeMirror {
	fontFamily?: string;
	fontScale?: number;
	label: string;
	labelHidden?: boolean;
	value: string;//textarea에 적는 모든 string을 저장하는 value이다.? script인가?
}
export const CodeArea: React.FC<CodeAreaProps> = props => {
	const {fontFamily, fontScale, label, ...otherProps} = props;
	const style: React.CSSProperties = {};

	if (fontFamily) {
		style.fontFamily = fontFamily.includes(' ')
			? `"${fontFamily}"`
			: fontFamily;
	}

	if (fontScale) {
		style.fontSize = `${fontScale * 100}%`;
	}

	return (
		<div className="code-area" style={style}>
			<label>
				<span
					className={classnames('label', {
						'screen-reader-only': props.labelHidden
					})}
				>
					{label}
				</span>
				<CodeMirror {...otherProps} />
			</label>
		</div>
	);
};
