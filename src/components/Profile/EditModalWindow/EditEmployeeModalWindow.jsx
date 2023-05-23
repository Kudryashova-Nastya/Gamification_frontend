import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react';
import {ModalWindow} from '../../ModalWindow/ModalWindow';
import './EditModalWindow.css';
import {getHostInformation, PATCHCORS, PATCHIMAGECORS} from "../../../store/helper/Helper";
import Auth from "../../../store/helper/Auth";
import Select from "../../SearchSelect/Select";
import directionsStore from "../../../store/DirectionsStore";

export const EditEmployeeModalWindow = observer(forwardRef(({setEditVisible}, ref) => {
	const host = getHostInformation()

	const [direction, setDirection] = useState(null)
	const firstName = useRef(null)
	const lastName = useRef(null)
	let email = useRef(null)
	let firstFact = useRef(null)
	let secondFact = useRef(null)
	let falseFact = useRef(null)
	let password = useRef(null)
	let imageRef = useRef(null)

	const editEmployee = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/profile/`, PATCHCORS(data, token?.access))
		const res = await req.json()
		if (req?.ok && req?.status === 200) {
			return false // возвращает false в случае успеха
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						return editEmployee(data)
					}
				})
			}
			return JSON.stringify(res) // возвращает текст ошибки в случае ошибки
		}
	}

	const editEmployeeImage = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/profile/`, PATCHIMAGECORS(data, token?.access))
		const res = await req.json()
		if (req?.ok && req?.status === 200) {
			return false
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						return editEmployeeImage(data)
					}
				})
			}
			return JSON.stringify(res)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		let maxSize = 5 * 1024 * 1024 // ограничение по размеру файла 5 Мб

		if (imageRef.current.files.length > 0) {
			if (imageRef.current.files[0].size < maxSize) {
				let formData = new FormData();
				formData.append("image", imageRef.current.files[0])
				const logImg = await editEmployeeImage(formData)
				if (logImg) {
					console.log("косяк в изображении", logImg)
				}
			} else {
				alert("Размер изображения не должен превышать 5 Мб")
			}
		}

		let data = {
			"first_name": firstName.current.value || null,
			"last_name": lastName.current.value || null,
			"email": email.current.value || null,
			"first_fact": firstFact.current.value || null,
			"second_fact": secondFact.current.value || null,
			"false_fact": falseFact.current.value || null,
			"direction": direction?.id || Auth.profileInfo?.direction?.id
		}
		if (password.current.value) {
			data = {...data, "password": password.current.value}
		}
		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await editEmployee(data)
		// console.log(data)
		if (log) {
			console.log("косяк в общих данных", log)
		} else {
			void Auth.getProfileInfo()
			setEditVisible(false)
		}
	}

	useEffect(() => {
		void directionsStore.fetchDirections()
	}, [])

	return (
		<ModalWindow isBig={true} ref={ref}>
			<svg className="close-ico" onClick={() => setEditVisible(false)} width="22" height="22"
					 viewBox="0 0 22 22" fill="none"
					 xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.9749 1.04082C20.8284 0.894041 20.6544 0.77759 20.4629 0.698136C20.2713 0.618682 20.066 0.577785 19.8586 0.577785C19.6512 0.577785 19.4459 0.618682 19.2544 0.698136C19.0628 0.77759 18.8888 0.894041 18.7424 1.04082L10.9999 8.76749L3.25737 1.02499C3.11078 0.8784 2.93675 0.762119 2.74523 0.682787C2.5537 0.603454 2.34842 0.562622 2.14112 0.562622C1.93381 0.562622 1.72853 0.603454 1.53701 0.682787C1.34548 0.762119 1.17145 0.8784 1.02487 1.02499C0.878277 1.17158 0.761997 1.3456 0.682665 1.53713C0.603332 1.72865 0.5625 1.93393 0.5625 2.14124C0.5625 2.34854 0.603332 2.55382 0.682665 2.74535C0.761997 2.93687 0.878277 3.1109 1.02487 3.25749L8.76737 11L1.02487 18.7425C0.878277 18.8891 0.761997 19.0631 0.682665 19.2546C0.603332 19.4462 0.5625 19.6514 0.5625 19.8587C0.5625 20.066 0.603332 20.2713 0.682665 20.4628C0.761997 20.6544 0.878277 20.8284 1.02487 20.975C1.17145 21.1216 1.34548 21.2379 1.53701 21.3172C1.72853 21.3965 1.93381 21.4374 2.14112 21.4374C2.34842 21.4374 2.5537 21.3965 2.74523 21.3172C2.93675 21.2379 3.11078 21.1216 3.25737 20.975L10.9999 13.2325L18.7424 20.975C18.889 21.1216 19.063 21.2379 19.2545 21.3172C19.446 21.3965 19.6513 21.4374 19.8586 21.4374C20.0659 21.4374 20.2712 21.3965 20.4627 21.3172C20.6543 21.2379 20.8283 21.1216 20.9749 20.975C21.1215 20.8284 21.2377 20.6544 21.3171 20.4628C21.3964 20.2713 21.4372 20.066 21.4372 19.8587C21.4372 19.6514 21.3964 19.4462 21.3171 19.2546C21.2377 19.0631 21.1215 18.8891 20.9749 18.7425L13.2324 11L20.9749 3.25749C21.5765 2.65582 21.5765 1.64249 20.9749 1.04082Z"
					fill="#111111"/>
			</svg>
			<div className="header3">Редактирование карточки</div>
			<form onSubmit={handleSubmit} className="edit-employee-form">
				<div className="myrefs">
					<label className="blockname">Имя: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={Auth.profileInfo.first_name}
								 maxLength="40" ref={firstName}/>
				</div>
				<div className="myrefs">
					<label className="blockname">Фамилия: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={Auth.profileInfo.last_name}
								 maxLength="40" ref={lastName}/>
				</div>
				<div className="myrefs">
					<label className="blockname">Почта TUMO: &nbsp;</label>
					<input type="email" className="input" size="35" defaultValue={Auth.profileInfo.email}
								 maxLength="50" ref={email}/>
				</div>
				{Auth.profileInfo.user_role === "curator" &&
					<div className="myrefs input-container">
						<label className="blockname">Направление: &nbsp;</label>
						<div className="input-container select-container">
						<Select allArr={directionsStore.directions} setElement={setDirection}/>
						</div>
					</div>
				}
				<div className="myrefs">
					<label className="blockname">Первый факт: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={Auth.profileInfo.first_fact}
								 maxLength="100" ref={firstFact}/>
				</div>
				<div className="myrefs">
					<label className="blockname">Второй факт: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={Auth.profileInfo.second_fact}
								 maxLength="100" ref={secondFact}/>
				</div>
				<div className="myrefs">
					<label className="blockname">Ложный факт: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={Auth.profileInfo.false_fact}
								 maxLength="100" ref={falseFact}/>
				</div>
				<div className="myrefs">
					<label className="blockname">Новый пароль: &nbsp;</label>
					<input type="text" className="input" size="35" defaultValue={null}
								 maxLength="100" ref={password} placeholder="Оставьте пустым, если не хотите менять"/>
				</div>
				<div className="myrefs">
					<label className="blockname">Новая аватарка: &nbsp; &nbsp; &nbsp;</label>
					<input type="file" ref={imageRef} accept=".jpeg, .jpg, .png, .svg"/>
				</div>
				<div className="button-block">
					<button type="submit" className="button">Сохранить</button>
				</div>
			</form>
		</ModalWindow>
	);
}));