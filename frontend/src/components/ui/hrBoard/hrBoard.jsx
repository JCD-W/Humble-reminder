import { useContext, useState } from "react"
import "./hrBoard.css"

import { FaEllipsisV } from "react-icons/fa"
import HrBoardOptions from "./hrBoardOptions"
import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"
import { deleteBoard } from "../../../api/boardApi"
import HrEditBoardForm from "../hrEditBoardForm/hrEditBoardForm"

const HrBoard = ({ data, refreshFunc }) => {
	const { showQuestion, showMessage } = useContext(MessageContext)
	
	const [showOptions, setShowOptions] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)

	const creationDate = new Date(data.creation)
	const lastViewedDate = new Date(data.recent)

	const archive = () => {
		setShowOptions(false)
		showQuestion(`Are you sure of archiving the board "${data.title}"?`, async () => {
			try {
				await deleteBoard(data.id)
				showMessage("Board archived", NORMAL_MESSAGE)
				refreshFunc()
			} catch (err) {
				showMessage(err.response.data.message, ERROR_MESSAGE)
			}
		})
	}

	const showEditBoardForm = () => {
		setShowOptions(false)
		setShowEditForm(true)
	}

	return (
		<>
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
							onArchive={archive}
							onEdit={showEditBoardForm}
						/>
					}
				</div>
				<p className="board-description-box">{data.description}</p>
				<span className="board-date">Last viewed {lastViewedDate.toLocaleString()}</span>
			</div>
			{showEditForm && <HrEditBoardForm
				onClose={() => setShowEditForm(false)}
				data={data}
			/>}
		</>
	)
}

export default HrBoard