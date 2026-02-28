import "../hrForm/hrForm.css"

import HrForm from "../hrForm/hrForm"

/*
	{
		name: "type",
		label: "Task type",
		type: "select",
		options: [
			{
				value: "normal",
				label: "Normal"
			},
			{
				value: "deliver_url",
				label: "URL"
			},
			{
				value: "deliver_file",
				label: "File"
			}
		]
	}
*/

const HrCreateTaskForm = ({ onClose, onSubmit }) => {
	return (
		<>
			<div className="background-modal screen-centered"></div>
			<div className="screen-centered absolute-centered">
				<HrForm
					title={"Create new task"}
					onClose={onClose}
					onSubmit={onSubmit}
					submitText="CREATE"
					fields={[
						{
							name:"name",
							label: "Task name",
							type: "text",
							required: "Name required",
						},
						{
							name: "description",
							label: "Description",
							type: "textarea",
							maxLength: 512
						},
					]}
					customFields={
						<div className="form">
							<label>Task type</label>
							<select name="type">
								<option>Normal</option>
								<option>URL</option>
								<option>File</option>
							</select>
						</div>
					}
				/>
			</div>
		</>
	)
}

export default HrCreateTaskForm