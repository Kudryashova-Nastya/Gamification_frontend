import React from 'react';
import './style.css';
import {Link, Outlet} from "react-router-dom";
import TUCOIN_MENU_MINI from "../../images/icons/Tucoin_menu_mini.svg"

const Menu = () => {
    return (
        <>
            <nav>
                <div className="menu__info">
                    <div>
                        <div className="name">Иван Иванов</div>
                        <div className="value"> 125&nbsp;
                            <img src={TUCOIN_MENU_MINI} className="tucoin" width="17" height="17" alt="игровой валюты"/>
                        </div>
                    </div>
                    <div>
                        <img src="https://www.peoples.ru/state/citizen/william_franklyn-miller/franklyn-miller_8.jpg"
                             alt="photo" className="photo"/>
                    </div>
                </div>
                <ul className="menu__links">
                    <li><Link to='/one'>Page One</Link></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
};

export default Menu;