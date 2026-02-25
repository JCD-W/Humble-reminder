import { useContext } from "react"

import HrForm from "../hrForm/hrForm"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { updateBoard } from "../../../api/boardApi"

const HrEditBoardForm = ({ onClose, data, refreshFunc }) => {
	const { showMessage } = useContext(MessageContext)

	const edit = async ({ title, description }) => {
		try {
			await updateBoard(data.id, title, description)
			refreshFunc()
			onClose()
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
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
							name:"title",
							label: "Title",
							type: "text",
							required: "Board title required",
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