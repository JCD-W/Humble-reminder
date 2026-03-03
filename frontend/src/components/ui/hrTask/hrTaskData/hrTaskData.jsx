import "../hrTask.css"

const HrTaskData = ({ data, onClose }) => {
	const creationDate = new Date(data.creation)
	const deadlineDate = new Date(data.deadline)
	console.log(data)
	return (
		<div className="flying task-data-container">
			<div className="task-data-header">
				<span className="task-data-title">{data.name}</span>
				<span className="task-data-date">{creationDate.toLocaleDateString()}</span>
				<button className="task-data-close" onClick={onClose}>X</button>
			</div>
			<p className="task-data-description">{data.description}</p>
			
			{data.deadline &&
				<div className="task-data-deadline-container">
					<span>DEADLINE</span>
					<span>{deadlineDate.toLocaleDateString()}</span>
				</div>
			}

			<div>
				{data.type === "deliver_url" && (
					<input className="task-deliver-url"/>
				)}
				
				{data.type === "deliver_file" && <>
					<input type="file" className="hidden-input" name="deliver-file" id="deliver-file"/>
					<label htmlFor="deliver-file" className="task-deliver-file">Upload file</label>
				</>}
			</div>

			{data.type !== "normal" && (
				<button className="task-deliver-button">DELIVER</button>
			)}
		</div>
	)
}

export default HrTaskData