import { useState } from "react"
import "./hrBoard.css"

import { FaEllipsisV } from "react-icons/fa"
import HrBoardOptions from "./hrBoardOptions"

const HrBoard = ({ data, refreshFunc }) => {
	const [showOptions, setShowOptions] = useState(false)

	const creationDate = new Date(data.creation)
	const lastViewedDate = new Date(data.recent)

	return (
		<div 
			className="board-container"
			style={{
				"--clear-color": `#${data.theme.clear}`,
				"--primary-color": `#${data.theme.primary}`,
				"--secondary-color": `#${data.theme.secondary}`,
				"--tertiary-color": `#${data.theme.tertiary}`
			}}
		>
			<div className="board-header-container">
				<span className="board-title">{data.title}</span>
				<span className="board-date">{creationDate.toLocaleDateString()}</span>
				<button
					className="board-options-button"
					onClick={() => setShowOptions(!showOptions)}	
				>
					<FaEllipsisV size={18}/>
				</button>
				{showOptions && 
					<HrBoardOptions
						data={data}
						refreshFunc={refreshFunc}
						hideFunc={() => setShowOptions(false)}
					/>
				}
			</div>
			<p className="board-description-box">{data.description}</p>
			<span className="board-date">Last viewed {lastViewedDate.toLocaleString()}</span>
		</div>
	)
}

export default HrBoard