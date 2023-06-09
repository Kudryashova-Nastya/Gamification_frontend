import React, {useEffect, useRef, useState} from "react";
import '../base.css';
import './style.scss'
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
import {useNavigate, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {getHostInformation} from "../../store/helper/Helper";
import {CSSTransition} from "react-transition-group";
import AchievementStore from "../../store/AchievementStore";

const Profile = observer(({canTransfer = false}) => {
	const {id} = useParams()
	const host = getHostInformation()
	const [isCopy, setIsCopy] = useState(false)
	const [borderColor, setBorderColor] = useState(null)
	const [backColor, setBackColor] = useState(null)
	const [emojiStatus, setEmojiStatus] = useState(null)
	const [emojiSticker, setEmojiSticker] = useState(null)
	const [studentAchives, setStudentAchives] = useState([])
	const history = useNavigate()
	const screenWidth = document.documentElement.clientWidth
	const nodeRef = useRef(null)

	useEffect(() => {
		StudentProfileStore.fetchStudentInfo(id).then(() => {
				setBorderColor(StudentProfileStore.studentInfo?.student_profile?.border_color)
				setBackColor(StudentProfileStore.studentInfo?.student_profile?.back_color)
				setEmojiStatus(StudentProfileStore.studentInfo?.student_profile?.emoji_status)
				setEmojiSticker(StudentProfileStore.studentInfo?.student_profile?.emoji_sticker)

				AchievementStore.fetchMyAchives(StudentProfileStore.studentInfo.id).then(() => {
						setStudentAchives(AchievementStore.myAchives)
					}
				)
			}
		)
	}, [id])

	const copy = () => {
		const el = document.createElement('input')
		// обычное копирование ссылки не подойдёт, так как для разных ролей она выглядит по-разному в адресной строке,
		// а также у текущего пользователя в своём аккаунте не указан id,
		// поэтому чтобы другие смогли перейти на акк по ссылке, нужен единый вид, как указано ниже
		el.value = `${window.location.origin}/student/${StudentProfileStore.studentInfo.id}`

		document.body.appendChild(el)
		el.select()
		document.execCommand('copy')
		document.body.removeChild(el)
		setIsCopy(true)
	}

	return (
		<>
			<style>
				{
					`	
						.improved-profile-back {
    					background-color: ${backColor};
    					border-radius: 40px;
						}
						
						.improved-profile .avatar img {
    					border: 6px solid ${backColor};
						}
						
						.improved-profile .about-text {
    					min-width: 140px;
    					background-color: ${backColor}42;
						}
						
						.improved-profile-message .transaction .message {
							background-color: ${backColor}35;
					`
				}
			</style>
			<div className="container">
				<div className="buttons-block">
					{StudentProfileStore.isMyProfile &&
						<button className="button" onClick={() => StudentProfileStore.setEditVisible()}>Редактировать
							<img className="button-icon" alt="" src={EDIT}/>
						</button>
					}
					<button onClick={copy} className="button">{isCopy ? "Успешно скопировано" : "Копировать ссылку"}
						<img className="button-icon" alt="копировать" src={LINK}/>
					</button>
				</div>
				<div className={backColor ? "improved-profile-back profile-back" : "profile-back"}>
					{emojiSticker &&
						<div className="emojiSticker"><img src={`${host}${emojiSticker}`} alt=""/></div>}
					<div className={backColor ? "profile-window improved-profile" : "profile-window"}
							 style={borderColor ? {"border": `5px solid ${borderColor}`} : {}}>
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
								<Skeleton width={140}/>} {StudentProfileStore.studentInfo.last_name}&nbsp; {emojiStatus &&
								<img src={`${host}${emojiStatus}`} height="24" alt="" className="balance-icon"/>}
							</h2>
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
									<div className="contact profile-directions">
										{StudentProfileStore.studentInfo.direction?.map((icon, id) => <img alt="" width="29"
																																											 title={icon.name} key={id}
																																											 src={`${host}${icon.icon}`}/>
										)}
									</div> : ""
								}
							</div>
						</div>
						<div className="about">
							<div className="label">О себе:</div>
							<div className="about-text">
								{StudentProfileStore.studentInfo.about ? StudentProfileStore.studentInfo.about : StudentProfileStore.studentInfo.hasOwnProperty('about') ? "no comments" : screenWidth < 768 ?
									<Skeleton width={200} count={3}/> : <Skeleton width={"16vw"} count={3}/>}
							</div>
						</div>
					</div>
				</div>
				<div className="header-block">
					<h2 className="header3">{StudentProfileStore.isMyProfile ? "Мои ачивки" : "Ачивки"}</h2>
					{StudentProfileStore.isMyProfile &&
						<button onClick={() => history("achievements")} className="button">Все ачивки <img
							className="button-icon achive-icon" alt="ачивки" src={ACHI}/>
						</button>
					}
				</div>
				<hr color="#CCCCCC" size="4"/>

				{studentAchives.length === 0 ? <div className="noinformation">У пользователя пока что нет ачивок</div> :
					<div className="achives">{studentAchives.map((el, i) =>
						<div className="my-achive" key={i}>
							<img title={el.name} alt="ачивка" src={`${host}${el.image}`}/>
						</div>
					)}
					</div>
				}

				<div className="header-block">
					<h2
						className="header3">{StudentProfileStore.isMyProfile ? "Моя история" : "История"} {screenWidth < 768 ? '' : 'операций'}</h2>
					{canTransfer &&
						<button onClick={() => history("send")} className="button button-send">Перевести <img
							className="send button-icon" alt="перевод" src={SEND}/></button>
					}
				</div>
				<hr color="#CCCCCC" size="4"/>
				<div className={backColor && "improved-profile-message"}>
					<StudentTransactions id={StudentProfileStore.studentInfo.id}/>
				</div>
				<CSSTransition
					in={StudentProfileStore.modalEditVisible}
					timeout={300}
					classNames="alert"
					unmountOnExit
					nodeRef={nodeRef}
				>
					<EditModalWindow ref={nodeRef}/>
				</CSSTransition>
			</div>
		</>
	)
});

export default Profile;