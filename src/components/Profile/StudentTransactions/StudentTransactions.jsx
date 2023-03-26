import React from "react";
import '../../base.css';
import '../style.css'
import TUCOIN from '../../../images/icons/black-tucoin16.svg'
import ARROWTO from '../../../images/icons/arrow-to.svg'
import ARROWFROM from '../../../images/icons/arrow-from.svg'
import {observer} from "mobx-react";

const StudentTransactions = observer(() => {

	return (
		<>
			<div className="transaction-block">
				{/*<ul className="list-group my-4">*/}
				{/*	{posts.map((post, index) => {*/}
				{/*		return (<li key={index} className="list-group-item">{post.title}</li>)*/}
				{/*	})}*/}
				{/*</ul>*/}
				<div className="datetime">20 декабря 12:20</div>
				<div className="transaction">
					<div className="groups">
						<div className="ico"><img alt="arrow" src={ARROWTO}/></div>
						<div className="sender">Петя Пимашков</div>
					</div>
					<div className="groups">
						<div className="count">+20 <img alt="tucoin" src={TUCOIN}/></div>
						<div className="message">На прокачку)</div>
					</div>
				</div>
			</div>

			<div className="transaction-block">
				<div className="datetime">19 декабря 15:26</div>
				<div className="transaction">
					<div className="groups">
						<div className="ico"><img alt="arrow" src={ARROWFROM}/></div>
						<div className="sender">Сергей Разумовский</div>
					</div>
					<div className="groups">
						<div className="count">-200 <img alt="tucoin" src={TUCOIN}/></div>
						<div className="message">Анекдот: заходит как-то улитка в бар...</div>
					</div>
				</div>
			</div>
		</>
	);
});

export default StudentTransactions;