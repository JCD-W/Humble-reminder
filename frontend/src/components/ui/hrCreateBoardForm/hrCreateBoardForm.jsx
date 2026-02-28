import HrForm from "../hrForm/hrForm"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"

import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { createBoard } from "../../../api/boardApi"

const HrCreateBoardForm = ({ onClose }) => {
	const { showMessage } = useContext(MessageContext)
	const navigate = useNavigate()

	const create = async ({ name, description }) => {
		try {
			const boardId = await createBoard(name, description)
			navigate(`/board/${boardId}`)
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
					title={"Create new board"}
					onSubmit={create}
					submitText="CREATE"
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
							type: "textarea",
							maxLength: 512
						}
					]}
				/>
			</div>
		</>
	)
}

export default HrCreateBoardForm