import { useNavigate } from "react-router-dom"
import HrForm from "../hrForm/hrForm"
import { useContext } from "react"
import { MessageContext } from "../../../context/messageContext"
import { createBoard } from "../../../api/boardApi"

const HrCreateBoardForm = ({ onClose }) => {
	const { showMessage } = useContext(MessageContext)
	const navigate = useNavigate()

	const create = async ({ name, description }) => {
		try {
			const boardId = await createBoard(name, description)
			navigate(`/board/${boardId}`)
		} catch (err) {
			showMessage(err.response.data.message)
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