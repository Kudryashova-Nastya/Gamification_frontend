import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, CORS} from "./Helper";

const host = getHostInformation()

class Auth {
	constructor() {
		makeAutoObservable(this)
	}

	// вид токена {
	//         "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc5MzA1MzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiJ1c2VyIn0.EqQXxk0DKon1xisVXOmqr69Xte6UkgoI1n2xCEM1MZw",
	//         "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgwMTUxMzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJyZWZyZXNoX3Rva2VuIiwic3ViIjoidXNlciJ9.Db62JMi1qnY48NLgD_VIN84Awf25hh0My-KcKCl3QoE",
	//     }
	token = JSON.parse(localStorage.getItem("TOKEN_AUTH")) || null
	role = null

	login = async (data) => {
		console.log(data)

		if (!data) {
			return null
		}
		const LOGIN_CORS = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
		}
		console.log(LOGIN_CORS)

		const req = await fetch(`${host}/login`, LOGIN_CORS)
		const res = await req.json()
		if (req.ok && res?.status_code === 201) {
			this.setToken(res.detail)
			console.log(res)
			return false // возвращает false в случае успешной авторизации
		} else {
			return JSON.stringify(res.detail) // возвращает текст ошибки в случае ошибки авторизации
		}
	};

	logout = () => {
		this.setToken(null)
	};

	// узнать дату окончания жизни токена
	getExpirationDate = (jwtToken = null) => {
		if (jwtToken === null) {
			return null
		}

		const jwt = JSON.parse(atob(jwtToken.split(".")[1]))
		return jwt.exp * 1000 || null
	};

	// узнать просрочен ли токен
	isExpired = (exp) => {
		return Date.now() > exp
	};

	getToken = async () => {
		if (!this.token) {
			return null
		}

		// проверка не протух ли аксес-токен
		if (this.isExpired(this.getExpirationDate(this.token.access))) {
			const updatedToken = await fetch(`${host}/refresh`, CORS(this.token?.refresh)).then(
				(r) => r.json()
			);

			if (updatedToken.access) {
				this.setToken(updatedToken)
			} else {
				this.setToken(null)
			}
		}

		return this.token
	}

	setToken = (token) => {
		if (token) {
			localStorage.setItem("TOKEN_AUTH", JSON.stringify(token))
		} else {
			localStorage.removeItem("TOKEN_AUTH")
		}
		runInAction(() => {
			this.token = token
		})
		console.log("обновление токена", this.token)
	}

	getRole = async () => {
		if (!this.role) {
			const usersInfoReq = await fetch(`${host}/profile`, CORS(this.token?.access))
			const usersInfoRes = await usersInfoReq.json()
			if (usersInfoReq.ok && usersInfoRes?.status_code === 200) {
			runInAction(() => {
				this.role = usersInfoReq.role
			})}
		}

		return this.role
	}
}

export default new Auth();
