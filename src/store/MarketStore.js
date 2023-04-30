import {makeAutoObservable, runInAction} from "mobx";
import {
	bodyFixPosition,
	bodyUnfixPosition,
	getHostInformation,
	CORS, POSTCORS,
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

	goodsInfo = [{},{},{},{}]
	fetchGoodsInfo = async () => {
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
						this.fetchGoodsInfo()
					} else {
						console.log("проблема протухания не решена", token)
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	myBuys = []
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

	buy = async (data) => {
		if (!data) {
			return null
		}

		try {
			const token = await Auth.getToken()
			const req = await fetch(`${host}/api/v1/store/market_shop/`, POSTCORS(data, token?.access))
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
				console.log("error", JSON.stringify(req))
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
			// this.currentBuy = {}
			// document.body.style.overflowY = 'auto';
		})

	}

}

export default new MarketStore()
