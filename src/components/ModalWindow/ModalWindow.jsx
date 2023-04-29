// Переиспользуемый компонент для модальных окон
import React from 'react';

import './ModalWindow.css';

export const ModalWindow = React.forwardRef(({children, isBig=false}, ref) => {
	return (
		<div className="modal-back" ref={ref}>
			<div ref={ref}
				className={isBig ? "modal big-modal" : 'modal'}>
				{children}
			</div>
		</div>
	);
});
