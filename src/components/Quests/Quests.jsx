import React, {useEffect, useState} from 'react';
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import MYQUESTS from "../../images/icons/my-quests.svg";
import "./style.css"
import '../base.css';
import Search from "../Search/Search";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from "../Pagination/Pagination";
import {useNavigate} from "react-router-dom";
import QuestStore from "../../store/QuestStore";

const Quests = () => {
	const history = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	const cutText = (text) => {
		const maxLength = 120 // максимальное кол-во символов описания в карточке
		return text.length > maxLength ? text.substring(0, text.lastIndexOf(" ", maxLength)) + "..." : text
	}

	// полный массив студентов
	const [quests, setQuests] = useState([
		{}, {}, {}, {}, {}
	])
	// массив с результатами поиска
	const [arr, setArr] = useState(quests)


	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 10

	// сортировка
	const [sortBy, setSortBy] = useState('all');

	const handleFilterChange = (event) => {
		setSortBy(event.target.value);
	};

	const filterQuests = (by, arr) => {
		if (by === "all") {
			return arr
		} else {
		return arr.filter((el)=>el.type == by)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			await QuestStore.fetchQuestTypes()
			await QuestStore.fetchActiveQuests()
			setQuests(QuestStore.quests)
			setArr(QuestStore.quests)
		}

		void fetchData()
		setIsLoading(false)
	}, [])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(filterQuests(sortBy, arr)?.length / postsPerPage)
	const currentPosts = filterQuests(sortBy, arr)?.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">Витрина заданий</h1>
				{!isLoading &&
					<div className="two-elements-right">
						<Search students={quests} setArr={setArr} setCurrentPage={setCurrentPage}/>
						<button onClick={() => history("my-quests")} className="button">
							Мои задания <img src={MYQUESTS} className="button-icon" alt=""/>
						</button>
					</div>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="filter-container">
				<div>Теги:</div>
				<div className="filter-value tag"
						 style={{"background": '#CCCCCC40',
							 "border": sortBy === 'all' ? '2px solid #CCCCCC' : 'none',
							 "padding": sortBy === 'all' ? '5px 15px' : '7px 17px'
						 }}>
					<input type="radio" id="by-id" name="tags" value="all" checked={sortBy === 'all'}
								 onChange={handleFilterChange}/>
					<label htmlFor="by-id">Все</label>
				</div>
				{QuestStore.questTypes.map((tag, i) =>
					<div className="filter-value tag" key={i}
							 style={{
								 "background": `${tag?.color || '#CCCCCC'}40`,
								 "border": sortBy == tag.id ? `2px solid ${tag?.color || '#CCCCCC'}70` : 'none',
								 "padding": sortBy == tag.id ? '5px 15px' : '7px 17px'
							 }}>
						<input type="radio" id={tag.id} name="tags" value={tag.id} checked={sortBy === tag.id}
									 onChange={handleFilterChange}/>
						<label htmlFor={tag.id}>{tag.name}</label>
					</div>
				)}
			</div>
			<div className="student-container">
				{currentPosts?.map((el, i) =>
					<div key={i} className="quest-card"
							 style={{"background": `${QuestStore.questTypes.find(color => color.id === el.type)?.color || '#CCCCCC'}40`}}>
						<div className="title">
							{el.name || <Skeleton width={100}/>}
						</div>
						<div className="body">
							<div>
								<div className="sum">
									{el.sum ? <>
											<span className="balance-icon">{el.sum} </span>
											<img src={TUCOIN} alt="" className="balance-icon"/></>
										: ""}
								</div>
								<button className="button btn-mini">Подробнее</button>
							</div>
							<div className="description">
								{el.description ? cutText(el.description) : <Skeleton width={150} count={2.5}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
		</div>
	);
};

export default Quests;