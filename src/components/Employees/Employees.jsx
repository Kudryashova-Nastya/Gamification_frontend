import React, {useEffect, useState} from 'react';
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Auth from "../../store/helper/Auth";
import "./style.css"
import '../base.css';
import EmployeeCard from "./EmployeeCard";
import INFO from "../../images/icons/i-violet.svg";

const Employees = () => {
	const [activeTab, setActiveTab] = useState("curator")

	const [employees, setEmployees] = useState([
		{}, {}, {}, {}, {}, {}, {}, {}
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
					fetchData()
				} else {
					setEmployees(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [
					{}, {}, {}, {}
				]
				setEmployees(data)
			})
		}

		void fetchData()
	}, [])

	return (
		<div className="container employee-page">
			<div className="header-block main-header tabs-container">
				<div className={activeTab === "curator" ? "tab active" : "tab"}
						 onClick={() => setActiveTab("curator")}>Кураторы
				</div>
				<div className={activeTab === "coach" ? "tab active" : "tab"} onClick={() => setActiveTab("coach")}>Коучи</div>
				<div className={activeTab === "manager" ? "tab active" : "tab"} onClick={() => setActiveTab("manager")}>Админы
				</div>
				<div className="info-facts">
					<div><img src={INFO} alt="info"/></div>
					<div>Один из написанных фактов ложный. Ложный факт будет отмечен цветом после клика по нему</div>
				</div>
			</div>
			<div className="employee-container">
				{employees.filter(data => data?.user_role === activeTab)?.map((el) =>
					<EmployeeCard el={el} randomFacts={shuffle([
						{fact: el.first_fact, is_true: true},
						{fact: el.second_fact, is_true: true},
						{fact: el.false_fact, is_true: false}
					])} key={el.id}/>
				)}
			</div>
		</div>
	);
};

export default Employees;