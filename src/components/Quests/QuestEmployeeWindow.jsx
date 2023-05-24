import React, {forwardRef, useState} from 'react';
import {observer} from 'mobx-react';
import {ModalWindow} from '../ModalWindow/ModalWindow';
import QuestStore from "../../store/QuestStore";
import TUCOIN from "../../images/icons/black-tucoin14.svg";
import EDIT from "../../images/icons/edit.svg";
import DONE from "../../images/icons/done.svg";
import {EditQuest} from "./EditQuest";
import {RewardQuest} from "./RewardQuest";
import {CloseQuest} from "./CloseQuest";

export const QuestEmployeeWindow = observer(forwardRef(({data}, ref) => {

	const [currentTab, setCurrentTab] = useState('detail')

	const color = QuestStore.questTypes.find(color => color.id === data.type)?.color || '#111111'
	const checkRole = (role) => {
		switch (role) {
			case "manager":
				return '(Админ)'
			case "curator":
				return '(Куратор)'
			case "coach":
				return '(Коуч)'
			default:
				return ''
		}
	}

	return (
		<ModalWindow isBig={true} colorBorder={`${color}85`} ref={ref}>
			<svg className="close-ico" onClick={() => {
				QuestStore.closeModal()
			}}
					 width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.9749 1.04082C20.8284 0.894041 20.6544 0.77759 20.4629 0.698136C20.2713 0.618682 20.066 0.577785 19.8586 0.577785C19.6512 0.577785 19.4459 0.618682 19.2544 0.698136C19.0628 0.77759 18.8888 0.894041 18.7424 1.04082L10.9999 8.76749L3.25737 1.02499C3.11078 0.8784 2.93675 0.762119 2.74523 0.682787C2.5537 0.603454 2.34842 0.562622 2.14112 0.562622C1.93381 0.562622 1.72853 0.603454 1.53701 0.682787C1.34548 0.762119 1.17145 0.8784 1.02487 1.02499C0.878277 1.17158 0.761997 1.3456 0.682665 1.53713C0.603332 1.72865 0.5625 1.93393 0.5625 2.14124C0.5625 2.34854 0.603332 2.55382 0.682665 2.74535C0.761997 2.93687 0.878277 3.1109 1.02487 3.25749L8.76737 11L1.02487 18.7425C0.878277 18.8891 0.761997 19.0631 0.682665 19.2546C0.603332 19.4462 0.5625 19.6514 0.5625 19.8587C0.5625 20.066 0.603332 20.2713 0.682665 20.4628C0.761997 20.6544 0.878277 20.8284 1.02487 20.975C1.17145 21.1216 1.34548 21.2379 1.53701 21.3172C1.72853 21.3965 1.93381 21.4374 2.14112 21.4374C2.34842 21.4374 2.5537 21.3965 2.74523 21.3172C2.93675 21.2379 3.11078 21.1216 3.25737 20.975L10.9999 13.2325L18.7424 20.975C18.889 21.1216 19.063 21.2379 19.2545 21.3172C19.446 21.3965 19.6513 21.4374 19.8586 21.4374C20.0659 21.4374 20.2712 21.3965 20.4627 21.3172C20.6543 21.2379 20.8283 21.1216 20.9749 20.975C21.1215 20.8284 21.2377 20.6544 21.3171 20.4628C21.3964 20.2713 21.4372 20.066 21.4372 19.8587C21.4372 19.6514 21.3964 19.4462 21.3171 19.2546C21.2377 19.0631 21.1215 18.8891 20.9749 18.7425L13.2324 11L20.9749 3.25749C21.5765 2.65582 21.5765 1.64249 20.9749 1.04082Z"
					fill="#111111"/>
			</svg>
			{currentTab === 'detail' ?
				<div className="checkmodal detailquest">
					<div className="header3">{data.name || "Задание"}</div>
					<div className="rows">
						<div className="quest-description" style={{"background": `${color}15`}}>
							{data.description}
						</div>
						<div className="quest-info-block">
							<span className="quest-label">Автор: </span>
							<span
								className="quest-info">
							{data.employee?.first_name} {data.employee?.last_name} {checkRole(data.employee?.user_role)}
						</span>
						</div>
						<div className="quest-info-block">
							<span className="quest-label">Вознаграждение: </span>
							<span className="quest-info balance-icon">{data.sum} </span>
							<img src={TUCOIN} alt="" className="balance-icon"/>
						</div>
						{data.student?.first_name && <div className="quest-info-block">
							<span className="quest-label">Исполнитель: </span>
							<span className="quest-info balance-icon">{data.student?.first_name} {data.student?.last_name}</span>
						</div>
						}
						{data.is_active ?
							<div className="quest-info-block two-buttons">
								<button className="button" onClick={() => setCurrentTab('edit')}>Изменить
									<img className="button-icon" alt="" src={EDIT}/>
								</button>
								<button className="button" onClick={() => setCurrentTab('reward')}>Наградить
									<img src={DONE} className="button-icon" alt=""/>
								</button>
							</div> : <div className="close-quest-text">Задача закрыта</div>}
					</div>
				</div>
				: currentTab === 'edit' ? <EditQuest data={data} setCurrentTab={setCurrentTab}/> : currentTab === 'reward' ?
					<RewardQuest data={data} setCurrentTab={setCurrentTab}/> : currentTab === 'close' ?
						<CloseQuest data={data} setCurrentTab={setCurrentTab}/> : ''}
		</ModalWindow>
	)
}));