import { useState } from "react"
import "./hrTask.css"
import HrTaskData from "./hrTaskData/hrTaskData"

const HrTask = ({ data, onRefresh, selectTaskFunc, onDrop, column, onHover }) => {
	const [showingTask, setShowingTask] = useState(false)
	const [dragging, setDragging] = useState(false)

	const deadlineDate = new Date(data.deadline)
	const deliveryDate = new Date(data.delivery_date)
	const pastDeadline = deadlineDate < Date.now() && data.deadline
	const deliveryUrl = data.deliver_url

	const showTask = () => {
		setShowingTask(true)
	}

	const startDragging = () => {
		setDragging(true)
		selectTaskFunc({
			task: data.id,
			column: column
		})
	}

	const stopDragging = () => {
		onDrop()
		setDragging(false)
	}

	return (
		<>
			<div
				className={`task ${pastDeadline && "task-expired-container"} ${dragging && "task-dragging"}`}
				draggable={true}
				onDragStart={startDragging}
				onDragEnd={stopDragging}
				onClick={showTask}
				onDragOver={() => onHover({
					id: data.id,
					position: data.position
				})}
			>
				<span>{data.name}</span>
				{(pastDeadline && !deliveryUrl) &&
					<span className="task-message">PAST DEADLINE</span>
				}
				{deliveryUrl &&
					<span className="task-message">DELIVERED {deliveryDate.toLocaleDateString()}</span>
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