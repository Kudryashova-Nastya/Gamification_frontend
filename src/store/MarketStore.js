import {makeAutoObservable, runInAction} from "mobx";
import {
	bodyFixPosition,
	bodyUnfixPosition,
	getHostInformation,
	CORS, POSTCORS, PATCHCORS
} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class MarketStore {
	constructor() {
		makeAutoObservable(this)
	}

	// Модальные окна
	modalBuyVisible = false
	currentBuy = {}
	setBuyVisible = (el) => {
		runInAction(() => {
			this.currentBuy = el
			this.modalBuyVisible = true
			// document.body.style.overflowY = 'scroll';
		})
		bodyFixPosition()
	}

	modalEditVisible = false
	setEditVisible = (el) => {
		runInAction(() => {
			this.currentMyBuy = el
			this.modalEditVisible = true
		})
		bodyFixPosition()
	}

	modalGiveMerchVisible = false
	setModalGiveMerchVisible = (el) => {
		runInAction(() => {
			this.currentMyBuy = el
			this.modalGiveMerchVisible = true
		})
		bodyFixPosition()
	}

	goodsInfo = [{},{},{},{}]
	fetchAllGoodsInfo = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/store_product`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.goodsInfo = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchAllGoodsInfo()
					} else {
						console.log("проблема протухания не решена", token)
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	fetchEnableGoodsInfo = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/store_product/opportunity_student_buy`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.goodsInfo = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchEnableGoodsInfo()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	myBuys = [{},{}]
	fetchMyBuys = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/store_product/all_student_product/`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.myBuys = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchMyBuys()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	merchToGive = [{},{}]
	fetchMerchToGive = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/store/all_non_issued_items`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.merchToGive = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchMerchToGive()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	buy = async (data) => {
		if (!data) {
			return "нет данных для запроса"
		}
		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/store/market_shop`, POSTCORS(data, token?.access))
			const res = await req.json() || {detail: "проблема сервера"}
			if (req?.ok && req?.status === 201) {
				return false // возвращает false в случае успеха
			} else {
				if (res.code === "token_not_valid") {
					Auth.getToken().then((token) => {
						if (token?.access) {
							return this.buy(data)
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

	giveMerch = async (id) => {
		if (!id) {
			return "нет данных для запроса"
		}
		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/store_history/${id}/`, PATCHCORS({"status": true}, token?.access))
			const res = await req.json() || {detail: "проблема сервера"}
			if (req?.ok) {
				return false // возвращает false в случае успеха
			} else {
				if (res.code === "token_not_valid") {
					Auth.getToken().then((token) => {
						if (token?.access) {
							return this.giveMerch(id)
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
			this.modalBuyVisible = false
			this.modalEditVisible = false
			this.modalGiveMerchVisible = false
		})

	}

}

export default new MarketStore()
