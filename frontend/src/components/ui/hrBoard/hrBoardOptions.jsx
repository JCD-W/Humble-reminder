import { FaPen, FaArchive } from "react-icons/fa"
import "./hrBoard.css"

const HrBoardOptions = ({data}) => {
	return (
		<div className="board-options-container">
			<button className="board-menu-options-button">
				<label>Edit</label>
				<FaPen/>
			</button>
			<button className="board-menu-options-button">
				<label>Archive</label>
				<FaArchive/>
			</button>
		</div>
	)
}

export default HrBoardOptions