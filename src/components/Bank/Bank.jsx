import React, {useEffect, useState} from 'react';
import BIGTUCOIN from "../../images/icons/black-tucoin45.svg";
import "./style.css"
import '../base.css';
import {CORS, getHostInformation, POSTCORS} from "../../store/helper/Helper";
import 'react-loading-skeleton/dist/skeleton.css'
import Auth from "../../store/helper/Auth";
import Pagination from "../Pagination/Pagination";
import {useNavigate} from "react-router-dom";
import SEND from "../../images/icons/send.svg";
import Transaction from "../Transaction/Transaction";
import {observer} from "mobx-react";

const Bank = observer(() => {
	const history = useNavigate()

	const [transactions, setTransactions] = useState([
		{}, {}, {}, {}, {}
	])
	const [allTucoins, setAllTucoins] = useState("???")

	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 5

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/bank/all_money_in_app`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.code === "token_not_valid") {
					return fetchData()
				} else {
					setAllTucoins(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
			})

			await fetch(`${host}/api/v1/transaction/all_transfers/`, POSTCORS({"transfer_type": "transfer"}, token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.code === "token_not_valid") {
					return fetchData()
				} else {
					setTransactions(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [
					{}, {}, {}, {}, {}
				]
				setTransactions(data)
			})
		}

		void fetchData()
	}, [])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(transactions.length / postsPerPage)
	const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div className="container">
			<div className="header-block main-header">
				<h1 className="header1">TUCOIN Банк</h1>
				<button onClick={() => history("/student/send")} className="button button-send">Перевести <img
					className="send button-icon" alt="перевод" src={SEND}/></button>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="bank-value-container">
				<div className="bank-value">
					<span className="balance-icon">{allTucoins}</span> <img className="balance-icon" src={BIGTUCOIN} alt="tucoin"/>
					<span className="bank-sub">в системе</span>
				</div>
			</div>
			<div className="transactions-container">
				<div className="transactions-header">Последняя активность</div>
				{currentPosts?.map((el, i) =>
					<Transaction el={el} key={i}/>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
		</div>
	);
});

export default Bank;