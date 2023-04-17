import React, {useState} from "react";
import '../base.css';
import './style.css';
import {observer} from "mobx-react";
import BACK from "../../images/icons/back.svg";
import TUCOIN from "../../images/icons/black-tucoin45.svg";
import {useNavigate} from "react-router-dom";
import SearchSelect from "../SearchSelect/SearchSelect";
import TransactionPageStore from "../../store/TransactionPageStore";
import {CheckModalWindow} from "./CheckModalWindow/CheckModalWindow";
import DoneBlock from "./DoneBlock/DoneBlock";

const TransactionPage = observer(() => {
	const history = useNavigate()
	const names = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
		"Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
		"Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
		"Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
		"Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
		"Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"]
	const [data, setData] = useState({})
	const [isDone, setIsDone] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target
		setData({
			// "to": form.to.value,
			"number": parseInt(form.number.value),
			"comment": form.comment.value,
		})
		TransactionPageStore.setModalVisible()
	}

	return (
		<>
			{isDone ? <DoneBlock data={data}/> :
				<div className="container">
				<div className="header-block main-header">
				<h1 className="header1"><img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>
				Перевод</h1>
				</div>
				<hr color="#CCCCCC" size="4"/>
				<form className="send-container" onSubmit={handleSubmit}>
				<label>Мой счёт</label>
				<div className="mybalance">125 <img src={TUCOIN} width="39" alt="тукоин"/></div>
				<label>Кому перевести</label><br/>
				<SearchSelect props={names}/>
				<label>Cумма перевода</label><br/>
				<input required placeholder="Введите сумму перевода" type="number" className="datalist" min="1"
				step="1" maxLength="4" name="number"/>
				<label>Сообщение получателю</label><br/>
				<textarea rows="4" required name="comment" maxLength="150" className="datalist"
				placeholder="Введите сообщение"/>
				<div className="button-block">
				<button className="button btn-large">Перевести</button>
				</div>
				</form>
			{TransactionPageStore.modalVisible ? <CheckModalWindow data={data} setIsDone={setIsDone}/> : null}
				</div>
			}
		</>
	);
});

export default TransactionPage;