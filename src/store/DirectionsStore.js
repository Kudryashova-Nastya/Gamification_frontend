import {makeAutoObservable, runInAction} from "mobx";
import {CORS, getHostInformation} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class DirectionsStore {
	constructor() {
		makeAutoObservable(this)
	}


// 	Запрос на все направления
	directions = [
		{
			"name": "Анимация",
			"id": 1
		},
		{
			"name": "Робототехника",
			"id": 2
		},
		{
			"name": "Музыка",
			"id": 3
		},
		{
			"name": "3D-моделирование",
			"id": 4
		},
		{
			"name": "Графический дизайн",
			"id": 5
		},
		{
			"name": "Разработка игр",
			"id": 6
		},
		{
			"name": "Кинопроизводство",
			"id": 7
		},
		{
			"name": "Программирование",
			"id": 8
		}
	]
	fetchDirections = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/direction`, CORS(token?.access))
		const res = await req.json()
		if (req.ok) {
			runInAction(() => {
				this.directions = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchDirections()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DirectionsStore()
