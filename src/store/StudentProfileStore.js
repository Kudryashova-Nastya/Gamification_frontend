import {makeAutoObservable, runInAction} from "mobx";
import {bodyFixPosition, bodyUnfixPosition, getHostInformation, CORS, PATCHCORS} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class StudentProfileStore {
	constructor() {
		makeAutoObservable(this)
	}

	// Модальные окна
	modalEditVisible = false
	setEditVisible = () => {
		runInAction(() => {
			this.modalEditVisible = true
			bodyFixPosition()
			document.body.style.overflowY = 'scroll';
		})
	}

	// Лоадер
	isLoading = true
	setLoading = (bool) => {
		runInAction(() => {
			this.isLoading = bool
		})
	}

	// информация о студенте по id либо о владельце профиля через токен
	studentInfo = {}
	isMyProfile = true
	fetchStudentInfo = async (student_id = null) => {
		this.setLoading(true)
		const token = await Auth.getToken()
		let req
		if (student_id) {
			req = await fetch(`${host}/api/v1/student/${student_id}`, CORS(token?.access));
			runInAction(() => {
				this.isMyProfile = false
			})
		} else {
			req = await fetch(`${host}/api/v1/profile`, CORS(token?.access));
			runInAction(() => {
				this.isMyProfile = true
			})
		}
		const res = await req.json();
		// console.log("ответ профиля", res);
		if (req.ok) {
			runInAction(() => {
				this.studentInfo = res
			})
		} else {
			if (res.code === "token_not_valid") {
				console.log("проблема протухшего токена обнаружена")
				Auth.getToken().then((token) => {
					if (token?.access) {
						console.log("проблема протухания решена, перезапуск запроса")
						this.fetchStudentInfo()
					} else {
						console.log("проблема протухания не решена", token)
					}
				})
			}

			// runInAction(() => {
			// 	// временный дефолтный студент
			// 	setTimeout(
			// 		() => {
			// 			this.studentInfo = {
			// 				"email": "ivan.ivanov.m@tumo.world",
			// 				"first_name": "Иван",
			// 				"last_name": "Иваненков",
			// 				"image": "/uploads/users/6ee89e1216724ab9ba1e14775fd1b7d1.jpg",
			// 				"telegram": "/ivan_ivanovvv",
			// 				"balance": 125,
			// 				"portfolio_link": null,
			// 				"directions": [
			// 					{
			// 						"name": "aaaaaa",
			// 						"link": "aaaaaaaaaa"
			// 					}
			// 				],
			// 				"about": "Привет! Я Ваня, мне 13 лет. Люблю играть в майнкрафт, кто тоже любит, го на мой сервер: Gamer123"
			// 			}
			// 		}, 3000)
			//
			// })
		}

		this.setLoading(false)
	}

	editProfile = async (data) => {

		if (!data) {
			return null
		}
		// console.log(LOGIN_CORS)
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/profile/`, PATCHCORS(data, token?.access))
		const res = await req.json()
		console.log('edit res', res)
		if (req?.ok && req?.status === 200) {
			return false // возвращает false в случае успеха
		} else {
			return res // возвращает текст ошибки в случае ошибки
		}
	};

	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalEditVisible = false
			// this.modalNoBalanceVisible = false
			document.body.style.overflowY = 'auto';
		})

	}

}

export default new StudentProfileStore()
