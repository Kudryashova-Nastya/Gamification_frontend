import React, {useState} from "react";
import '../base.css';
import './style.css'
import {observer} from "mobx-react";

const StudentRegistration = observer(() => {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [tarif, setTarif] = useState("");

	const [isDone, setIsDone] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			"name": name,
			"lastname": lastname,
			"email": email,
			"tarif": tarif,
		}
	}


	return (
		<>
			<div className="window-container">
				<div className="window">
					<h1 className="header3">Регистрация нового студента</h1>
					<form className="form" onSubmit={handleSubmit}>
						<div>
							<label>Стартовое количество тукоинов: 10</label>
						</div>
						<div>
							<label id="namelabel" htmlFor="name">Имя</label>
							<input
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
								id="email"
								className="input"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label>Тариф</label>
							<input onChange={(e) => setTarif(e.target.value)} type="radio" id="tarif1" name="tarif" value="Standart"
										 checked/><label className="radio-label"
																		 htmlFor="tarif1">Standart</label>
							<input onChange={(e) => setTarif(e.target.value)} type="radio" id="tarif2" name="tarif"
										 value="Lite"/><label className="radio-label"
																					htmlFor="tarif2">Lite</label>
						</div>
						<button className="button" onClick={() => setIsDone(true)}>Зарегистрировать</button>
					</form>
				</div>

				{isDone ? <div>
					<div className="window">
						<h1 className="header3">Регистрация прошла успешно</h1>
						<div className="form">
							<div>
								<label>Логин: ivan.ivanov.m@tumo.world </label>
							</div>
							<div>
								<label>Пароль: rhsm11mka </label>
							</div>
						</div>
					</div>
				</div> : null}
			</div>
		</>
	);
})

export default StudentRegistration;