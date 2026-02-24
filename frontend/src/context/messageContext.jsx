import { createContext, useState } from "react"
import HrMessageModal from "../components/ui/hrMessageModal/hrMessageModal"

const MessageContext = createContext()
const NORMAL_MESSAGE = 0
const ERROR_MESSAGE = 1
const QUESTION_MESSAGE = 2

const MessageProvider = ({ children }) => {

	const [message, setMessage] = useState("")
	const [type, setType] = useState(NORMAL_MESSAGE)
	const [showMessageModal, setShowMessageModal] = useState(false)
	const [onAccepted, setOnAccepted] = useState()
	
	const showMessage = (message, type = NORMAL_MESSAGE) => {
		setMessage(message)
		setType(type)
		setShowMessageModal(true)
	}

	const showQuestion = (message, callback) => {
		setMessage(message)
		setType(QUESTION_MESSAGE)
		setOnAccepted(() => callback)
		setShowMessageModal(true)
	}

	const hideMessage = () => {
		setShowMessageModal(false)
	}

	return (
		<MessageContext.Provider
			value={{
				showMessage,
				NORMAL_MESSAGE,
				ERROR_MESSAGE,
				QUESTION_MESSAGE,
				message,
				type,
				showMessageModal,
				hideMessage,
				showQuestion,
				onAccepted
			}}
		>
			<HrMessageModal
			/>
			{children}
		</MessageContext.Provider>
	)
}

export {
	MessageContext,
	MessageProvider,
	ERROR_MESSAGE,
	NORMAL_MESSAGE,
	QUESTION_MESSAGE
}