import React, {useState} from 'react';
import DEFAULT_AVATAR from "../../images/icons/default-avatar.svg";
import Skeleton from "react-loading-skeleton";
import {getHostInformation} from "../../store/helper/Helper";

const EmployeeCard = ({el, randomFacts}) => {
	const host = getHostInformation()
	const [showFalse, setShowFalse] = useState(false)


	// const facts = [<div className="fact">
	// 	<img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.first_fact}</div>,
	// 	<div className="fact"><img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.second_fact}</div>,
	// 	<div className="fact false-fact" onClick={() => setShowFalse(true)}>
	// 		<img className="balance-icon" src={FACT} alt="fact"/>&nbsp;{el?.false_fact}</div>
	// ]
	// const randomFacts = useMemo(() => shuffle(facts),[facts])
	const factIco = <span className="balance-icon">
	<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
	d="M5 1.125C3.22775 1.125 2 2.3925 2 3.9375C2 4.6755 2.318 5.15625 2.738 5.6655L2.8985 5.85525C3.06575 6.05325 3.251 6.27225 3.40325 6.49125C3.61625 6.7995 3.806 7.16325 3.869 7.60875C3.88401 7.75347 3.84237 7.89838 3.75281 8.01305C3.66324 8.12771 3.53273 8.20321 3.38868 8.2237C3.24464 8.24418 3.09825 8.20805 2.98028 8.12289C2.86231 8.03773 2.78192 7.91017 2.756 7.767C2.726 7.5555 2.63375 7.35675 2.4785 7.13175C2.35184 6.95489 2.21616 6.78467 2.072 6.62175C2.009 6.54675 1.94225 6.468 1.871 6.38175C1.40075 5.8125 0.875 5.0745 0.875 3.9375C0.875 1.7325 2.64725 0 5 0C7.35275 0 9.125 1.7325 9.125 3.9375C9.125 5.0745 8.59925 5.8125 8.129 6.38175C8.05775 6.468 7.991 6.54675 7.928 6.621C7.77275 6.80475 7.64075 6.96075 7.52225 7.13175C7.36625 7.35675 7.27475 7.5555 7.24475 7.767C7.21709 7.90875 7.13604 8.03446 7.01835 8.11816C6.90065 8.20186 6.75529 8.23715 6.61232 8.21674C6.46935 8.19633 6.33967 8.12178 6.2501 8.00849C6.16052 7.8952 6.11789 7.75183 6.131 7.608C6.194 7.16325 6.38375 6.7995 6.59675 6.49125C6.749 6.27225 6.93425 6.05325 7.1015 5.85525C7.15775 5.78925 7.21175 5.7255 7.26125 5.6655C7.682 5.15625 8 4.6755 8 3.9375C8 2.3925 6.77225 1.125 5 1.125ZM3.3125 9H6.6875C6.83668 9 6.97976 9.05926 7.08525 9.16475C7.19074 9.27024 7.25 9.41332 7.25 9.5625C7.25 9.71168 7.19074 9.85476 7.08525 9.96025C6.97976 10.0657 6.83668 10.125 6.6875 10.125H3.3125C3.16332 10.125 3.02024 10.0657 2.91475 9.96025C2.80926 9.85476 2.75 9.71168 2.75 9.5625C2.75 9.41332 2.80926 9.27024 2.91475 9.16475C3.02024 9.05926 3.16332 9 3.3125 9ZM3.5 11.4375C3.5 11.2883 3.55926 11.1452 3.66475 11.0398C3.77024 10.9343 3.91332 10.875 4.0625 10.875H5.9375C6.08668 10.875 6.22976 10.9343 6.33525 11.0398C6.44074 11.1452 6.5 11.2883 6.5 11.4375C6.5 11.5867 6.44074 11.7298 6.33525 11.8352C6.22976 11.9407 6.08668 12 5.9375 12H4.0625C3.91332 12 3.77024 11.9407 3.66475 11.8352C3.55926 11.7298 3.5 11.5867 3.5 11.4375Z"
	fill="#111111"/>
</svg>
	</span>

	return (
		<div className="employee-card">
			<div className="avatar">
				{el?.image ? <img alt="avatar" src={`${host}${el.image}`}/> :
					el.hasOwnProperty('image') ?
						<img alt="avatar" src={DEFAULT_AVATAR}/> :
						<Skeleton width={90} height={90} circle={true}/>}
			</div>
			<div className="info">
				<div className="name">{el?.first_name || <Skeleton width={100}/>} {el?.last_name}</div>
				<div className="dir">{el?.direction?.name} </div>
				<div className="email">{el?.email || <Skeleton width={80}/>}</div>
				{el?.first_fact && <div className={showFalse ? "facts show-false" : "facts"} onClick={() => setShowFalse(true)}>
					{randomFacts?.map((el, i) =>
						<div key={i} className={el.is_true ? "fact" : "fact false-fact"}>
							{factIco}&nbsp;{el?.fact}
						</div>
					)}
				</div>
				}
			</div>
		</div>
	);
};

export default EmployeeCard;