import React, {useEffect, useState} from "react";
import '../base.css';
import './style.css'
import {observer} from "mobx-react";
import ERROR from "../../images/icons/error.svg";
import {getHostInformation, POSTCORS} from "../../store/helper/Helper";
import Auth from "../../store/helper/Auth";
import Select from "../SearchSelect/Select";
import directionsStore from "../../store/DirectionsStore";

const EmployeeRegistration = observer(() => {
	const [name, setName] = useState("")
	const [lastname, setLastname] = useState("")
	const [email, setEmail] = useState("")
	const [direction, setDirection] = useState(null)
	const [role, setRole] = useState("curator")
	const [password, setPassword] = useState("")

	const [isDone, setIsDone] = useState(false)
	const [error, setError] = useState(false)
	const [data, setData] = useState({})

	const host = getHostInformation()

	const registerEmployee = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/employee/`, POSTCORS(data, token?.access))
		const res = await req.json()
		console.log("res", res)
		if (req?.ok && req?.status === 201) {
			console.log("всё ок, статус 201")
			return false // возвращает false в случае успеха
		} else {
			if (res.code === "token_not_valid") {
				console.log("проблема протухшего токена обнаружена")
				Auth.getToken().then((token) => {
					if (token?.access) {
						console.log("проблема протухания решена, перезапуск запроса")
						return registerEmployee(data)
					} else {
						console.log("проблема протухания не решена", token)
					}
				})
			}
			return res.detail || res.email || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
		}
	}

	// const fetchDirections = async () => {
	// 	const host = getHostInformation()
	// 	const token = await Auth.getToken()
	// 	await fetch(`${host}/api/v1/direction`, CORS(token?.access))
	// 	.then(async (res) => await res.json())
	// 	.then((dir) => {
	// 		if (dir?.code === "token_not_valid") {
	// 			fetchDirections()
	// 		} else {
	// 			setAllDirections(dir)
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log("err", err)
	// 	})
	// }

	useEffect(() => {
		void directionsStore.fetchDirections()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const request = {
			"first_name": name,
			"last_name": lastname,
			"email": email,
			"direction": role === "curator" ? direction?.id || null: null,
			"password": password,
			"user_role": role,
		}

		setData(request)
		console.log(request)

		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await registerEmployee(request)
		if (log) {
			setError(log)
			setIsDone(false)
			console.log("косяк", log)
		} else {
			setError(false)
			setIsDone(true)
			// сброс данных формы
			setName("")
			setLastname("")
			setEmail("")
			setPassword("")
			setDirection(null)
		}
	}


	return (
		<div className="window-container">
			<div className="window">
				<h1 className="header3">Регистрация нового сотрудника</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div className="inputs-block input-container">
						<div>
							<label htmlFor="name">Имя</label>
							<input
								required
								id="name"
								className="input"
								name="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="lastname">Фамилия</label>
							<input
								required
								id="lastname"
								className="input"
								name="lastname"
								type="text"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="email">Почта TUMO</label>
							<input
								required
								id="email"
								className="input"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password">Пароль</label>
							<input
								required
								id="password"
								className="input"
								name="password"
								type="text"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<label>Роль</label>
						<input onChange={(e) => setRole(e.target.value)} type="radio" id="role1" name="role" value="curator"
									 checked={role === 'curator'}/>
						<label className="radio-label" htmlFor="role1">Куратор</label>
						<input onChange={(e) => setRole(e.target.value)} type="radio" id="role2" name="role" value="manager"
									 checked={role === 'manager'}/>
						<label className="radio-label" htmlFor="role2">Админ</label>
						<input onChange={(e) => setRole(e.target.value)} type="radio" id="role3" name="role" value="coach"
									 checked={role === 'coach'}/>
						<label className="radio-label" htmlFor="role3">Коуч</label>
					</div>
					{role === "curator" &&
					<div className="input-container select-container">
						<Select allArr={directionsStore.directions} setElement={setDirection}/>
					</div>
					}
					<button className="button">Зарегистрировать</button>
				</form>
			</div>

			{isDone ? <div>
				<div className="window">
					<h1 className="header3">Регистрация прошла успешно</h1>
					<div className="form">
						<div>
							<label>Логин: {data.email} </label>
						</div>
						<div>
							<label>Пароль: {data.password} </label>
						</div>
					</div>
				</div>
			</div> : null}

			{error &&
				<div className="error-message">
					<div><img src={ERROR} alt="error"/></div>
					<div>{error}</div>
				</div>
			}
		</div>
	);
})

export default EmployeeRegistration;