import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./style.css"
import '../base.css';
import {getHostInformation} from "../../store/helper/Helper";
import MarketStore from "../../store/MarketStore";
import BACK from "../../images/icons/back.svg";
import {CSSTransition} from "react-transition-group";
import {EditBuyModalWindow} from "./EditBuyModalWindow/EditBuyModalWindow";
import BuysSearch from "../Search/BuysSearch";

const MyBuys = observer(() => {
	const [isLoading, setIsLoading] = useState(true)
	const host = getHostInformation()
	const history = useNavigate()
	const nodeRef = useRef(null)
	// массив с результатами поиска
	const [arr, setArr] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			await MarketStore.fetchMyBuys()
			setArr(MarketStore.myBuys)
			setIsLoading(false)
		}

		void fetchData()
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">
					<img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>Мои покупки
				</h1>
				{!isLoading &&
					<BuysSearch setArr={setArr}/>
				}
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{arr?.map((el, i) =>
					<div key={i} className="market-card">
						<div className="left-side">
							<div className="avatar">
								{el.store_product?.image ? <img alt="photo" src={`${host}${el.store_product?.image}`}/> :
									el.store_product?.hasOwnProperty('image') ?
										"" :
										<Skeleton width={88} height={88} circle={true}/>}
							</div>
							<div>
								{!isLoading &&
									<button className="button" disabled={el.status} onClick={() => MarketStore.setEditVisible(el)}>
										{el.store_product?.product_type === "merch" ? "Забрать" : "Применить"}
									</button>
								}
							</div>
						</div>
						<div>
							<div className="name">{el.store_product?.name || <Skeleton width={100}/>}</div>
							<div className="description">
								{el.store_product?.description ||
									<Skeleton width={150} count={2}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			{arr.length === 0 && <div className="noinformation">Товары не найдены</div>}
			<CSSTransition
				in={MarketStore.modalEditVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<EditBuyModalWindow ref={nodeRef} data={MarketStore.currentMyBuy}/>
			</CSSTransition>
		</div>
	);
});

export default MyBuys;