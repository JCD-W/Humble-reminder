import { useState } from "react"
import "./hrTask.css"
import HrTaskData from "./hrTaskData/hrTaskData"

const HrTask = ({ data, onRefresh }) => {
	const [showingTask, setShowingTask] = useState(false)

	const deadlineDate = new Date(data.deadline)
	const pastDeadline = deadlineDate < Date.now() && data.deadline

	const showTask = () => {
		setShowingTask(true)
	}

	const startDragging = (data) => {
		console.log(data)
	}

	{/*draggable={true}*/}
	return (
		<>
			<div
				className={`task ${pastDeadline && "task-expired-container"}`}
				onDragStart={startDragging}
				onClick={showTask}
			>
				<span>{data.name}</span>
				{(pastDeadline) &&
					<span className="task-expired">PAST DEADLINE</span>
				}
			</div>
			{showingTask &&
				<HrTaskData
					data={data}
					onClose={() => setShowingTask(false)}
					onRefresh={onRefresh}
				/>
			}
		</>
	)
}

export default HrTask