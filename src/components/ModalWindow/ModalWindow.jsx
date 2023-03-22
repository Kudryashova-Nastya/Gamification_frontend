// Переиспользуемый компонент для модальных окон
import React from 'react';

import './ModalWindow.css';

export const ModalWindow = ({children}) => {
	return (
		<div className="modal-back">
			<div
				className="modal">
				{children}
			</div>
		</div>
	);
};
