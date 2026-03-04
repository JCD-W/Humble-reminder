import "../hrTask.css"

import { FaArchive, FaPen, FaTrash } from "react-icons/fa"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../../context/messageContext"
import { archiveTask, deleteDeliver, deliverUrlTask, updateTask } from "../../../../api/taskApi"

const HrTaskData = ({ data, onClose, onRefresh }) => {
	const { showMessage, showQuestion } = useContext(MessageContext)

	const [isEditing, setIsEditing] = useState(false)
	const [hasDeadline, setHasDeadline] = useState(data.deadline)
	const [newName, setNewName] = useState(data.name)
	const [newDescription, setNewDescription] = useState(data.description)
	const [newType, setNewType] = useState(data.type)
	const [newDeadline, setNewDeadline] = useState(data.deadline)
	const [deliveryUrl, setDeliveryUrl] = useState(data.deliver_url)
	const [newDeliveryUrl, setNewDeliveryUrl] = useState(data.deliver_url)

	const creationDate = new Date(data.creation)
	const deadlineDate = new Date(data.deadline)

	const saveChanges = async () => {
		try {
			await updateTask(data.id, newName, newDescription, newType, hasDeadline ? newDeadline : null)
			onClose()
			onRefresh()
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	const handleArchive = () => {
		showQuestion("Are you sure you want to archive this task?", async () => {
			try {
				await archiveTask(data.id)
				onClose()
				onRefresh()
				showMessage("Task archived", NORMAL_MESSAGE)
			} catch (err) {
				showMessage(err.response.data.message, ERROR_MESSAGE)
			}
		})
	}

	const handleDeliver = async () => {
		try {
			await deliverUrlTask(data.id, newDeliveryUrl)
			onClose()
			onRefresh()
			showMessage("Task delivered!", NORMAL_MESSAGE)
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}
	
	const handleDeleteDeliver = () => {
		showQuestion("Are you sure you want to delete this delivery?", async () => {
			try {
				await deleteDeliver(data.id)
				setDeliveryUrl(null)
			} catch (err) {
				showMessage(err.response.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<div className="flying task-data-container">
			<div className="task-data-header">
				{isEditing ?
					<input
						className="task-data-title-editing" 
						defaultValue={data.name}
						onBlur={(e) => setNewName(e.target.value)}
					/>			
				:
					<span className="task-data-title">{data.name}</span>			
				}
				<button
					className="task-header-button"
					onClick={() => setIsEditing(!isEditing)}
				><FaPen/></button>
				<button
					className="task-header-button"
					onClick={handleArchive}
				><FaArchive/></button>
				<button
					className="task-data-close"
					onClick={onClose}
				>X</button>
			</div>
			{isEditing ?
				<textarea
					defaultValue={data.description}
					className="task-data-description-editing"
					onBlur={(e) => setNewDescription(e.target.value)}
				/>
			:
				<p className="task-data-description">{data.description}</p>
			}

			{isEditing && (
				<div className="task-data-edit-deadline-container">
					<span>Has deadline</span>
					<button
						className="task-data-edit-deadline-check"
						style={{
							backgroundColor: hasDeadline ? "var(--clear-color)" : "var(--primary-color)"
						}}
						onClick={() => setHasDeadline(!hasDeadline)}
					></button>
				</div>
			)}
			{(isEditing && hasDeadline) && (
				<div className="task-data-deadline-container">
					<span>DEADLINE</span>
					<input
						defaultValue={deadlineDate}
						type="date"
						className="task-edit-deadline-date"
						onChange={(e) => setNewDeadline(e.target.value)}
					/>
				</div>
			)}
			
			{(data.deadline && !isEditing) &&
				<div className="task-data-deadline-container">
					<span>DEADLINE</span>
					<span>{deadlineDate.toLocaleDateString()}</span>
				</div>
			}

			{isEditing ?
				<select className="task-data-editing-type" defaultValue={data.type} onChange={(e) => setNewType(e.target.value)}>
					<option value="normal">Normal</option>
					<option value="deliver_url">URL</option>
					<option value="deliver_file">File</option>
				</select>
			:
				<>
					<div>
						{deliveryUrl ?
							<div className="delivery-container">
								<Link
									target="_blank"
									className="delivery-url"
									to={deliveryUrl}
								>{newType === "deliver_url" ? deliveryUrl : "Open file"}</Link>
								<button
									className="delivery-button"
									onClick={handleDeleteDeliver}
								>
									<FaTrash/>
								</button>
							</div>
						:
							<>
								{data.type === "deliver_url" && (
									<input
										className="task-deliver-url"
										onBlur={(e) => setNewDeliveryUrl(e.target.value)}
									/>
								)}
								{data.type === "deliver_file" && (
									<>
										<input type="file" className="hidden-input" name="deliver-file" id="deliver-file"/>
										<label htmlFor="deliver-file" className="task-deliver-file">Upload file</label>
									</>
								)}
							</>
						}
					</div>

					{(data.type !== "normal" && !deliveryUrl) && (
						<button
							className="task-deliver-button"
							onClick={handleDeliver}
						>DELIVER</button>
					)}
					<div className="task-data-date-container">
						<span>Created</span>
						<span className="task-data-date">{creationDate.toLocaleDateString()}</span>
					</div>
				</>	
			}
			{isEditing && (
				<button
					className="task-deliver-button"
					onClick={saveChanges}
				>SAVE CHANGES</button>
			)}
		</div>
	)
}

export default HrTaskData