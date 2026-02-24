import "./hrBoard.css"

import { FaPen, FaArchive } from "react-icons/fa"
import { useContext } from "react"

import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"
import { deleteBoard } from "../../../api/boardApi"

const HrBoardOptions = ({data}) => {
	const { showQuestion, showMessage } = useContext(MessageContext)

	const archive = () => {
		showQuestion(`Are you sure of archiving the board "${data.title}"?`, async () => {
			try {
				await deleteBoard(data.id)
				showMessage("Board archived", NORMAL_MESSAGE)
			} catch (err) {
				showMessage(err.response.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<div className="board-options-container">
			<button className="board-menu-options-button">
				<label>Edit</label>
				<FaPen/>
			</button>
			<button className="board-menu-options-button">
				<label onClick={archive}>Archive</label>
				<FaArchive/>
			</button>
		</div>
	)
}

export default HrBoardOptions