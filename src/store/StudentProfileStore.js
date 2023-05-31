import {makeAutoObservable, runInAction} from "mobx";
import {
	bodyFixPosition,
	bodyUnfixPosition,
	getHostInformation,
	CORS,
	PATCHCORS,
	PATCHIMAGECORS,
	POSTCORS
} from "./helper/Helper";
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
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchStudentInfo()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
		this.setLoading(false)
	}

	// Запрос на редактирование общей информации профиля
	editProfile = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/profile/`, PATCHCORS(data, token?.access))
		const res = await req.json() || {detail: "проблема сервера"}
		if (req?.ok && req?.status === 200) {
			return false // возвращает false в случае успеха
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						return this.editProfile(data)
					} else {
					}
				})
			}
			console.log("error", JSON.stringify(res))
			return res.detail || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
		}
	}

	editProfileImage = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/profile/`, PATCHIMAGECORS(data, token?.access))
		const res = await req.json()
		if (req?.ok && req?.status === 200) {
			return false // возвращает false в случае успеха
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						return this.editProfileImage(data)
					}
				})
			}
			return res // возвращает текст ошибки в случае ошибки
		}
	}

	registerStudent = async (data) => {
		if (!data) {
			return "Ничего не передано"
		}
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/student/`, POSTCORS(data, token?.access))
		const res = await req.json()
		// console.log("res", res)
		if (req?.ok && req?.status === 201) {
			return false // возвращает false в случае успеха
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						return this.registerStudent(data)
					}
				})
			}
			return res.detail || res.email || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
		}
	}

	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalEditVisible = false
			document.body.style.overflowY = 'auto';
		})

	}

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StudentProfileStore()
