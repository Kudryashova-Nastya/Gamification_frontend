import {makeAutoObservable, runInAction} from "mobx";
import {
	bodyFixPosition,
	bodyUnfixPosition,
	getHostInformation,
	CORS,
} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class MarketStore {
	constructor() {
		makeAutoObservable(this)
	}

	// Модальные окна
	modalCheckVisible = false
	setCheckVisible = () => {
		runInAction(() => {
			this.modalCheckVisible = true
			bodyFixPosition()
			document.body.style.overflowY = 'scroll';
		})
	}

	goodsInfo = [{},{},{},{}]
	fetchGoodsInfo = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/store_product`, CORS(token?.access));
		const res = await req.json();
		if (req.ok) {
			console.log("market", res)
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


	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalEditVisible = false
			document.body.style.overflowY = 'auto';
		})

	}

}

export default new MarketStore()
