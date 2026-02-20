import "./hrBoard.css"

import { FaBars, FaEllipsisV } from "react-icons/fa"

const HrBoard = ({ data }) => {
	const creationDate = new Date(data.creation)
	const lastViewedDate = new Date(data.recent)
	console.log(data)

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
				<button className="board-options-button">
					<FaEllipsisV size={18}/>
				</button>
			</div>
			<p className="board-description-box">{data.description}</p>
			<span className="board-date">Last viewed {lastViewedDate.toLocaleString()}</span>
		</div>
	)
}

export default HrBoard