import React, {useEffect, useState} from 'react';
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import "./style.css"
import '../base.css';
import D3 from "../../images/directions/3D.svg";
import Game from "../../images/directions/Геймдев.svg";
import Animation from "../../images/directions/Анимация.svg";
import Dis from "../../images/directions/Дизайн.svg";
import Search from "../Search/Search";
import {getHostInformation} from "../../store/helper/Helper";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Students = () => {
	const [isLoading, setIsLoading] = useState(true)

	// полный массив студентов
	const [students, setStudents] = useState([ // временно!!!
		{},
		{},
		{},
		{},
		{},
		{},
	])
	// массив с результатами поиска
	const [arr, setArr] = useState(students)

	useEffect(() => {
		const host = getHostInformation()
		fetch(`${host}/api/v1/student`)
		.then((res) => res.json())
		.then((data) => {
			setStudents(data)
			setArr(data)
		})
		.catch(() => {
			const data = [ // временно!!!
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
			setStudents(data)
			setArr(data)
		})

		setIsLoading(false)
	}, [])


	return (
		<div className="container">

			<div className="header-block header-search">
				<h1 className="header1">Студенты</h1>
				{!isLoading && <Search students={students} setArr={setArr}/>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr.map((el, i) =>
					<div key={i} className="student-card">
						<div className="avatar">
							<img alt="avatar" src="https://www.revelio.cz/system/stranka/profil/img/9593.jpg"/>
						</div>
						<div className="info">
							<div className="name">{el.name || <Skeleton width={100}/>}</div>
							<div className="balance"><span>{el.balance || <Skeleton width={40}/>}</span> {el.balance &&
								<img src={TUCOIN} alt=""/>}</div>
							<div className="directions">
								{el.directions ? <>
									<img alt="направление" src={D3}/>
									<img alt="направление" src={Game}/>
									<img alt="направление" src={Animation}/>
									<img alt="направление" src={Dis}/>
								</> : <>
									<Skeleton circle={true} height={21} width={21}/>
								</>
								}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Students;