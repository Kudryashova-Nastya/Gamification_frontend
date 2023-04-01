import React from "react";
import '../base.css';
import './style.css';
import {observer} from "mobx-react";
import BACK from "../../images/icons/back.svg";
import TUCOIN from "../../images/icons/black-tucoin45.svg";
import {useNavigate} from "react-router-dom";
import SearchSelect from "../SearchSelect/SearchSelect";

const TransactionPage = observer(() => {
	const history = useNavigate()
	const names = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
		"Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
		"Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
		"Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
		"Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
		"Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"]
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target
		const data = {
			"to": form.to.value,
			"number": parseInt(form.number.value),
			"comment": form.comment.value,
		}
		console.log(data)
	}

	return (
		<div className="container">
			<div className="header-block">
				<h1 className="header1"><img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>
					Мои ачивки</h1>
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
									placeholder="Введите сообщение"></textarea>
				<div className="button-block">
					<button className="button">Перевести</button>
				</div>
			</form>
		</div>
	);
});

export default TransactionPage;