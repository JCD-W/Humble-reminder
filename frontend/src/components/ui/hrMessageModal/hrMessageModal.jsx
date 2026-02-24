import { useContext } from "react"
import "./hrMessageModal.css"
import { MessageContext } from "../../../context/messageContext"

const HrMessageModal = () => {
	const { message, showMessageModal, type, ERROR_MESSAGE, NORMAL_MESSAGE, QUESTION_MESSAGE, hideMessage, onAccepted } = useContext(MessageContext)

	return (
		<div className={`message-modal ${showMessageModal ? "show-modal" : "hide-modal"} ${
			type == ERROR_MESSAGE ? "message-error" : "message-normal"
		}`}>
			{type === ERROR_MESSAGE && <span className="message-modal-title">ERROR</span>}
			<span className="message-modal-content">{message}</span>
			{type === QUESTION_MESSAGE ?
				<div className="message-modal-buttons">
					<button
						onClick={() => {
							onAccepted()
							hideMessage()
						}}
						className="message-modal-button" 
					>YES</button>
					<button
						onClick={() => hideMessage()}
						className="message-modal-button" 
					>NO</button>
				</div>
			:
				<button className="message-modal-button" onClick={() => hideMessage()}>OK</button>
			}
		</div>
	)
}

export default HrMessageModal