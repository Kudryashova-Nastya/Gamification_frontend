// Переиспользуемый компонент для модальных окон
import React from 'react';

import './ModalWindow.css';

export const ModalWindow = ({children, isBig=false}) => {
	return (
		<div className="modal-back">
			<div
				className={isBig ? "modal big-modal" : 'modal'}>
				{children}
			</div>
		</div>
	);
};
