import "./hrTask.css"

import { useContext } from "react"
import { FaRedo, FaTrash } from "react-icons/fa"

import { deleteTask, restoreTask } from "../../../api/archiveApi"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"

const HrTaskArchive = ({data, onRefresh}) => {
	const { showQuestion, showMessage } = useContext(MessageContext)

	const handleRestoreTask = () => {
		showQuestion(`Are you sure to restore this task?`, async () => {
			try {
				await restoreTask(data.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	const handleDeleteTask = () => {
		showQuestion(`Are you sure to delete this task?`, async () => {
			try {
				await deleteTask(data.id)
				onRefresh()
			} catch (err) {
				showMessage(err.respponse.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<>
			<div
				className="task"
				style={{
					width: "70%",
					marginTop: "10px"
				}}
			>{data.name}</div>
			<div className="restore-buttons">
				<button
					className="restore-button"
					onClick={handleRestoreTask}
				>
					<FaRedo className="restore-button-icon"/>
					<span>RESTORE</span>
				</button>
				<button
					className="restore-button"
					onClick={handleDeleteTask}
				>
					<FaTrash className="restore-button-icon"/>
					<span>DELETE</span>
				</button>
			</div>
		</>
	)
}

export default HrTaskArchive