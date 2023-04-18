import React, {useEffect, useState} from 'react';
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Auth from "../../store/helper/Auth";
import "./style.css"
import '../base.css';
import EmployeeCard from "./EmployeeCard";
import FACT from "../../images/icons/fact.svg";

const Employees = () => {
	const [employeeRole, setEmployeeRole] = useState("curator")

	const [employees, setEmployees] = useState([ // временно!!!
		{},
		{},
		{},
		{},
	])

	const shuffle = (arr) => {
		let j, temp;
		for (let i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/employee`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				if (data.code === "token_not_valid") {
					console.log("проблема протухшего токена в студентах, перезапуск запроса")
					fetchData()
				} else {
					setEmployees(data)
					console.log("сотрудники", data)
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [ // временно!!!
					{},
					{},
					{},
					{},
				]
				setEmployees(data)
			})
		}

		void fetchData()
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">Кураторы</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="employee-container">
				{employees?.map((el, i) =>
					<EmployeeCard el={el} randomFacts={shuffle([<div className="fact">
						<img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.first_fact}</div>,
						<div className="fact"><img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.second_fact}</div>,
						<div className="fact false-fact">
							<img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.false_fact}</div>
					])} key={i}/>
				)}
			</div>
		</div>
	);
};

export default Employees;