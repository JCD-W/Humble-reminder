import { FaRedo, FaTrash } from "react-icons/fa"
import "./hrBoard.css"

const HrBoardArchive = ({ board, onRefresh }) => {
	const creationDate = new Date(board.creation)

	const restoreBoard = () => {
		
	}

	return (
		<div
			draggable={true}
			className={`board-container`}
			style={{
				width: "80%"
			}}
		>
			<div className="board-header-container">
				<span className="board-title">{board.title}</span>
				<span className="board-date">{creationDate.toLocaleDateString()}</span>
			</div>
			<p className="board-description-box">{board.description}</p>
			<div className="restore-buttons">
				<button
					className="restore-button"
				>
					<FaRedo className="restore-button-icon"/>
					<span>RESTORE</span>
				</button>
				<button
					className="restore-button"
				>
					<FaTrash className="restore-button-icon"/>
					<span>DELETE</span>
				</button>
			</div>
		</div>
	)
}

export default HrBoardArchive