import "./hrTask.css"

const HrTask = ({ data }) => {
	return (
		<div className="task">{data.name}</div>
	)
}

export default HrTask