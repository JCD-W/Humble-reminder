import HrForm from "../hrForm/hrForm"

const HrEditBoardForm = ({ onClose, data }) => {
	const edit = async ({ name, description }) => {
		
	}

	return (
		<>
			<div className="background-modal screen-centered"></div>
			<div 
				className="screen-centered absolute-centered"
			>
				<HrForm
					onClose={onClose}
					title={"Edit board"}
					onSubmit={edit}
					fields={[
						{
							name:"name",
							label: "Name",
							type: "text",
							required: "Board name required",
							default: data.title
						},
						{
							name: "description",
							label: "Description",
							type: "textarea",
							maxLength: 512,
							default: data.description
						}
					]}
				/>
			</div>
		</>
	)
}

export default HrEditBoardForm