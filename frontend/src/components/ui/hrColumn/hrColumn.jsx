import "./hrColumn.css"

import HrTask from "../hrTask/hrTask"

const HrColumn = ({ data }) => {
	return (
		<div className="column">
			<div className="column-header">
				<span>{data.title}</span>
			</div>
			<div className="task-container">
				{data.task.map((task) =>
					<HrTask data={task}/>
				)}
			</div>
		</div>
	)
}

export default HrColumn