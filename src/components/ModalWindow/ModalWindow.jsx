// Переиспользуемый компонент для модальных окон
import React from 'react';

import './ModalWindow.css';

export const ModalWindow = React.forwardRef(({children, isBig=false, colorBorder='#111111'}, ref) => {
	return (
		<div className="modal-back" ref={ref}>
			<div ref={ref}
				className={isBig ? "modal big-modal" : 'modal'}
			style={{"border": `3px solid ${colorBorder}`}}>
				{children}
			</div>
		</div>
	);
});
