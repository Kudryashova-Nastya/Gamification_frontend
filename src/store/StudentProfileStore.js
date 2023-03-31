import {makeAutoObservable, runInAction} from "mobx";
import {bodyFixPosition, bodyUnfixPosition, getHostInformation, POSTCORS} from "./helper/Helper";

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

	// modalNoBalanceVisible = false
	// setNoBalanceVisible = () => {
	//     runInAction(() => {
	//         this.modalNoBalanceVisible = true
	//         document.body.style.overflow = 'hidden';
	//     })
	// }
	//
	// bookDelete = ''
	//
	// modalDeletePositionVisible = false
	// setDeletePositionVisible = (name) => {
	//     runInAction(() => {
	//         this.bookDelete = name
	//         this.modalDeletePositionVisible = true
	//         document.body.style.overflow = 'hidden';
	//     })
	// }
	//
	// modalClearCartVisible = false
	// setClearCartVisible = () => {
	//     runInAction(() => {
	//         this.modalClearCartVisible = true
	//         document.body.style.overflow = 'hidden';
	//     })
	// }

	closeModal = () => {
		bodyUnfixPosition()
		runInAction(() => {
			this.modalEditVisible = false
			this.modalNoBalanceVisible = false
			this.modalDeletePositionVisible = false
			this.modalClearCartVisible = false
			this.bookDelete = ''
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

export default new StudentProfileStore()
