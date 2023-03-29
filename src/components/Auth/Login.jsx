import React, {useState} from "react";
import '../base.css';
import './style.css'
import Auth from "../../store/helper/Auth";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const Login = observer(() => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			"email": email,
			"password": password
		}
		const log = await Auth.login(data)
		if (log) {
			// setAuthErrors(await Auth.login(data))
			console.log("косяк", log)
		} else {
			console.log("успех", log)
			const role = Auth.getRole()
			// switch (role) {
			// 	case "student":
			// 		history("/student")
			// 		break;
			// 	case "manager":
			// 		history("/manager")
			// 		break;
			// 	case "main-admin":
			// 		history("/main-admin")
			// 		break;
			// 	case "curator":
			// 		history("/curator")
			// 		break;
			// 	case "couch":
			// 		history("/couch")
			// 		break;
			// 	default:
			// 		alert("Ты кто?")
			// }
		}
	};

	return (
		<div className="window-container">
			<div className="window">
				<h1 className="header3">Авторизация</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="login">&nbsp;&nbsp;&nbsp;&nbsp;Email</label>
						<input
							className="input"
							name="email"
							type="email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Пароль</label>
						<input
							className="input"
							name="password"
							type="password"
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="button">Войти</button>
				</form>
			</div>
		</div>
	);
})

export default Login;