import React, {useState} from 'react';
import {observer} from 'mobx-react';
import QuestStore from "../../store/QuestStore";
import Select from "../SearchSelect/Select";
import ERROR from "../../images/icons/error.svg";

export const EditQuest = observer(({data, setCurrentTab}) => {
	const [name, setName] = useState(data.name)
	const [description, setDescription] = useState(data.description)
	const [sum, setSum] = useState(data.sum)
	const [type, setType] = useState(QuestStore.questTypes.find(type => type.id === data.type) || null)

	const [error, setError] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!type?.id) {
			setError('Выберите тип задания')
			return false
		}
		if (sum > type.max_sum || sum < type.min_sum) {
			setError('Сумма вознаграждения выходит за пределы диапазона')
			return false
		}

		const request = {
			"name": name,
			"description": description,
			"type": type.id,
			"sum": sum
		}


		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await QuestStore.editQuest(request, data.id)
		if (log) {
			setError(log)
			console.log("косяк", log)
		} else {
			setError(false)
			await QuestStore.fetchQuestById(data.id)
			void QuestStore.fetchEmployeeQuests()
			setCurrentTab('detail')
		}
	}

	return (
		<>
			<div className="header3">Редактирование задание</div>
			<form className="form quest-form" onSubmit={handleSubmit}>
				<div className="inputs-block input-container">
					<div>
						<label htmlFor="name">Название</label>
						<input
							required
							id="name"
							className="input"
							name="name"
							type="text"
							value={name}
							maxLength="60"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Описание</label>
						<textarea
							rows="5"
							required
							id="description"
							className="quest-textarea"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label>Тип задания</label>
						<div className="input-container select-container">
							<Select allArr={QuestStore.questTypes} setElement={setType} defaultText={"Выберите тип"} defaultValue={type}/>
							<input type="text" name="select" value={type?.id || ''} onChange={()=>{}} required className="hidden-select"/>
						</div>
					</div>
					<div>
						<label htmlFor="sum">Вознаграждение</label>
						<input
							required
							id="sum"
							className="input"
							name="sum"
							type="number"
							value={sum}
							min={type?.min_sum || 1}
							max={type?.max_sum || 500}
							placeholder={type?.min_sum ? `от ${type.min_sum} до ${type.max_sum}` : 'Сначала выберите тип'}
							step="1"
							disabled={!type?.min_sum}
							onChange={(e) => setSum(e.target.value)}
						/>
					</div>
				</div>
				<div className="button-block">
					<button type="submit" className="button btn-large">Сохранить</button>
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