import React, {useState} from 'react';
import {observer} from 'mobx-react';
import QuestStore from "../../store/QuestStore";
import ERROR from "../../images/icons/error.svg";
export const CloseQuest = observer(({data, setCurrentTab}) => {

	const [error, setError] = useState(false)

	const closeTask = async () => {
		const request = {
			"is_active": false
		}

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
			<div className="header3">Подтверждение</div>
				<div className="close-quest-check">
					Вы уверены, что хотите закрыть задачу без награждения студента?
					После закрытия задача станет неактивной, и вновь открыть её будет нельзя
				</div>
				<div className="two-buttons two-small-buttons">
					<button onClick={() => setCurrentTab('detail')} className="button">Отмена</button>
					<button onClick={() => closeTask()} className="button">Закрыть</button>
				</div>
			{error &&
				<div className="error-message">
					<div><img src={ERROR} alt="error"/></div>
					<div>{error}</div>
				</div>
			}
		</>
	)
})