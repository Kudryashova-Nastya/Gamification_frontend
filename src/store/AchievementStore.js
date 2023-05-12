import {makeAutoObservable, runInAction} from "mobx";
import {CORS, getHostInformation, POSTCORS} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class AchievementStore {
	constructor() {
		makeAutoObservable(this)
	}


// 	Запрос на все ачивки
	achives = [{},{},{},{}]
	fetchAllAchives = async () => {
		const token = await Auth.getToken()
		const req = await fetch(`${host}/api/v1/achievement`, CORS(token?.access))
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.achives = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchAllAchives()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

	myAchives = [{},{},{}]
	fetchMyAchives = async (id) => {
		const token = await Auth.getToken()
		const data = {"student_id": id}
		const req = await fetch(`${host}/api/v1/achievement/student_achievement`, POSTCORS(data, token?.access))
		const res = await req.json();
		if (req.ok) {
			runInAction(() => {
				this.myAchives = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchMyAchives(id)
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}

}

export default new AchievementStore()
