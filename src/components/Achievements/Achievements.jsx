import React, {useEffect, useState} from 'react';
import "./style.css"
import '../base.css';
import {getHostInformation} from "../../store/helper/Helper";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DEFAULT_ACH from "../../images/icons/default_achive.svg";
import QUESTION from "../../images/icons/question.svg";
import AchievementStore from "../../store/AchievementStore";
import {observer} from "mobx-react";
import Auth from "../../store/helper/Auth";

const Achievements = observer(({canGet = false}) => {
	const host = getHostInformation()

	const [arr, setArr] = useState([{}, {}, {}, {}, {}, {}])
	const fetchAchive = async () => {
		if (canGet) {
			await AchievementStore.fetchAllAchives()
			const all = AchievementStore.achives
			await AchievementStore.fetchMyAchives(Auth.profileInfo.id)
			const my = AchievementStore.myAchives
			//получаем новый массив, содержащий все объекты достижений, но сначала те, которые студент успел получить,
			// а затем все остальные достижения без иконок
			const ach = my.concat(all.filter(item => !my.some(i => i.id === item.id)).map(({image, ...rest}) => rest));
			setArr(ach)
		} else {
			// сотрудникам сразу видны все достижения
			await AchievementStore.fetchAllAchives()
			setArr(AchievementStore.achives)
		}
	}

	useEffect(() => {
		void fetchAchive()
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
});

export default Achievements;