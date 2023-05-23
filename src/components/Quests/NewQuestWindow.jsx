import React, {forwardRef, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {ModalWindow} from '../ModalWindow/ModalWindow';
import QuestStore from "../../store/QuestStore";
import Select from "../SearchSelect/Select";
import ERROR from "../../images/icons/error.svg";

export const NewQuestWindow = observer(forwardRef(({}, ref) => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [sum, setSum] = useState("")
	const [type, setType] = useState(null)

	const [error, setError] = useState(false)

	useEffect(() => {
		void QuestStore.fetchQuestTypes()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const request = {
			"name": name,
			"description": description,
			"type": type.id,
			"sum": sum
		}

		console.log(request)

		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await QuestStore.createQuest(request)
		if (log) {
			setError(log)
			console.log("косяк", log)
		} else {
			setError(false)
			// сброс данных формы
			setName("")
			setDescription("")
			setSum("")
			setType(null)
			QuestStore.closeModal()
		}
	}

	return (
		<ModalWindow isBig={true} ref={ref}>
			<svg className="close-ico" onClick={() => {
				QuestStore.closeModal()
			}}
					 width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.9749 1.04082C20.8284 0.894041 20.6544 0.77759 20.4629 0.698136C20.2713 0.618682 20.066 0.577785 19.8586 0.577785C19.6512 0.577785 19.4459 0.618682 19.2544 0.698136C19.0628 0.77759 18.8888 0.894041 18.7424 1.04082L10.9999 8.76749L3.25737 1.02499C3.11078 0.8784 2.93675 0.762119 2.74523 0.682787C2.5537 0.603454 2.34842 0.562622 2.14112 0.562622C1.93381 0.562622 1.72853 0.603454 1.53701 0.682787C1.34548 0.762119 1.17145 0.8784 1.02487 1.02499C0.878277 1.17158 0.761997 1.3456 0.682665 1.53713C0.603332 1.72865 0.5625 1.93393 0.5625 2.14124C0.5625 2.34854 0.603332 2.55382 0.682665 2.74535C0.761997 2.93687 0.878277 3.1109 1.02487 3.25749L8.76737 11L1.02487 18.7425C0.878277 18.8891 0.761997 19.0631 0.682665 19.2546C0.603332 19.4462 0.5625 19.6514 0.5625 19.8587C0.5625 20.066 0.603332 20.2713 0.682665 20.4628C0.761997 20.6544 0.878277 20.8284 1.02487 20.975C1.17145 21.1216 1.34548 21.2379 1.53701 21.3172C1.72853 21.3965 1.93381 21.4374 2.14112 21.4374C2.34842 21.4374 2.5537 21.3965 2.74523 21.3172C2.93675 21.2379 3.11078 21.1216 3.25737 20.975L10.9999 13.2325L18.7424 20.975C18.889 21.1216 19.063 21.2379 19.2545 21.3172C19.446 21.3965 19.6513 21.4374 19.8586 21.4374C20.0659 21.4374 20.2712 21.3965 20.4627 21.3172C20.6543 21.2379 20.8283 21.1216 20.9749 20.975C21.1215 20.8284 21.2377 20.6544 21.3171 20.4628C21.3964 20.2713 21.4372 20.066 21.4372 19.8587C21.4372 19.6514 21.3964 19.4462 21.3171 19.2546C21.2377 19.0631 21.1215 18.8891 20.9749 18.7425L13.2324 11L20.9749 3.25749C21.5765 2.65582 21.5765 1.64249 20.9749 1.04082Z"
					fill="#111111"/>
			</svg>
			<div className="header3">Создание нового задания</div>
			<form className="form quest-form" onSubmit={handleSubmit}>
				<div className="inputs-block input-container">
					<div>
						<label htmlFor="name">Название</label>
						<input
							required
							id="name"
							className="input"
							name="name"
							type="text"
							value={name}
							maxLength="60"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Описание</label>
						<textarea
							rows="5"
							required
							id="description"
							className="quest-textarea"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label>Тип задания</label>
						<div className="input-container select-container">
							<Select allArr={QuestStore.questTypes} setElement={setType} defaultText={"Выберите тип"}/>
						</div>
					</div>
					<div>
						<label htmlFor="sum">Вознаграждение</label>
						<input
							required
							id="sum"
							className="input"
							name="sum"
							type="number"
							value={sum}
							onChange={(e) => setSum(e.target.value)}
						/>
					</div>
				</div>
				<div className="button-block">
					<button className="button btn-large">Создать</button>
				</div>
			</form>
			{error &&
				<div className="error-message">
					<div><img src={ERROR} alt="error"/></div>
					<div>{error}</div>
				</div>
			}
		</ModalWindow>
	)
}));