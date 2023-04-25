import React, {useState} from "react";
import '../base.css';
import './style.css'
import Auth from "../../store/helper/Auth";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import ERROR from "../../images/icons/error.svg";

const Login = observer(() => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false)
	const history = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			"email": email,
			"password": password
		}
		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await Auth.login(data)
		if (log) {
			// setAuthErrors(await Auth.login(data))
			setError(log)
			console.log("косяк", log)
		} else {
			setError(false)
			const role = await Auth.getRole()
			console.log("успех", role)
			switch (role) {
				case "student":
					history("/student")
					break;
				case "manager":
					history("/manager")
					break;
				case "main-admin":
					history("/main-admin")
					break;
				case "curator":
					history("/curator")
					break;
				case "couch":
					history("/couch")
					break;
				default:
					alert("Ты кто?")
			}
		}
	};

	return (
		<div className="window-container">
			<div className="window">
				<h1 className="header3">Авторизация</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="login">&nbsp;&nbsp;&nbsp;&nbsp;Email</label>
						<input className="input" name="email" type="email" value={email} required
							onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="password">Пароль</label>
						<input className="input" name="password" type="password" value={password} required
							onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<button className="button">Войти</button>
				</form>
			</div>
			{error &&
				<div className="error-message">
					<div><img src={ERROR} alt="error"/></div>
					<div>{error}</div>
				</div>
			}
		</div>
	);
})

export default Login;