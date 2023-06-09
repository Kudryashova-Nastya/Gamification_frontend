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
import {QuestDetailWindow} from "./QuestDetailWindow";
import {observer} from "mobx-react";
import BACK from "../../images/icons/back.svg";

const StudentQuests = observer(() => {
	const history = useNavigate()
	const nodeRef = useRef(null)
	const screenWidth = document.documentElement.clientWidth

	const cutText = (text) => {
		const maxLength = 120 // максимальное кол-во символов описания в карточке
		return text.length > maxLength ? text.substring(0, text.lastIndexOf(" ", maxLength)) + "..." : text
	}

	const [quests, setQuests] = useState([
		{}, {}, {}, {}, {}
	])


	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 10

	useEffect(() => {
		const fetchData = async () => {
			await QuestStore.fetchQuestTypes()
			await QuestStore.fetchStudentQuests()
			setQuests(QuestStore.myQuests)
		}

		void fetchData()
	}, [])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(quests?.length / postsPerPage)
	const currentPosts = quests?.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">
					<img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>Мои выполненные задания
				</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{currentPosts?.map((el, i) =>
					<div key={i} className="quest-card"
							 style={{"background": `${QuestStore.questTypes.find(color => color.id === el.type)?.color || '#CCCCCC'}40`}}>
						<div className="title">
							{el.name || <Skeleton width={180}/>}
						</div>
						<div className="body">
							<div>
								<div className="sum">
									{el.sum ? <>
											<span className="balance-icon">{el.sum} </span>
											<img src={TUCOIN} alt="" className="balance-icon"/></>
										: ""}
								</div>
								<button onClick={() => QuestStore.setQuestVisible(el)} className="button btn-mini">Подробнее</button>
							</div>
							<div className="description">
								{el.description ? cutText(el.description) : <Skeleton width={screenWidth > 767 ? '14vw' : '35vw'} count={2.5}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
			<CSSTransition
				in={QuestStore.modalQuestVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<QuestDetailWindow ref={nodeRef} data={QuestStore.currentQuest}/>
			</CSSTransition>
		</div>
	);
});

export default StudentQuests;