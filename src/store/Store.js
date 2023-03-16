import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, POSTCORS} from "./helper/Helper";

const host = getHostInformation()

class Store {
    constructor() {
        makeAutoObservable(this)
    }



    // Модальные окна

    modalBuyVisible = false
    setBuyVisible = () => {
        runInAction(() => {
            this.modalBuyVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    modalNoBalanceVisible = false
    setNoBalanceVisible = () => {
        runInAction(() => {
            this.modalNoBalanceVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    bookDelete = ''

    modalDeletePositionVisible = false
    setDeletePositionVisible = (name) => {
        runInAction(() => {
            this.bookDelete = name
            this.modalDeletePositionVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    modalClearCartVisible = false
    setClearCartVisible = () => {
        runInAction(() => {
            this.modalClearCartVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    closeModal = () => {
        runInAction(() => {
            this.modalBuyVisible = false
            this.modalNoBalanceVisible = false
            this.modalDeletePositionVisible = false
            this.modalClearCartVisible = false
            this.bookDelete = ''
            document.body.style.overflow = 'unset';
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

export default new Store()
