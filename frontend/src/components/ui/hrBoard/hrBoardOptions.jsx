import "./hrBoard.css"

import { FaPen, FaArchive } from "react-icons/fa"

const HrBoardOptions = ({ onArchive, onEdit }) => {
	return (
		<div className="board-options-container">
			<button
				className="board-menu-options-button"
				id="board-menu-edit-button"
				onClick={onEdit}
			>
				<label>Edit</label>
				<FaPen/>
			</button>
			<button
				className="board-menu-options-button"
				id="board-menu-archive-button"
				onClick={onArchive}
			>
				<label>Archive</label>
				<FaArchive/>
			</button>
		</div>
	)
}

export default HrBoardOptions