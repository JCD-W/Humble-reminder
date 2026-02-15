import { useContext } from "react"
import "./hrMessageModal.css"
import { MessageContext } from "../../../context/messageContext"

const HrMessageModal = () => {
	const { message, showMessageModal, type, ERROR_MESSAGE, NORMAL_MESSAGE, hideMessage } = useContext(MessageContext)

	return (
		<div className={`message-modal ${showMessageModal ? "show-modal" : "hide-modal"} ${
			type === NORMAL_MESSAGE ? "message-normal" :
			/*type == ERROR_MESSAGE ? */ "message-error"
		}`}>
			{type === ERROR_MESSAGE && <span className="message-modal-title">ERROR</span>}
			<span className="message-modal-content">{message}</span>
			<button className="message-modal-button" onClick={() => hideMessage()}>OK</button>
		</div>
	)
}

export default HrMessageModal