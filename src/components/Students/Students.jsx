import React, {useState} from 'react';
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import "./style.css"
import D3 from "../../images/directions/3D.svg";
import Game from "../../images/directions/Геймдев.svg";
import Animation from "../../images/directions/Анимация.svg";
import Dis from "../../images/directions/Дизайн.svg";
import Search from "../Search/Search";

const Students = () => {
	const students = [
		{name: "Петя Пимашков", balance: 125},
		{name: "Екатерина Рудная", balance: 225},
		{name: "Артемий Пимашковнидзе", balance: 125},
		{name: "Карина Карамбеби", balance: 325},
		{name: "Александр Гамильтон", balance: 325},
		{name: "Валерий Меладзе", balance: 325},
		{name: "Тимофей Тимофеев", balance: 325},
		{name: "Рудольф Ван", balance: 205},
		{name: "Игорь Гром", balance: 205},
	]
	const [arr, setArr] = useState(students)

	return (
		<div className="container">

			<div className="header-block">
				<h1 className="header1">Студенты</h1>
				<Search students={students} setArr={setArr}/>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr.map((el, i) =>

					<div key={i} className="student-card">
						<div className="avatar">
							<img alt="avatar" src="https://www.revelio.cz/system/stranka/profil/img/9593.jpg"/>
						</div>
						<div className="info">
							<div className="name">{el.name}</div>
							<div className="balance"><span>{el.balance}</span> <img src={TUCOIN} alt=""/></div>
							<div className="directions">
								<img alt="направление" src={D3}/>
								<img alt="направление" src={Game}/>
								<img alt="направление" src={Animation}/>
								<img alt="направление" src={Dis}/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Students;