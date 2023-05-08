import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react";
import Search from "../Search/Search";
import {useNavigate} from "react-router-dom";
import MY_BUYS from "../../images/icons/my-buys.svg";
import Skeleton from "react-loading-skeleton";
import TUCOIN from "../../images/icons/white-tucoin16.svg";
import "./style.css"
import '../base.css';
import {getHostInformation} from "../../store/helper/Helper";
import MarketStore from "../../store/MarketStore";
import {CSSTransition} from "react-transition-group";
import {BuyModalWindow} from "./BuyModalWindow/BuyModalWindow";

const Market = observer(({canBuy = false, canGiveMerch = false}) => {
	const [isLoading, setIsLoading] = useState(true)
	const host = getHostInformation()
	const history = useNavigate()
	const nodeRef = useRef(null)

	// массив с результатами поиска
	const [arr, setArr] = useState([{}, {}, {}, {}])

	useEffect(() => {
		if (canBuy) {
			MarketStore.fetchEnableGoodsInfo().then(
				() => {
					setArr(MarketStore.goodsInfo)
				}
			)
		} else {
			MarketStore.fetchAllGoodsInfo().then(
				() => {
					setArr(MarketStore.goodsInfo)
				}
			)
		}
		setIsLoading(false)
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">Маркет</h1>
				{!isLoading &&
					<div className="two-elements-right">
						{canGiveMerch &&
							<button onClick={() => history("merch")} className="button">Выдать мерч
							</button>}
						<Search students={MarketStore.goodsInfo} setArr={setArr}/>
						{canBuy &&
							<button onClick={() => history("my-buys")} className="button">Мои покупки
								<img className="button-icon" alt="buy" src={MY_BUYS}/></button>}
					</div>}

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
									<button className="button" disabled={!canBuy} onClick={() => MarketStore.setBuyVisible(el)}><span
										className="balance-icon">{el.price} </span>
										<img className="balance-icon" src={TUCOIN} alt=""/></button>
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
			{arr.length === 0 && <div className="noinformation">По вашему запросу не найдено ни одного товара</div>}
			<CSSTransition
				in={MarketStore.modalBuyVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<BuyModalWindow ref={nodeRef} data={MarketStore.currentBuy}/>
			</CSSTransition>
		</div>
	);
});

export default Market;