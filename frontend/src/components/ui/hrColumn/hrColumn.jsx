import "./hrColumn.css"

import HrTask from "../hrTask/hrTask"
import { FaArchive, FaPlusCircle } from "react-icons/fa"
import { useContext, useState } from "react"
import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"
import { archiveColumn } from "../../../api/columnApi"

const HrColumn = ({ data, onCreate, selectColumnFunc, onRefresh }) => {
	const { showMessage, showQuestion } = useContext(MessageContext)

	const [hoveringHeader, setHoveringHeader] = useState(false)

	const handeArchiveColumn = () => {
		showQuestion("Are you sure you want to archive this column?", async () => {
			try {
				await archiveColumn(data.id)
				onRefresh()
				showMessage("Column archived", NORMAL_MESSAGE)
			} catch (err) {
				showMessage(err.response.data.message, ERROR_MESSAGE)
			}
		})
	}

	return (
		<div className="column">
			<div
				className="column-header" 
				onMouseEnter={() => setHoveringHeader(true)}
				onMouseLeave={() => setHoveringHeader(false)}
			>
				<span className="column-title">{data.title}</span>
				{hoveringHeader &&
					<button 
						className="archive-column-button"
						onClick={() => handeArchiveColumn()}	
					>
						<FaArchive/>
					</button>
				}
			</div>
			<div className="task-container">
				{data.task.map((task) =>
					<HrTask
						onRefresh={onRefresh}
						data={task}
					/>
				)}
				<button
					className="create-task-button"
					onClick={() => {
						onCreate()
						selectColumnFunc(data.id)
					}}
				>
					<FaPlusCircle/>
				</button>
			</div>
		</div>
	)
}

export default HrColumn