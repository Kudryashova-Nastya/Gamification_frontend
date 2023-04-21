import {makeAutoObservable, runInAction} from "mobx";
import {bodyFixPosition, bodyUnfixPosition, getHostInformation, POSTCORS} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class TransactionPageStore {
	constructor() {
		makeAutoObservable(this)
	}


	// Модальные окна
	modalVisible = false
	setModalVisible = () => {
		runInAction(() => {
			this.modalVisible = true
			bodyFixPosition()
			document.body.style.overflowY = 'scroll';
		})
	}

	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalVisible = false
			document.body.style.overflowY = 'auto';
		})

	}

// 	Запрос на перевод
	makeTransaction = async (data) => {
		if (!data) {
			return null
		}
		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/transaction/transfer/`, POSTCORS(data, token?.access))
			const res = await req.json() || {detail: "проблема сервера"}
			if (req?.ok && req?.status === 201) {
				return false // возвращает false в случае успеха
			} else {
				if (res.code === "token_not_valid") {
					console.log("проблема протухшего токена обнаружена")
					Auth.getToken().then((token) => {
						if (token?.access) {
							console.log("проблема протухания решена, перезапуск запроса")
							return this.makeTransaction(data)
						} else {
							console.log("проблема протухания не решена", token)
						}
					})
				}
				console.log("error", JSON.stringify(req))
				return res.detail || JSON.stringify(res) // возвращает текст ошибки в случае ошибки
			}
		} catch {
			return "Что-то пошло не так, попробуйте повторить запрос позже"
		}
	}

}

export default new TransactionPageStore()
