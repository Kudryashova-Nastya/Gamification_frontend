import React from 'react';
import '../../base.css';
import '../style.css'
import './DoneBlock.css'
import BACK from "../../../images/icons/back.svg";
import TUCOIN42 from "../../../images/icons/black-tucoin42.svg";
import TUCOIN26 from "../../../images/icons/black-tucoin26.svg";
import {useNavigate} from "react-router-dom";
import DEFAULT_AVATAR from "../../../images/icons/default-avatar.svg";
import Skeleton from "react-loading-skeleton";
import {getHostInformation} from "../../../store/helper/Helper";

const DoneBlock = ({data}) => {
	const history = useNavigate()
	const host = getHostInformation()

	return (
		<div className="container">
			<div className="header-block">
				<h1 className="header1"><img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>
					Успешный перевод</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="send-container">
				<div className="minus-value">-{data.sum_count} <img alt="" src={TUCOIN42}/></div>
				<div className="done">Перевод отправлен</div>
				<div className="card">
					<div className="name">{data.to_id.first_name} {data.to_id.last_name}</div>
					<div className="body">
							{data.to_id?.image ? <img className="ava" alt="avatar" src={`${host}${data.to_id.image}`}/> :
								data.to_id.hasOwnProperty('image') ?
									<img className="ava" alt="avatar" src={DEFAULT_AVATAR}/> :
									<Skeleton width={70} height={70} circle={true}/>}
						<br/>
						<span>170 <img src={TUCOIN26} alt=""/></span>
					</div>
				</div>
				<div className="button-block">
					<button onClick={() => history(-1)} className="button btn-large">Готово</button>
				</div>
			</div>
		</div>
	);
};

export default DoneBlock;