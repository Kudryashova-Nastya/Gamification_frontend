import React, {useState} from "react";
import '../base.css';
import './style.css'
import {observer} from "mobx-react";
import ERROR from "../../images/icons/error.svg";
import StudentProfileStore from "../../store/StudentProfileStore";

const StudentRegistration = observer(() => {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [tarif, setTarif] = useState("Standart");
	const [password, setPassword] = useState("");

	const [isDone, setIsDone] = useState(false)
	const [error, setError] = useState(false)
	const [data, setData] = useState({})

	const handleSubmit = async (e) => {
		e.preventDefault();
		const request = {
			"first_name": name,
			"last_name": lastname,
			"email": email,
			"in_lite": tarif === "Lite",
			"password": password,
			"user_role": "student",
		}

		setData(request)
		console.log(data)

		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await StudentProfileStore.registerStudent(request)
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
		}
	}


	return (
		<div className="window-container">
			<div className="window">
				<h1 className="header3">Регистрация нового студента</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div>
						<label>Стартовое количество тукоинов: 100</label>
					</div>
					<div>
						<label id="namelabel" htmlFor="name">Имя</label>
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
						<label htmlFor="lastname">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Фамилия</label>
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
						<label htmlFor="password">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Пароль</label>
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

					<div>
						<label>&nbsp;&nbsp;Тариф</label>
						<input onChange={(e) => setTarif(e.target.value)} type="radio" id="tarif1" name="tarif" value="Standart"
									 checked={tarif ==="Standart"}/><label className="radio-label"
																	 htmlFor="tarif1">Standart</label>
						<input onChange={(e) => setTarif(e.target.value)} type="radio" id="tarif2" name="tarif"
									 value="Lite" checked={tarif ==="Lite"}/><label className="radio-label"
																				htmlFor="tarif2">Lite</label>
					</div>
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

export default StudentRegistration;