import HrForm from "../hrForm/hrForm"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"

import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { createBoard } from "../../../api/boardApi"

const HrEditBoardForm = ({ onClose }) => {
	const { showMessage } = useContext(MessageContext)
	const navigate = useNavigate()

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

export default HrEditBoardForm