import React, {createRef, useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react';
import {ModalWindow} from '../../ModalWindow/ModalWindow';
import StudentProfileStore from "../../../store/StudentProfileStore";
import './EditModalWindow.css';
import {CORS, getHostInformation} from "../../../store/helper/Helper";
import Auth from "../../../store/helper/Auth";

export const EditModalWindow = observer(() => {

	const checkboxes = document.querySelectorAll('input[type=checkbox]')
	const limit = 4 // максимальное количество выбранных чекбоксов
	const [isLoading, setIsLoading] = useState(true)

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', () => {
			let checkedCount = 0
			checkboxes.forEach((checkbox) => {
				if (checkbox.checked) {
					checkedCount++
				}
			})
			if (checkedCount > limit) {
				checkbox.checked = false
			}
		})
	})

	const [directions, setDirections] = useState([
		{
			"name": "Анимация",
			"id": 1
		},
		{
			"name": "Робототехника",
			"id": 2
		},
		{
			"name": "Музыка",
			"id": 3
		},
		{
			"name": "3D-моделирование",
			"id": 4
		},
		{
			"name": "Графический дизайн",
			"id": 5
		},
		{
			"name": "Разработка игр",
			"id": 6
		},
		{
			"name": "Кинопроизводство",
			"id": 7
		},
		{
			"name": "Программирование",
			"id": 8
		}
	])


	const aboutRef = useRef(null);
	const telegramRef = useRef(null);
	let directionsRef = useRef(directions?.map(() => createRef())); // для чекбоксов
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			"about": aboutRef.current.value || null,
			"telegram": telegramRef.current.value || null
		}
		console.log("edit", data);
		const dir = directionsRef.current?.map(
			ref => ref.current?.checked
		);
		console.log(dir)
		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await StudentProfileStore.editProfile(data)
		if (log) {
			console.log("косяк", log)
		} else {
			void StudentProfileStore.fetchStudentInfo()
			console.log("успех")
		}

		StudentProfileStore.closeModal()
	}

	useEffect(() => {
		setIsLoading(true)
		const host = getHostInformation()
		fetch(`${host}/api/v1/direction`, CORS(Auth.token?.access))
		.then(async (res) => await res.json())
		.then((data) => {
			setDirections(data)
			setIsLoading(false)
		})
		.catch((err) => {
			console.log("err", err)
		})
	}, [])


	return (
		<ModalWindow isBig={true}>
			<svg className="close-ico" onClick={() => StudentProfileStore.closeModal()} width="22" height="22"
					 viewBox="0 0 22 22" fill="none"
					 xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.9749 1.04082C20.8284 0.894041 20.6544 0.77759 20.4629 0.698136C20.2713 0.618682 20.066 0.577785 19.8586 0.577785C19.6512 0.577785 19.4459 0.618682 19.2544 0.698136C19.0628 0.77759 18.8888 0.894041 18.7424 1.04082L10.9999 8.76749L3.25737 1.02499C3.11078 0.8784 2.93675 0.762119 2.74523 0.682787C2.5537 0.603454 2.34842 0.562622 2.14112 0.562622C1.93381 0.562622 1.72853 0.603454 1.53701 0.682787C1.34548 0.762119 1.17145 0.8784 1.02487 1.02499C0.878277 1.17158 0.761997 1.3456 0.682665 1.53713C0.603332 1.72865 0.5625 1.93393 0.5625 2.14124C0.5625 2.34854 0.603332 2.55382 0.682665 2.74535C0.761997 2.93687 0.878277 3.1109 1.02487 3.25749L8.76737 11L1.02487 18.7425C0.878277 18.8891 0.761997 19.0631 0.682665 19.2546C0.603332 19.4462 0.5625 19.6514 0.5625 19.8587C0.5625 20.066 0.603332 20.2713 0.682665 20.4628C0.761997 20.6544 0.878277 20.8284 1.02487 20.975C1.17145 21.1216 1.34548 21.2379 1.53701 21.3172C1.72853 21.3965 1.93381 21.4374 2.14112 21.4374C2.34842 21.4374 2.5537 21.3965 2.74523 21.3172C2.93675 21.2379 3.11078 21.1216 3.25737 20.975L10.9999 13.2325L18.7424 20.975C18.889 21.1216 19.063 21.2379 19.2545 21.3172C19.446 21.3965 19.6513 21.4374 19.8586 21.4374C20.0659 21.4374 20.2712 21.3965 20.4627 21.3172C20.6543 21.2379 20.8283 21.1216 20.9749 20.975C21.1215 20.8284 21.2377 20.6544 21.3171 20.4628C21.3964 20.2713 21.4372 20.066 21.4372 19.8587C21.4372 19.6514 21.3964 19.4462 21.3171 19.2546C21.2377 19.0631 21.1215 18.8891 20.9749 18.7425L13.2324 11L20.9749 3.25749C21.5765 2.65582 21.5765 1.64249 20.9749 1.04082Z"
					fill="#111111"/>
			</svg>
			<div className="header3">Редактирование профиля</div>
			<form onSubmit={handleSubmit}>
				<div className="columns">
					<div className="mydirections">
						<div className="blockname">Мои направления (max 4):</div>
						{directions?.map((dir, i) =>
							<div className="mydirection" key={i}>
								<input type="checkbox"
											 // ref={directionsRef?.current[dir.id]}
											 ref={isLoading ? null: directionsRef?.current[dir.id]}
											 defaultChecked={StudentProfileStore.studentInfo.direction.find(d => d.id === dir.id)}/>
								<label>{dir.name}</label>
							</div>
						)}
					</div>
					<div className="aboutblock">
						<div className="blockname blockname__about">О себе:</div>
						<textarea className="aboutme" ref={aboutRef} defaultValue={StudentProfileStore.studentInfo?.about}/>
					</div>
				</div>
				<div className="myrefs">
					<label className="blockname">Мой телеграм: &nbsp;</label>
					<input type="text" className="input" size="40" defaultValue={StudentProfileStore.studentInfo?.telegram}
								 maxLength="40" ref={telegramRef}/>
				</div>
				<div className="button-block">
					<button type="submit" disabled={isLoading} className="button">Сохранить</button>
				</div>
			</form>
		</ModalWindow>
	);
});