import HrForm from "../hrForm/hrForm"

const HrCreateBoardForm = ({ onClose }) => {
	return (
		<>
			<div className="background-modal screen-centered"></div>
			<div 
				className="screen-centered absolute-centered"
			>
				<HrForm
					onClose={onClose}
					title={"Create new board"}
					fields={[
						{
							name:"name",
							label: "Name",
							type: "text",
							required: "Board name required",
						},
						{
							name: "description",
							label: "Description",
							type: "textarea"
						}
					]}
				/>
			</div>
		</>
	)
}

export default HrCreateBoardForm