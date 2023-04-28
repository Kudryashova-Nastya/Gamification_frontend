import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import Search from "../Search/Search";
import {useNavigate} from "react-router-dom";
import MY_BUYS from "../../images/icons/my-buys.svg";
import Skeleton from "react-loading-skeleton";
import TUCOIN from "../../images/icons/black-tucoin16.svg";
import "./style.css"
import '../base.css';
import {getHostInformation} from "../../store/helper/Helper";

const Market = observer(({canBuy = false}) => {
	const [isLoading, setIsLoading] = useState(true)
	const host = getHostInformation()
	const history = useNavigate()
	// массив с результатами поиска
	const [arr, setArr] = useState([{}, {}, {}, {}])

	useEffect(() => {
		const goods = []
		setIsLoading(false)
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">Маркет</h1>
				{!isLoading &&
					<div className="two-elements-right">
						<Search students={goods} setArr={setArr}/>
						{canBuy &&
							<button onClick={() => history("my-buys")} className="button">Мои покупки
								<img className="button-icon" alt="buy" src={MY_BUYS}/></button>}
					</div>}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr?.map((el, i) =>
					<div key={i} className="market-card">
						<div className="avatar">
							{el?.image ? <img alt="photo" src={`${host}${el.image}`}/> :
								el.hasOwnProperty('image') ?
									"" :
									<Skeleton width={80} height={80} circle={true}/>}
						</div>
						<div>
							<div className="name">{el.first_name || <Skeleton width={100}/>} {el.last_name}</div>
							<div className="description"><span className="balance-icon">{el.balance ||
								<Skeleton width={40} count={3}/>}</span> {el.balance &&
								<img className="balance-icon" src={TUCOIN} alt=""/>}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
});

export default Market;