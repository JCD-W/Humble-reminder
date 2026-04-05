import "./hrBoard.css"

import { FaRedo, FaTrash } from "react-icons/fa"
import { useContext } from "react"

import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { deleteBoard, restoreBoard } from "../../../api/archiveApi"

const HrBoardArchive = ({ board, onRefresh }) => {
	const { showQuestion, showMessage } = useContext(MessageContext)

	const creationDate = new Date(board.creation)

	const handleRestoreBoard = () => {
		showQuestion(`Are you sure to restore the board ${board.title}?`, async () => {
			try {
				await restoreBoard(board.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	const handleDeleteBoard = () => {
		showQuestion(`Are you sure you want to permanently delete the board ${board.title}?`, async () => {
			try {
				await deleteBoard(board.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<>
			<div
				draggable={true}
				className={`board-container`}
				style={{
					width: "80%"
				}}
			>
				<div className="board-header-container">
					<span className="board-title board-archive-title">{board.title}</span>
					<span className="board-date">{creationDate.toLocaleDateString()}</span>
				</div>
				<p className="board-description-box">{board.description}</p>
			</div>
			<div className="restore-buttons">
				<button
					className="restore-button archive-restore-button"
					onClick={handleRestoreBoard}
				>
					<FaRedo className="restore-button-icon"/>
					<span>RESTORE</span>
				</button>
				<button
					className="restore-button archive-delete-button"
					onClick={handleDeleteBoard}
				>
					<FaTrash className="restore-button-icon"/>
					<span>DELETE</span>
				</button>
			</div>
		</>
	)
}

export default HrBoardArchive