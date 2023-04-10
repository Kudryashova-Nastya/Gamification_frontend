import React, {useEffect, useState} from 'react';
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import "./style.css"
import '../base.css';
import Search from "../Search/Search";
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Auth from "../../store/helper/Auth";
import DEFAULT_AVATAR from "../../images/icons/default-avatar.svg";

const Students = () => {
	const host = getHostInformation()
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
	const [arr, setArr] = useState([ // временно!!!
		{},
		{},
		{},
		{},
		{},
		{},
	])

	useEffect(() => {
		const host = getHostInformation()
		fetch(`${host}/api/v1/short_student`, CORS(Auth.token?.access))
		.then(async (res) => await res.json())
		.then((data) => {
			console.log("data", data)
			if (data.length > 0) {
				setArr(data)
				setStudents(data)
			}
		})
		.catch((err) => {
			console.log("err", err)
			const data = [ // временно!!!
				{name: "Петя Пимашков", balance: 125},
				{name: "Екатерина Рудная", balance: 225},
				{name: "Артемий Пимашковнидзе", balance: 125},
				{name: "Карина Карамбеби", balance: 325},
			]
			setArr(data)
			setStudents(data)
		})

		setIsLoading(false)
	}, [])


	return (
		<div className="container">

			<div className="header-block header-search main-header">
				<h1 className="header1">Студенты</h1>
				{!isLoading && <Search students={students} setArr={setArr}/>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr?.map((el, i) =>
					<div key={i} className="student-card">
						<div className="avatar">
							{el?.image ? <img alt="avatar" src={`${host}${el.image}`}/> :
								el.hasOwnProperty('image') ?
									<img alt="avatar" src={DEFAULT_AVATAR}/> :
								<Skeleton width={80} height={80} circle={true}/>}
						</div>
						<div className="info">
							<div className="name">{el.first_name || <Skeleton width={100}/>} {el.last_name}</div>
							<div className="balance"><span>{el.balance || <Skeleton width={40}/>}</span> {el.balance &&
								<img src={TUCOIN} alt=""/>}</div>
							<div className="directions">
								{el?.direction ? el.direction?.length === 0 ? "": <>
								{el.direction?.map((icon, id)=> <img alt="направление" title={icon.name} key={id} src={`${host}${icon.icon}`}/>
								)}
								</> :
									<Skeleton circle={true} height={21} width={21}/>
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