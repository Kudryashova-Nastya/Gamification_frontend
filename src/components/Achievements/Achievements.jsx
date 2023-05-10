import React, {useEffect, useState} from 'react';
import "./style.css"
import '../base.css';
import {CORS, getHostInformation} from "../../store/helper/Helper";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Auth from "../../store/helper/Auth";
import DEFAULT_ACH from "../../images/icons/default_achive.svg";
import QUESTION from "../../images/icons/question.svg";

const Achievements = ({canGet = false}) => {
	const host = getHostInformation()

	const [arr, setArr] = useState([{}, {}, {}, {}, {}, {}])

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/achievement`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data)
				if (data.code === "token_not_valid") {
					fetchData()
				} else {
					setArr(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [
					{}, {}, {}
				]
				setArr(data)
			})
		}

		void fetchData()
	}, [])


	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">{canGet ? "Мой зал" : "Зал"} ачивок</h1>
				<div className="achive-question">
					<div className="achive-info">
						Ачивка - это игровое достижение, которое можно получить, выполнив определённые действия
					</div>
					<img title="Что такое ачивка?" width="30" src={QUESTION} alt="?"/>
				</div>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="achive-container">
				{arr?.map((el, i) =>
					<div key={i} className="achive">
						<div className="image">
							{el.image ?
								<img alt="ачивка" src={`${host}${el.image}`}/> :
								<img src={DEFAULT_ACH} alt="ачивка"/>}
						</div>
						<div>
							<div className="name">{el.name || <Skeleton width={80}/>}</div>
							<div className="description">{el.description || <Skeleton width={130} count={2.5}/>}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Achievements;