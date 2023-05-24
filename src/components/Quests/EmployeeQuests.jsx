import React, {useEffect, useRef, useState} from 'react';
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import "./style.css"
import '../base.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from "../Pagination/Pagination";
import {useNavigate} from "react-router-dom";
import QuestStore from "../../store/QuestStore";
import {CSSTransition} from "react-transition-group";
import {observer} from "mobx-react";
import BACK from "../../images/icons/back.svg";
import DONE from "../../images/icons/done.svg";
import {NewQuestWindow} from "./NewQuestWindow";
import {QuestEmployeeWindow} from "./QuestEmployeeWindow";

const EmployeeQuests = observer(() => {
	const history = useNavigate()
	const nodeRef = useRef(null)
	const screenWidth = document.documentElement.clientWidth

	const cutText = (text) => {
		const maxLength = 120 // максимальное кол-во символов описания в карточке
		return text.length > maxLength ? text.substring(0, text.lastIndexOf(" ", maxLength)) + "..." : text
	}


	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 10

	useEffect(() => {
		const fetchData = async () => {
			await QuestStore.fetchQuestTypes()
			await QuestStore.fetchEmployeeQuests()
		}

		void fetchData()
	}, [])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(QuestStore.myQuests?.length / postsPerPage)
	const currentPosts = QuestStore.myQuests?.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">
					<img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>Мои задания
				</h1>
				<div className="">
					<button onClick={() => {
						QuestStore.setNewQuestVisible()
					}} className="button btn-tall">
						Новое задание<img src={DONE} className="button-icon" alt=""/>
					</button>
				</div>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{currentPosts?.map((el, i) =>
					<div key={i} className="quest-card"
							 style={{
								 "background": `${!el.is_active ? '#6b6b6b' :
									 QuestStore.questTypes.find(color => color.id === el.type)?.color || '#CCCCCC'}40`
							 }}>
						<div className="title">
							{el.name || <Skeleton width={180}/>} {el.name && !el.is_active && '(Закрыто)'}
						</div>
						<div className="body">
							<div>
								<div className="sum">
									{el.sum ? <>
											<span className="balance-icon">{el.sum} </span>
											<img src={TUCOIN} alt="" className="balance-icon"/></>
										: ""}
								</div>
								<button onClick={() => QuestStore.setEmployeeQuestVisible(el)} className="button btn-mini">Подробнее
								</button>
							</div>
							<div className="description">
								{el.description ? cutText(el.description) :
									<Skeleton width={screenWidth > 767 ? '14vw' : '35vw'} count={2.5}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
			<CSSTransition
				in={QuestStore.employeeQuestVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<QuestEmployeeWindow ref={nodeRef} data={QuestStore.currentQuest}/>
			</CSSTransition>
			<CSSTransition
				in={QuestStore.modalNewQuestVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<NewQuestWindow ref={nodeRef}/>
			</CSSTransition>
		</div>
	);
});

export default EmployeeQuests;