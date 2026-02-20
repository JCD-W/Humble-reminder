import { useNavigate } from "react-router-dom"
import HrForm from "../../ui/hrForm/hrForm"
import { useContext } from "react"
import { MessageContext } from "../../../context/messageContext"

const ChangePassPage = () => {
	const navigate = useNavigate()
	const { showMessage, ERROR_MESSAGE } = useContext(MessageContext)

	const handlePasswordChange = ({ newPassword, repeatedPassword }) => {
		if (newPassword != repeatedPassword)
			showMessage("Passwords don't match", ERROR_MESSAGE)
	}

	return (
		<main className="screen-centered">
			<HrForm
				title={"Change password"}
				fields={[
					{
						name:"newPassword",
						label: "New password",
						type: "password",
						required: "New password required",
						regex: /^([ñA-Za-z0-9\*\s]){8,}$/i
					},
					{
						name: "repeatedPassword",
						label: "Repeat password",
						type: "password",
						required: "Repeat password",
						regex: /^([ñA-Za-z0-9\*\s]){8,}$/i
					}
				]}
				onSubmit={handlePasswordChange}
			/>
		</main>
	)
}

export default ChangePassPage