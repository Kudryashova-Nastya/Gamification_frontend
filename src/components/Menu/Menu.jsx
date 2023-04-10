import React from 'react';
import './style.css';
import {Link, Outlet} from "react-router-dom";
import TUCOIN_MENU_MINI from "../../images/icons/Tucoin_menu_mini.svg"
import NOTIFICATION from "../../images/icons/Notification.svg"
import TUCOIN from "../../images/icons/Tucoin_menu.svg"
import MARKET from "../../images/icons/Market.svg"
import QUESTS from "../../images/icons/Quests.svg"
import Achievements from "../../images/icons/Achievements.svg"
import Curators from "../../images/icons/Curators.svg"
import Students from "../../images/icons/Students.svg"
import Traectoria from "../../images/icons/Traectoria.svg"
import Events from "../../images/icons/Events.svg"
import TELEGRAM from "../../images/icons/Telegram.svg"
import VK from "../../images/icons/VK.svg"
import SETTINGS from "../../images/icons/Settings.svg"
import LOGO from "../../images/icons/Logo_white.svg"
import {bodyFixPosition, bodyUnfixPosition, getHostInformation} from "../../store/helper/Helper";
import {observer} from "mobx-react";
import Auth from "../../store/helper/Auth";
import DEFAULT_AVATAR from "../../images/icons/default-avatar.svg";


const Menu = observer(() => {
	const host = getHostInformation()
	const toggleMenu = () => {
		if (document.documentElement.clientWidth < 768) {
			document.getElementsByClassName("burger-container")[0].classList.toggle("active")
			document.getElementsByTagName("nav")[0].classList.toggle("active")
			if (!document.body.hasAttribute('data-body-scroll-fix')) {
				document.body.style.top = '';
				bodyFixPosition()
				document.body.style.top = '';
			} else {
				bodyUnfixPosition()
			}
		}
	}

	return (
		<>
			<div className="burger-container">
				<div className="burger" onClick={() => toggleMenu()}><span></span></div>
			</div>
			<nav>
				<div className="nav-container">
					<Link className="student-link" to='/student' onClick={() => toggleMenu()}>
						<div className="menu__info">
							<div>
								<div className="name">{Auth.profileInfo.first_name} {Auth.profileInfo.last_name}</div>
								<div className="value"> {Auth.profileInfo.balance}
									<img src={TUCOIN_MENU_MINI} className="tucoin" alt="игровой валюты"/>
								</div>
							</div>
							<div className="photo">
								{Auth.profileInfo.image ? <img src={`${host}${Auth.profileInfo.image}`} alt="ava"/> : <img alt="ava" src={DEFAULT_AVATAR}/>}
							</div>
						</div>
					</Link>
					<ul className="menu__links">
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={NOTIFICATION} className="ico" alt="уведомления"/>
								Уведомления
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={TUCOIN} className="ico" alt="TUCOIN"/>
								TUCOIN
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={MARKET} className="ico" alt="MARKET"/>
								Маркет
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={QUESTS} className="ico" alt="QUESTS"/>
								Витрина заданий
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={Achievements} className="ico" alt="Achievements"/>
								Зал ачивок
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={Curators} className="ico" alt="Curators"/>
								Кураторы и коучи
							</Link>
						</li>
						<li>
							<Link to='students' onClick={() => toggleMenu()}>
								<img src={Students} className="ico" alt="Students"/>
								Студенты
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={Traectoria} className="ico" alt="Traectoria"/>
								Траектория
							</Link>
						</li>
						<li>
							<Link to='/one' onClick={() => toggleMenu()}>
								<img src={Events} className="ico" alt="Events"/>
								Календарь мероприятий
							</Link>
						</li>
					</ul>
					<div className="social">
						<div>
							<a target="_blank" href="https://t.me/+VyZ5tKf3SOoyMGYy"><img src={TELEGRAM} className="networks"
																																						alt="TELEGRAM"/></a><br/>
							<a target="_blank" href="https://vk.com/tumomoscow/"><img src={VK} className="networks"
																																				alt="VK"/></a><br/>
							<span onClick={()=> Auth.logout()}><img src={SETTINGS} className="networks" alt="SETTINGS"/></span><br/>
						</div>
						<div>
							<a target="_blank" href="https://tumo.moscow/"><img src={LOGO} className="networks logo" alt="LOGO"/></a>
							<br/>
						</div>
					</div>
				</div>
			</nav>
			<div className="main-container">
				<div className="fake-nav">

				</div>
				<Outlet/>
			</div>

		</>
	);
})

export default Menu;