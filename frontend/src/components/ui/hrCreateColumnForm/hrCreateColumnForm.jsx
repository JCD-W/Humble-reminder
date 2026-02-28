import HrForm from "../hrForm/hrForm"

const HrCreateColumnForm = ({ onClose, onSubmit }) => {
	return (
		<>
			<div className="background-modal screen-centered"></div>
			<div className="screen-centered absolute-centered">
				<HrForm
					title={"Create new column"}
					onClose={onClose}
					onSubmit={onSubmit}
					submitText="CREATE"
					fields={[
						{
							name:"title",
							label: "Column title",
							type: "text",
							required: "Column title required",
						}
					]}
				/>
			</div>
		</>
	)
}

export default HrCreateColumnForm