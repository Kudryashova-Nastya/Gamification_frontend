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
import {GiveMerchModalWindow} from "./GiveMerchModalWindow/GiveMerchModalWindow";

const MarketMerch = observer(() => {
	const [isLoading, setIsLoading] = useState(true)
	const host = getHostInformation()
	const history = useNavigate()
	const nodeRef = useRef(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			await MarketStore.fetchMerchToGive()
			setIsLoading(false)
		}

		void fetchData()
	}, [])

	return (
		<div className="container">
			<div className="header-block header-search main-header">
				<h1 className="header1">
					<img src={BACK} alt="Назад" className="header-back" onClick={() => history(-1)}/>Выдать мерч
				</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="student-container">
				{MarketStore.merchToGive?.map((el, i) =>
					<div key={i} className="market-card">
						<div className="left-side">
							<div className="avatar">
								{el.product_image ? <img alt="photo" src={`${host}${el.product_image}`}/> :
									el?.hasOwnProperty('product_image') ?
										"" :
										<Skeleton width={88} height={88} circle={true}/>}
							</div>
							<div>
								{!isLoading &&
									<button className="button" onClick={() => MarketStore.setModalGiveMerchVisible(el)}>
										Выдать
									</button>
								}
							</div>
						</div>
						<div>
							<div className="name">{el.product_name || <Skeleton width={100}/>}</div>
							<div className="description">
								{el.product_description ||
									<Skeleton width={150} count={2}/>}
							</div>
						</div>
					</div>
				)}
			</div>
			{MarketStore.merchToGive.length === 0 && <div className="noinformation">На данный момент нет невыданных товаров</div>}
			<CSSTransition
				in={MarketStore.modalGiveMerchVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<GiveMerchModalWindow ref={nodeRef} data={MarketStore.currentMyBuy}/>
			</CSSTransition>
		</div>
	);
});

export default MarketMerch;