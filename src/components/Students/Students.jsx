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
import Pagination from "../Pagination/Pagination";
import {Link, useNavigate} from "react-router-dom";

const Students = ({canRegister = false, canFilter = false}) => {
	const host = getHostInformation()
	const history = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	// полный массив студентов
	const [students, setStudents] = useState([
		{}, {}, {}, {}, {}, {}, {}, {}, {}, {}
	])
	// массив с результатами поиска
	const [arr, setArr] = useState(students)

	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 10

	// сортировка
	const [sortBy, setSortBy] = useState('id');

	const handleSortChange = (event) => {
		setSortBy(event.target.value);
		const sortedStudents = sortStudents(event.target.value, arr)
		setArr(sortedStudents)
	};

	const sortStudents = (by, arr) => {
		if (arr[0]?.last_name) {
			return arr.sort((a, b) => {
				if (by === 'lastname') {
					return a.last_name.localeCompare(b.last_name)
				} else if (by === 'balance') {
					return b.balance - a.balance
				} else {
					return a.id - b.id || 0
				}
			})
		} else {
			return arr
		}
	}

	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/short_student`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				// console.log("data", data)
				if (data.code === "token_not_valid") {
					fetchData()
				} else {
					setStudents(data)
					setArr(data)
				}
			})
			.catch((err) => {
				console.log("err", err)
				const data = [
					{}, {}, {}, {},
				]
				setArr(data)
				setStudents(data)
			})
		}

		void fetchData()
		setIsLoading(false)
	}, [])

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const howManyPages = Math.ceil(arr.length / postsPerPage)
	const currentPosts = arr.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div className="container">

			<div className="header-block header-search main-header">
				<h1 className="header1">Студенты</h1>
				{!isLoading &&
					<div className="two-elements-right">
						{canRegister &&
							<button onClick={() => history("../student-registration")} className="button">Регистрация</button>}
						<Search students={students} setArr={setArr} setCurrentPage={setCurrentPage} sort={sortStudents}
										by={sortBy}/>
					</div>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			{canFilter &&
				<div className="filter-container">
					<div>Сортировка:</div>
					<div className="filter-value">
						<input type="radio" id="by-id" name="filter" value="id" checked={sortBy === 'id'}
									 onChange={handleSortChange}/>
						<label htmlFor="by-id">По умолчанию</label>
					</div>
					<div className="filter-value">
						<input type="radio" id="by-lastname" name="filter" value="lastname" checked={sortBy === 'lastname'}
									 onChange={handleSortChange}/>
						<label htmlFor="by-lastname">По фамилии</label>

					</div>
					<div className="filter-value">
						<input type="radio" id="by-balance" name="filter" value="balance" checked={sortBy === 'balance'}
									 onChange={handleSortChange}/>
						<label htmlFor="by-balance">По балансу</label>
					</div>
				</div>
			}
			<div className="student-container">
				{currentPosts?.map((el, i) =>
					<div key={i} className={el.student_profile?.back_color ? "improved-card-back" : ""}
							 style={{"--back-color": el.student_profile?.back_color}}>
						<div className="white-middle">
							<Link to={`/student/${el.id}`} className="student-card"
										style={el.student_profile?.border_color ? {
											"border": `4px solid ${el.student_profile.border_color}`,
											"--hover-color": `${el.student_profile.back_color}40`
										} : el.student_profile?.back_color ?
											{"--hover-color": `${el.student_profile.back_color}40`, "border": "3px solid #111111"} : {}}
							>
								<div className="avatar">
									{el?.image ? <img alt="ava" src={`${host}${el.image}`}/> :
										el.hasOwnProperty('image') ?
											<img alt="ava" src={DEFAULT_AVATAR}/> :
											<Skeleton width={75} height={75} circle={true}/>}
								</div>
								<div>
									<div className="name">{el.first_name || <Skeleton width={100}/>} {el.last_name}
										&nbsp; {el.student_profile?.emoji_status &&
											<img src={`${host}${el.student_profile.emoji_status}`} height="20" alt="" className="balance-icon"/>}
									</div>
									<div className="balance"><span className="balance-icon">{el.balance ||
										<Skeleton width={40}/>}</span> {el.balance &&
										<img className="balance-icon" src={TUCOIN} alt=""/>}</div>
									<div className="directions">
										{el?.direction ? el.direction?.length === 0 ? "" : <>
												{el.direction?.map((icon, id) => <img alt="n" title={icon.name} key={id}
																															src={`${host}${icon.icon}`}/>
												)}
											</> :
											<Skeleton circle={true} height={21} width={21}/>
										}
									</div>
								</div>
							</Link>
						</div>
					</div>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
		</div>
	);
};

export default Students;