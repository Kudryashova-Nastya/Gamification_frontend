import {makeAutoObservable, runInAction} from "mobx";
import {bodyFixPosition, bodyUnfixPosition, getHostInformation, POSTCORS} from "./helper/Helper";

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

	// Лоадер

	isLoading = true
	setLoading = (bool) => {
		runInAction(() => {
			this.isLoading = bool
		})
	}

}

export default new TransactionPageStore()
