import "../hrForm/hrForm.css"

import HrForm from "../hrForm/hrForm"

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
						{
							name: "deadline",
							label: "Deadline",
							type: "check",
							ifOn: {
								type: "date",
								className: "form-date",
								name: "deadline-date"
							},
							ifOff: (
								<span style={{color: "var(--tertiary-color)"}}>No deadline.</span>
							)
						},
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
					]}
				/>
			</div>
		</>
	)
}

export default HrCreateTaskForm