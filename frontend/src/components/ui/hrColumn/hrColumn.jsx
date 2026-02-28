import "./hrColumn.css"

import HrTask from "../hrTask/hrTask"
import { FaPlusCircle } from "react-icons/fa"

const HrColumn = ({ data, onCreate }) => {
	return (
		<div className="column">
			<div className="column-header">
				<span>{data.title}</span>
			</div>
			<div className="task-container">
				{data.task.map((task) =>
					<HrTask data={task}/>
				)}
				<button
					className="create-task-button"
					onClick={onCreate}
				>
					<FaPlusCircle/>
				</button>
			</div>
		</div>
	)
}

export default HrColumn