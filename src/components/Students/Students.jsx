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
import {Link} from "react-router-dom";

const Students = () => {
	const host = getHostInformation()
	const [isLoading, setIsLoading] = useState(true)

	// полный массив студентов
	const [students, setStudents] = useState([ // временно!!!
		{}, {}, {}, {}, {}, {}, {}, {}, {}, {}
	])
	// массив с результатами поиска
	const [arr, setArr] = useState(students)

	// пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 10


	useEffect(() => {
		const host = getHostInformation()
		const fetchData = async () => {
			const token = await Auth.getToken()
			await fetch(`${host}/api/v1/short_student`, CORS(token?.access))
			.then((res) => res.json())
			.then((data) => {
				// console.log("data", data)
				if (data.code === "token_not_valid") {
					console.log("проблема протухшего токена в студентах, перезапуск запроса")
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
				{!isLoading && <Search students={students} setArr={setArr} setCurrentPage={setCurrentPage}/>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{currentPosts?.map((el, i) =>
					<Link to={`/student/${el.id}`} key={i} className="student-card">
						<div className="avatar">
							{el?.image ? <img alt="avatar" src={`${host}${el.image}`}/> :
								el.hasOwnProperty('image') ?
									<img alt="avatar" src={DEFAULT_AVATAR}/> :
									<Skeleton width={80} height={80} circle={true}/>}
						</div>
						<div className="info">
							<div className="name">{el.first_name || <Skeleton width={100}/>} {el.last_name}</div>
							<div className="balance"><span className="balance-icon">{el.balance ||
								<Skeleton width={40}/>}</span> {el.balance &&
								<img className="balance-icon" src={TUCOIN} alt=""/>}</div>
							<div className="directions">
								{el?.direction ? el.direction?.length === 0 ? "" : <>
										{el.direction?.map((icon, id) => <img alt="направление" title={icon.name} key={id}
																													src={`${host}${icon.icon}`}/>
										)}
									</> :
									<Skeleton circle={true} height={21} width={21}/>
								}
							</div>
						</div>
					</Link>
				)}
			</div>
			<Pagination pages={howManyPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
		</div>
	);
};

export default Students;