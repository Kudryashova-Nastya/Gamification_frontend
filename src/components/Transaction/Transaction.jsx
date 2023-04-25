import React from "react";
import '../base.css';
import './Transaction.css'
import TUCOIN from '../../images/icons/black-tucoin16.svg'
import ARROWTO from '../../images/icons/arrow-to.svg'
import Skeleton from "react-loading-skeleton";

const Transaction = ({el}) => {
	let options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric'
	}
	let datetime = new Date(el.date_time)


	// const date = new Date();
	// const minutes = date.getMinutes().toString().padStart(2, '0');
	// const seconds = date.getSeconds().toString().padStart(2, '0');
	// const day = date.getDate().toString().padStart(2, '0');
	// const monthIndex = date.getMonth();
	// const month = new Intl.DateTimeFormat('ru', { month: 'short' }).format(date);
	// const year = date.getFullYear();
	// const formattedDate = `${minutes}:${seconds} ${day} ${month} ${year}`;
	// console.log(formattedDate); // "мм:сс дд месяц гггг"

	return (
		<div className="transaction-block">
			<div className="datetime">{datetime.toLocaleString("ru-RU", options) || ""}</div>
			<div className="transaction">
				<div className="groups">
					<div className="member sender">{el.from_id?.first_name || <Skeleton width={105}/>} {el.from_id?.last_name}</div>
					<div className="ico"><img alt="arrow" src={ARROWTO}/></div>
					<div className="member">{el.to_id?.first_name || <Skeleton width={105}/>} {el.to_id?.last_name}</div>
				</div>
				<div className="groups info">
					<div className="count">
						<span className="balance-icon">{el.sum_count || <Skeleton width={25}/>} </span>
						{el.sum_count && <img className="balance-icon" alt="tucoin" src={TUCOIN}/>}
					</div>
					<div className="message">{el.comment || <Skeleton width={90}/>}</div>
				</div>
			</div>
		</div>
	);
};

export default Transaction;