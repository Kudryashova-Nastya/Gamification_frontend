import React, {useEffect, useRef, useState} from "react";
import '../base.css';
import './style.css';
import {observer} from "mobx-react";
import BACK from "../../images/icons/back.svg";
import TUCOIN from "../../images/icons/black-tucoin45.svg";
import ERROR from "../../images/icons/error.svg";
import {useNavigate, useParams} from "react-router-dom";
import SearchSelect from "../SearchSelect/SearchSelect";
import TransactionPageStore from "../../store/TransactionPageStore";
import {CheckModalWindow} from "./CheckModalWindow/CheckModalWindow";
import DoneBlock from "./DoneBlock/DoneBlock";
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Auth from "../../store/helper/Auth";
import {CSSTransition} from "react-transition-group";

const TransactionPage = observer(() => {
	const history = useNavigate()
	const {id} = useParams()
	const nodeRef = useRef(null)

	const [data, setData] = useState({})
	const [error, setError] = useState(false)
	const [recipient, setRecipient] = useState({})
	const [names, setNames] = useState([])
	const [isDone, setIsDone] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target
		setData({
			"to_id": recipient,
			"sum_count": parseInt(form.number.value),
			"comment": form.comment.value,
		})
		TransactionPageStore.setModalVisible()
	}

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/short_student`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.code === "token_not_valid") {
					console.log("проблема протухшего токена в селекторе студентов, перезапуск запроса")
					fetchData()
				} else {
					setNames(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
			})
		}

		void fetchData()
	}, [])

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
						{error &&
							<div className="error-message">
								<div><img src={ERROR} alt="error"/></div>
								<div>{error}</div>
							</div>
						}
						<label>Мой счёт</label>
						<div className="mybalance">{Auth.profileInfo.balance} <img src={TUCOIN} width="39" alt="тукоин"/></div>
						<label>Кому перевести</label><br/>
						<SearchSelect allArr={names} setRecipient={setRecipient} id={id}/>
						<label>Cумма перевода</label><br/>
						<input required placeholder="Введите сумму перевода" type="number" className="datalist" min="1"
									 step="1" maxLength="4" name="number"/>
						<label>Сообщение получателю</label><br/>
						<textarea rows="3" required name="comment" maxLength="100" className="datalist"
											placeholder="Введите сообщение"/>
						<div className="button-block">
							<button className="button btn-large">Перевести</button>
						</div>
					</form>
					<CSSTransition
						in={TransactionPageStore.modalVisible}
						timeout={300}
						classNames="alert"
						unmountOnExit
						nodeRef={nodeRef}
					>
						<CheckModalWindow ref={nodeRef} data={data} setIsDone={setIsDone} setError={setError}/>
					</CSSTransition>
				</div>
			}
		</>
	);
});

export default TransactionPage;