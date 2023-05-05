import React, {forwardRef, useState} from 'react';
import {observer} from 'mobx-react';
import {ModalWindow} from '../../ModalWindow/ModalWindow';
import MarketStore from "../../../store/MarketStore";
import {SketchPicker} from "react-color";
import StudentProfileStore from "../../../store/StudentProfileStore";

export const EditBuyModalWindow = observer(forwardRef(({data}, ref) => {
	const [sketchColor, setSketchColor] = useState('#6F5FFE');
	const [response, setResponse] = useState(null);
	const type = data.store_product?.product_type
	const tryEdit = async () => {
		let res
		let improve = {}
		if (type === "border_color" || type === "back_color") {
			improve[type] = sketchColor
			res = await StudentProfileStore.editProfile({"student_profile": improve})
		} else if (type === "emoji_status" || type === "emoji_sticker") {
			improve[type] = data.store_product?.image
			res = await StudentProfileStore.editProfile({"student_profile": improve})
		} else {
			res = "Не удалось применить улучшение"
		}

		if (res) {
			setResponse(res)
		} else {
			setResponse("Успешно сохранено! Перейдите в свой личный профиль, чтобы увидеть улучшение")
			await MarketStore.fetchMyBuys()
		}
	}

	return (
		<ModalWindow ref={ref}>
			<svg className="close-ico" onClick={() => {
				MarketStore.closeModal()
			}}
					 width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.9749 1.04082C20.8284 0.894041 20.6544 0.77759 20.4629 0.698136C20.2713 0.618682 20.066 0.577785 19.8586 0.577785C19.6512 0.577785 19.4459 0.618682 19.2544 0.698136C19.0628 0.77759 18.8888 0.894041 18.7424 1.04082L10.9999 8.76749L3.25737 1.02499C3.11078 0.8784 2.93675 0.762119 2.74523 0.682787C2.5537 0.603454 2.34842 0.562622 2.14112 0.562622C1.93381 0.562622 1.72853 0.603454 1.53701 0.682787C1.34548 0.762119 1.17145 0.8784 1.02487 1.02499C0.878277 1.17158 0.761997 1.3456 0.682665 1.53713C0.603332 1.72865 0.5625 1.93393 0.5625 2.14124C0.5625 2.34854 0.603332 2.55382 0.682665 2.74535C0.761997 2.93687 0.878277 3.1109 1.02487 3.25749L8.76737 11L1.02487 18.7425C0.878277 18.8891 0.761997 19.0631 0.682665 19.2546C0.603332 19.4462 0.5625 19.6514 0.5625 19.8587C0.5625 20.066 0.603332 20.2713 0.682665 20.4628C0.761997 20.6544 0.878277 20.8284 1.02487 20.975C1.17145 21.1216 1.34548 21.2379 1.53701 21.3172C1.72853 21.3965 1.93381 21.4374 2.14112 21.4374C2.34842 21.4374 2.5537 21.3965 2.74523 21.3172C2.93675 21.2379 3.11078 21.1216 3.25737 20.975L10.9999 13.2325L18.7424 20.975C18.889 21.1216 19.063 21.2379 19.2545 21.3172C19.446 21.3965 19.6513 21.4374 19.8586 21.4374C20.0659 21.4374 20.2712 21.3965 20.4627 21.3172C20.6543 21.2379 20.8283 21.1216 20.9749 20.975C21.1215 20.8284 21.2377 20.6544 21.3171 20.4628C21.3964 20.2713 21.4372 20.066 21.4372 19.8587C21.4372 19.6514 21.3964 19.4462 21.3171 19.2546C21.2377 19.0631 21.1215 18.8891 20.9749 18.7425L13.2324 11L20.9749 3.25749C21.5765 2.65582 21.5765 1.64249 20.9749 1.04082Z"
					fill="#111111"/>
			</svg>
			<div className="checkmodal editmybuy">
				{type === "border_color" || type === "back_color" ?
					<>
						<div className="header3">Выберите цвет для «{data.store_product?.name || "Покупка"}»</div>
						<div className="rows">
							<div className="blockname">
								{response ? response : <>
									<div className="selected-color">Выбранный цвет: <span
										style={{"color": sketchColor}}>{sketchColor}</span></div>
									<SketchPicker
										className="setcolor"
										color={sketchColor}
										onChange={(e) => setSketchColor(e.hex)}
									/>
								</>}
							</div>
						</div>
					</> : type === "emoji_status" || type === "emoji_sticker" ?
						<>
							<div className="header3">Хотите применить «{data.store_product?.name || "Покупка"}»?</div>
							<div className="rows">
								<div className="blockname">
									{response ? response :
										"Этот эмоджи станет украшением вашего личного профиля и будет виден всем остальным пользователям"
									}
								</div>
							</div>
						</>
						: type === "merch" ?
							<>
								<div className="header3">Поздравляем с приобретением «{data.store_product?.name || "Покупка"}»</div>
								<div className="rows">
									<div className="blockname">
										{response ? response : <>
											Вы можете подойти к коучу либо админу, чтобы забрать свой мерч. Назовите своё имя и ID
											покупки.<br/>
											ID вашей покупки - {data.id}</>
										}
									</div>
								</div>
							</> : <div className="rows">
								<div className="blockname">
									Вид товара неопределён
								</div>
							</div>
				}
			</div>
			{type === "merch" ?
				<button onClick={() => MarketStore.closeModal()} className="button btn-large">Хорошо</button> : response ? "" :
					<button onClick={() => tryEdit()} className="button btn-large">Сохранить</button>}
		</ModalWindow>
	)
		;
}));