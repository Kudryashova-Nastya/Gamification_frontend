import React from 'react';
import '../../base.css';
import '../style.css'
import './DoneBlock.css'
import BACK from "../../../images/icons/back.svg";
import TUCOIN42 from "../../../images/icons/black-tucoin42.svg";
import TUCOIN26 from "../../../images/icons/black-tucoin26.svg";
import {useNavigate} from "react-router-dom";

const DoneBlock = ({data}) => {
	const history = useNavigate()
	return (
		<div className="container">


			<div className="header-block">
				<h1 className="header1"><img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>
					Успешный перевод</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="send-container">
				<div className="minus-value">-{data.number} <img alt="" src={TUCOIN42}/></div>
				<div className="done">Перевод отправлен</div>
				<div className="card">
					<div className="name">Иван Иваненков</div>
					<div className="body">
						<img className="ava" alt="avatar"
								 src="http://static.ngs.ru/news/2020/99/preview/51a4e7fc7246f3bbba4d05258b9e7cae06f70b8a_1024.jpg"/><br/>
						<span>170 <img src={TUCOIN26} alt=""/></span>
					</div>
				</div>
				<div className="button-block">
					<button onClick={() => history(-1)} className="button btn-large">Готово</button>
				</div>

			</div>
		</div>
	);
};

export default DoneBlock;