import { createContext, useState } from "react"
import HrMessageModal from "../components/ui/hrMessageModal/hrMessageModal"

const MessageContext = createContext()

const MessageProvider = ({ children }) => {
	const NORMAL_MESSAGE = 0
	const ERROR_MESSAGE = 1

	const [message, setMessage] = useState("")
	const [type, setType] = useState(NORMAL_MESSAGE)
	const [showMessageModal, setShowMessageModal] = useState(false)
	
	const showMessage = (message, type = ERROR_MESSAGE) => {
		setMessage(message)
		setType(type)
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
				message,
				type,
				showMessageModal,
				hideMessage
			}}
		>
			<HrMessageModal/>
			{children}
		</MessageContext.Provider>
	)
}

export {
	MessageContext,
	MessageProvider,
}