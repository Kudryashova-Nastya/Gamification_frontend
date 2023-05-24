import {makeAutoObservable, runInAction} from "mobx";
import {
	bodyFixPosition,
	bodyUnfixPosition,
	getHostInformation,
	CORS, POSTCORS, PATCHCORS
} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class QuestStore {
	constructor() {
		makeAutoObservable(this)
	}

	// Модальные окна
	modalQuestVisible = false
	currentQuest = {}
	setQuestVisible = (el) => {
		runInAction(() => {
			this.currentQuest = el
			this.modalQuestVisible = true
		})
		bodyFixPosition()
	}

	employeeQuestVisible = false
	setEmployeeQuestVisible = (el) => {
		runInAction(() => {
			this.currentQuest = el
			this.employeeQuestVisible = true
		})
		bodyFixPosition()
	}

	modalNewQuestVisible = false
	setNewQuestVisible = () => {
		runInAction(() => {
			this.modalNewQuestVisible = true
		})
		bodyFixPosition()
	}

	// modalEditVisible = false
	// setEditVisible = (el) => {
	// 	runInAction(() => {
	// 		this.currentMyBuy = el
	// 		this.modalEditVisible = true
	// 	})
	// 	bodyFixPosition()
	// }


	quests = [{}, {}, {}, {}, {}]
	fetchActiveQuests = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/quest/all_is_active_quest`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.quests = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchActiveQuests()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	questTypes = [{}, {}, {}, {}, {}]
	fetchQuestTypes = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/quest_type`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.questTypes = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchActiveQuests()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}


	myQuests = [{}, {}, {}]
	fetchStudentQuests = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/quest/student_quest/`, POSTCORS({"student_id": Auth.profileInfo.id}, token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.myQuests = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchStudentQuests()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	fetchEmployeeQuests = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/quest/employee_quest/`, POSTCORS({"employee_id": Auth.profileInfo.id}, token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.myQuests = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchEmployeeQuests()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}


	createQuest = async (data) => {
		if (!data) {
			return "нет данных для запроса"
		}
		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/quest/`, POSTCORS(data, token?.access))
			const res = await req.json() || {detail: "проблема сервера"}
			if (req?.ok && req?.status === 201) {
				return false // возвращает false в случае успеха
			} else {
				if (res.code === "token_not_valid") {
					Auth.getToken().then((token) => {
						if (token?.access) {
							return this.createQuest(data)
						}
					})
				}
				console.log("error", JSON.stringify(res))
				return res.detail || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
			}
		} catch {
			return "Что-то пошло не так, попробуйте повторить запрос позже"
		}
	}

	editQuest = async (data, id) => {
		if (!data || !id) {
			return "нет данных для запроса"
		}
		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/quest/${id}/`, PATCHCORS(data, token?.access))
			const res = await req.json() || {detail: "проблема сервера"}
			if (req?.ok) {
				return false // возвращает false в случае успеха
			} else {
				if (res.code === "token_not_valid") {
					Auth.getToken().then((token) => {
						if (token?.access) {
							return this.editQuest(data)
						}
					})
				}
				console.log("error", JSON.stringify(res))
				return res.detail || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
			}
		} catch {
			return "Что-то пошло не так, попробуйте повторить запрос позже"
		}
	}

	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalQuestVisible = false
			this.modalNewQuestVisible = false
			this.employeeQuestVisible = false
		})
	}

}

export default new QuestStore()