import "./hrColumn.css"
import "../hrTask/hrTask.css"

import { FaRedo, FaTrash } from "react-icons/fa"
import { useContext } from "react"

import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { deleteColumn, restoreColumn } from "../../../api/archiveApi"

const HrColumnArchive = ({data, onRefresh}) => {
	const { showMessage, showQuestion } = useContext(MessageContext)

	const handleRestoreBoard = () => {
		showQuestion(`Are you sure to restore this column?`, async () => {
			try {
				await restoreColumn(data.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	const handleDeleteBoard = () => {
		showQuestion(`Are you sure to delete this column?`, async () => {
			try {
				await deleteColumn(data.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<>
			<div
				className="column"
				style={{
					marginTop: "15px"
				}}
			>
				<div className="column-header">
					<span className="column-title">{data.title}</span>
				</div>
				<div className="task-container">
					{data.task.map((task) =>
						<div className="task">{task.name}</div>
					)}
				</div>
			</div>
			<div className="restore-buttons">
				<button
					className="restore-button"
					onClick={handleRestoreBoard}
				>
					<FaRedo className="restore-button-icon"/>
					<span>RESTORE</span>
				</button>
				<button
					className="restore-button"
					onClick={handleDeleteBoard}
				>
					<FaTrash className="restore-button-icon"/>
					<span>DELETE</span>
				</button>
			</div>
		</>
	)
}

export default HrColumnArchive