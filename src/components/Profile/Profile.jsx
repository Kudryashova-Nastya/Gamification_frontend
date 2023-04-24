import React, {useEffect, useState} from "react";
import '../base.css';
import './style.css'
import '../Transaction/Transaction.css'
import EDIT from '../../images/icons/edit.svg'
import LINK from '../../images/icons/link.svg'
import MAINTUCOIN from '../../images/icons/black-tucoin18.svg'
import TELEGRAM from '../../images/icons/telegram-black.svg'
import MAIL from '../../images/icons/mail.svg'
import PORTFOLIO from '../../images/icons/portfolio.svg'
import ACHI from '../../images/icons/achi16.svg'
import SEND from '../../images/icons/send.svg'
import DEFAULT_AVATAR from '../../images/icons/default-avatar.svg'
import StudentProfileStore from "../../store/StudentProfileStore";
import {EditModalWindow} from "./EditModalWindow/EditModalWindow";
import {observer} from "mobx-react";
import StudentTransactions from "./StudentTransactions/StudentTransactions";
import Pagination from "../Pagination/Pagination";
import {useNavigate, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {getHostInformation} from "../../store/helper/Helper";

const Profile = observer(() => {
	const {id} = useParams()
	const host = getHostInformation()
	// const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	// const [postsPerPage] = useState(10)
	const history = useNavigate()
	const screenWidth = document.documentElement.clientWidth

	useEffect(() => {
		void StudentProfileStore.fetchStudentInfo(id)
	}, [id])

	//Get current posts
	// const indexOfLastPost = currentPage * postsPerPage;
	// const indexOfFirstPost = indexOfLastPost - postsPerPage;
	// const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	// const howManyPages = Math.ceil(posts.length/postsPerPage)

	return (
		<div className="container">
			<div className="buttons-block">
				{StudentProfileStore.isMyProfile &&
					<button className="button" onClick={() => StudentProfileStore.setEditVisible()}>Редактировать
						<img className="button-icon" alt="редактировать" src={EDIT}/>
					</button>
				}
				<button className="button">Копировать ссылку <img className="button-icon" alt="копировать ссылку" src={LINK}/>
				</button>
			</div>
			<div className="profile-window">
				<div className="avatar">
					{StudentProfileStore.studentInfo.image ?
						<img alt="фото" src={`${host}${StudentProfileStore.studentInfo.image}`}/> :
						StudentProfileStore.studentInfo.hasOwnProperty('image') ?
							<img alt="фото" src={DEFAULT_AVATAR}/> :
							<Skeleton width={100} height={100} circle={true}/>}
				</div>
				<div className="info">
					<h2
						className="header3">{StudentProfileStore.studentInfo.first_name ||
						<Skeleton width={150}/>} {StudentProfileStore.studentInfo.last_name}</h2>
					<div className="header4"> <span className="balance-icon">{StudentProfileStore.studentInfo.balance ||
						<Skeleton width={50}/>}</span> {StudentProfileStore.studentInfo.balance &&
						<img alt="тукоинов" className="balance-icon" src={MAINTUCOIN}/>}</div>
					<div className="contacts">
						<div className="contact">
							{StudentProfileStore.studentInfo.email ? <><img alt="почта"
																															src={MAIL}/> {StudentProfileStore.studentInfo.email}</> :
								<Skeleton width={120} count={3} style={{marginBottom: "10px"}}/>}
						</div>
						{StudentProfileStore.studentInfo?.telegram &&
							<div className="contact">
								<img alt="телеграм" src={TELEGRAM}/> {StudentProfileStore.studentInfo.telegram}
							</div>
						}
						{StudentProfileStore.studentInfo?.portfolio_link &&
							<div className="contact">
								<img alt="портфолио" src={PORTFOLIO}/> <a
								href={StudentProfileStore.studentInfo.portfolio_link}>Портфолио</a>
							</div>
						}
						{StudentProfileStore.studentInfo.direction ? StudentProfileStore.studentInfo.direction.length === 0 ? "" :
								<div className="contact directions">
									{StudentProfileStore.studentInfo.direction?.map((icon, id) => <img alt="направление" width="29"
																																										 title={icon.name} key={id}
																																										 src={`${host}${icon.icon}`}/>
									)}
								</div> :
							<Skeleton circle={true} height={29} width={29}/>
						}
					</div>
				</div>
				<div className="about">
					<div className="label">О себе:</div>
					<div className="about-text">
						{StudentProfileStore.studentInfo.about ? StudentProfileStore.studentInfo.about : StudentProfileStore.studentInfo.hasOwnProperty('about') ? "no comments" : screenWidth < 769 ?
							<Skeleton width={230} count={3}/> : <Skeleton width={300} count={3}/>}
					</div>
				</div>
			</div>
			<div className="header-block">
				<h2 className="header3">{StudentProfileStore.isMyProfile ? "Мои ачивки" : "Ачивки"}</h2>
				{StudentProfileStore.isMyProfile &&
					<button className="button">Все ачивки <img className="button-icon achive-icon" alt="ачивки" src={ACHI}/>
					</button>
				}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="achives">
				<div className="achive">
					<img title="ачивка" alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
				<div className="achive">
					<img title="ачивка" alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
				<div className="achive">
					<img title="ачивка" alt="ачивка" src="https://assets.htmlacademy.ru/img/achievements/general/task-1.v2.svg"/>
				</div>
			</div>
			<div className="header-block">
				<h2 className="header3">{StudentProfileStore.isMyProfile ? "Моя история" : "История"} {screenWidth < 768 ? '' : 'операций'}</h2>
				<button onClick={() => history("send")} className="button button-send">Перевести <img
					className="send button-icon" alt="перевод" src={SEND}/></button>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<StudentTransactions/>
			<Pagination pages={10} setCurrentPage={setCurrentPage}/>
			{
				StudentProfileStore.modalEditVisible ? <EditModalWindow/> : null
			}
		</div>
	)
		;
});

export default Profile;