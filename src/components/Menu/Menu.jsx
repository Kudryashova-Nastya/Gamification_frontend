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


const Menu = () => {
    return (
        <>
            <nav>
                <div className="menu__info">
                    <div>
                        <div className="name">Иван Иванов</div>
                        <div className="value"> 125
                            <img src={TUCOIN_MENU_MINI} className="tucoin" alt="игровой валюты"/>
                        </div>
                    </div>
                    <div>
                        <img src="https://www.peoples.ru/state/citizen/william_franklyn-miller/franklyn-miller_8.jpg"
                             alt="photo" className="photo"/>
                    </div>
                </div>
                <ul className="menu__links">
                    <li>
                        <Link to='/one'>
                            <img src={NOTIFICATION} className="ico" alt="уведомления"/>
                            Уведомления
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={TUCOIN} className="ico" alt="TUCOIN"/>
                            TUCOIN
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={MARKET} className="ico" alt="MARKET"/>
                            Маркет
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={QUESTS} className="ico" alt="QUESTS"/>
                            Витрина заданий
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={Achievements} className="ico" alt="Achievements"/>
                            Зал ачивок
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={Curators} className="ico" alt="Curators"/>
                            Кураторы и коучи
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={Students} className="ico" alt="Students"/>
                            Студенты
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={Traectoria} className="ico" alt="Traectoria"/>
                            Траектория
                        </Link>
                    </li>
                    <li>
                        <Link to='/one'>
                            <img src={Events} className="ico" alt="Events"/>
                            Календарь мероприятий
                        </Link>
                    </li>
                </ul>
                <div className="social">
                    <div>
                        <Link to='/student'><img src={TELEGRAM} className="networks" alt="TELEGRAM"/></Link><br/>
                        <Link to='/student'><img src={VK} className="networks" alt="VK"/></Link><br/>
                        <Link to='/student'><img src={SETTINGS} className="networks" alt="SETTINGS"/></Link><br/>
                    </div>
                    <div>
                        <Link to='/student'><img src={LOGO} className="networks logo" alt="LOGO"/></Link><br/>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    );
};

export default Menu;