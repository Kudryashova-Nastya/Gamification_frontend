import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import QuestStore from "../../store/QuestStore";
import ERROR from "../../images/icons/error.svg";
import SearchSelect from "../SearchSelect/SearchSelect";
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Auth from "../../store/helper/Auth";

export const RewardQuest = observer(({data, setCurrentTab}) => {

	const [recipient, setRecipient] = useState({})
	const [error, setError] = useState(null)
	const [students, setStudents] = useState([])

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/short_student`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.code === "token_not_valid") {
					fetchData()
				} else {
					setStudents(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
			})
		}

		void fetchData()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!recipient?.id) {
			setCurrentTab('close')
			return false
		}

		const request = {
			"is_active": false,
			"student_id": recipient.id
		}

		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await QuestStore.editQuest(request, data.id)
		if (log) {
			setError(log)
			console.log("косяк", log)
		} else {
			setError(false)
			void QuestStore.fetchEmployeeQuests()
			QuestStore.closeModal()
		}
	}

	return (
		<>
			<div className="header3">Наградить студента</div>
			<form className="form quest-form" onSubmit={handleSubmit}>
				<div>
					<label className="top-label">Задание выполнил(а)</label>
				</div>
				<div className="search-select">
					<SearchSelect allArr={students} setRecipient={setRecipient} defaultOpen={true}/>
				</div>
				<div className="two-buttons">
					<button type="submit" className="button">Наградить</button>
					<button onClick={()=> setCurrentTab('close')} className="button">Закрыть</button>
				</div>
			</form>
			{error &&
				<div className="error-message">
					<div><img src={ERROR} alt="error"/></div>
					<div>{error}</div>
				</div>
			}
		</>
	)
})