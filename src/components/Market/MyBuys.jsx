import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import Search from "../Search/Search";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./style.css"
import '../base.css';
import {getHostInformation} from "../../store/helper/Helper";
import MarketStore from "../../store/MarketStore";
import BACK from "../../images/icons/back.svg";

const MyBuys = observer(() => {
	const [isLoading, setIsLoading] = useState(true)
	const host = getHostInformation()
	const history = useNavigate()
	// массив с результатами поиска
	const [arr, setArr] = useState([])

	useEffect(() => {
		MarketStore.fetchMyBuys().then(
			() => {
				setArr(MarketStore.myBuys)
				setIsLoading(false)
			}
		)
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">
					<img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>Мои покупки
				</h1>
				{!isLoading &&
					<Search students={MarketStore.myBuys} setArr={setArr}/>
				}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr?.map((el, i) =>
					<div key={i} className="market-card">
						<div className="left-side">
							<div className="avatar">
								{el?.image ? <img alt="photo" src={`${host}${el.image}`}/> :
									el.hasOwnProperty('image') ?
										"" :
										<Skeleton width={88} height={88} circle={true}/>}
							</div>
							<div>
								{!isLoading &&
									<button className="button">Забрать</button>
								}
							</div>
						</div>
						<div>
							<div className="name">{el.name || <Skeleton width={100}/>}</div>
							<div className="description">
								{el.description ||
									<Skeleton width={150} count={2}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			{arr.length === 0 && <div className="noinformation">Товары не найдены</div>}

		</div>
	);
});

export default MyBuys;