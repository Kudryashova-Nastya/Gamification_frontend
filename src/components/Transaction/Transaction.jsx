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

	return (
		<div className="transaction-block">
			<div className="datetime">{datetime.toLocaleString("ru-RU", options) || ""}</div>
			<div className="transaction">
				<div className="groups">
					<div className="member sender">{el.sender?.first_name || <Skeleton width={105}/>} {el.sender?.last_name}</div>
					<div className="ico"><img alt="arrow" src={ARROWTO}/></div>
					<div className="member">{el.recipient?.first_name || <Skeleton width={105}/>} {el.recipient?.last_name}</div>
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