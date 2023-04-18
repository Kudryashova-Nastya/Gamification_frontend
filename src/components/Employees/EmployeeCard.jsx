import React, { useState} from 'react';
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
					{randomFacts}
				</div>
				}
			</div>
		</div>
	);
};

export default EmployeeCard;