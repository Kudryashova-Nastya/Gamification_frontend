import React, {useEffect, useState} from "react";
import '../../base.css';
import '../style.css'
import TUCOIN from '../../../images/icons/black-tucoin16.svg'
import ARROWTO from '../../../images/icons/arrow-to.svg'
import ARROWFROM from '../../../images/icons/arrow-from.svg'
import {getHostInformation, POSTCORS} from "../../../store/helper/Helper";
import Auth from "../../../store/helper/Auth";
import {observer} from "mobx-react";
import Pagination from "../../Pagination/Pagination";
import Skeleton from "react-loading-skeleton";
import StudentProfileStore from "../../../store/StudentProfileStore";

const StudentTransactions = observer(({id}) => {

	// для отображения даты и времени транзакции
	let options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric'
	}

	const [transactions, setTransactions] = useState([
		{}, {}, {}, {}
	])

	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 4


	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			console.log("id", id)
			await fetch(`${host}/api/v1/transaction/all_student_transfer/`, POSTCORS({"student_id": StudentProfileStore.studentInfo.id}, token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.ok) {
					setTransactions(data)
				} else if (data.code === "token_not_valid") {
					return fetchData()
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [
					{}, {}
				]
				setTransactions(data)
			})
		}

		if (id) {
			void fetchData()
		}

	}, [id])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(transactions.length / postsPerPage)
	const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<>
			{/*<div className="transaction-block">*/}
			{currentPosts?.map((el, i) => {
				if (el.transfer_type === "transfer") { // если тип транзакции это перевод
					if (el.sender?.id === id) { // если текущий пользователь отправитель
						return <div key={i} className="transaction-block">
							<div className="datetime">{(new Date(el.date_time)).toLocaleString("ru-RU", options) || ""}</div>
							<div className="transaction">
								<div className="groups">
									<div className="ico"><img alt="arrow" src={ARROWTO}/></div>
									<div className="member">{el.recipient?.first_name ||
										<Skeleton width={105}/>} {el.recipient?.last_name}</div>
								</div>
								<div className="groups info">
									<div className="count">
										<span className="balance-icon">-{el.sum_count || <Skeleton width={25}/>} </span>
										{el.sum_count && <img className="balance-icon" alt="tucoin" src={TUCOIN}/>}
									</div>
									<div className="message">{el.comment || <Skeleton width={90}/>}</div>
								</div>
							</div>
						</div>
					} else if (el.recipient?.id === id) {// если текущий пользователь получатель
						return <div key={i} className="transaction-block">
							<div className="datetime">{(new Date(el.date_time)).toLocaleString("ru-RU", options) || ""}</div>
							<div className="transaction">
								<div className="groups">
									<div className="ico"><img alt="arrow" src={ARROWFROM}/></div>
									<div className="member sender">{el.sender?.first_name ||
										<Skeleton width={105}/>} {el.sender?.last_name}</div>

								</div>
								<div className="groups info">
									<div className="count">
										<span className="balance-icon">+{el.sum_count || <Skeleton width={25}/>} </span>
										{el.sum_count && <img className="balance-icon" alt="tucoin" src={TUCOIN}/>}
									</div>
									<div className="message">{el.comment || <Skeleton width={90}/>}</div>
								</div>
							</div>
						</div>
					}
				} else {
					// иначе блок скелетона
					return <div key={i} className="transaction-block">
						<div className="transaction">
							<div className="groups">
								<div className="member sender">
									<Skeleton width={120}/></div>
							</div>
							<div className="groups info">
								<div className="count">
									<span className="balance-icon"><Skeleton width={25}/> </span>
								</div>
								<div className="message"><Skeleton width={90}/></div>
							</div>
						</div>
					</div>
				}
			})}

			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
									thereIsNothingPhrase="Пользователь пока не совершил ни одной операции"/>
		</>
	);
});

export default StudentTransactions;