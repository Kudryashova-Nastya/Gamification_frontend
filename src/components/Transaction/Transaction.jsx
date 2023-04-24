import React from "react";
import '../base.css';
import './Transaction.css'
import TUCOIN from '../../images/icons/black-tucoin16.svg'
import ARROWTO from '../../images/icons/arrow-to.svg'

const Transaction = ({el}) => {

	return (
		<div className="transaction-block">
			<div className="datetime">20 декабря 12:20</div>
			<div className="transaction">
				<div className="groups">
					<div className="member sender">Валерий Жмышенко</div>
					<div className="ico"><img alt="arrow" src={ARROWTO}/></div>
					<div className="member">Петя Пимашков</div>
				</div>
				<div className="groups info">
					<div className="count">
						<span className="balance-icon">+20</span> <img className="balance-icon" alt="tucoin" src={TUCOIN}/>
					</div>
					<div className="message">Моему братишке братюличке любимому на прокачку)</div>
				</div>
			</div>
		</div>
	);
};

export default Transaction;