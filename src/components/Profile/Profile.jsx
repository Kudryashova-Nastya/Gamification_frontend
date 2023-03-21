import React from "react";
import '../base.css';
import './style.css'
import EDIT from '../../images/icons/edit.svg'
import LINK from '../../images/icons/link.svg'
import MAINTUCOIN from '../../images/icons/black-tucoin18.svg'
import TELEGRAM from '../../images/icons/telegram-black.svg'
import MAIL from '../../images/icons/mail.svg'
import PORTFOLIO from '../../images/icons/portfolio.svg'
import ACHI from '../../images/icons/achi16.svg'
import SEND from '../../images/icons/send.svg'
import D3 from '../../images/directions/3D.svg'
import Animation from '../../images/directions/Анимация.svg'
import Game from '../../images/directions/Геймдев.svg'
import Dis from '../../images/directions/Дизайн.svg'

const Profile = () => {

	return (
		<div className="profile-container">
			<div className="buttons-block">
				<button className="button">Редактировать <img className="button-icon" alt="редактировать" src={EDIT}/></button>
				<button className="button">Копировать ссылку <img className="button-icon" alt="копировать ссылку" src={LINK}/>
				</button>
			</div>
			<div className="profile-window">
				<div className="avatar">
					<img alt="фото" src="https://www.peoples.ru/state/citizen/william_franklyn-miller/franklyn-miller_8.jpg"/>
				</div>
				<div className="info">
					<h2 className="header3">Иван Иваненков</h2>
					<h3 className="header4"> 125 <img alt="тукоинов" src={MAINTUCOIN}/></h3>
					<div className="contacts">
						<div className="contact">
							<img alt="почта" src={MAIL}/> ivan.ivanov.m@tumo.world
						</div>
						<div className="contact">
							<img alt="телеграм" src={TELEGRAM}/> /ivan_ivanovvv
						</div>
						<div className="contact">
							<img alt="портфолио" src={PORTFOLIO}/> <a href="">Портфолио</a>
						</div>
						<div className="contact directions">
							<img alt="направление" width="29" src={D3}/>
							<img alt="направление" width="29" src={Game}/>
							<img alt="направление" width="29" src={Animation}/>
							<img alt="направление" width="29" src={Dis}/>
						</div>
					</div>
				</div>
				<div className="about">
					<div className="label">О себе:</div>
					<div className="about-text">
						Привет! Я Ваня, мне 13 лет. Люблю играть в майнкрафт, кто тоже любит, го на мой сервер:
						Gamer123
					</div>
				</div>
			</div>
			<div className="header-block">
				<h2 className="header3">Мои ачивки</h2>
				<button className="button">Все ачивки <img className="button-icon" alt="ачивки" src={ACHI}/></button>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="achives">
				<div className="achive">
					<img alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
				<div className="achive">
					<img alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
				<div className="achive">
					<img alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
			</div>
			<div className="header-block">
				<h2 className="header3">Моя история операций</h2>
				<button className="button">Перевести <img className="button-icon" alt="перевод" src={SEND}/></button>
			</div>
			<hr color="#CCCCCC" size="4"/>
		</div>
	);
};

export default Profile;