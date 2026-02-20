import { useNavigate } from "react-router-dom"
import HrForm from "../../ui/hrForm/hrForm"
import { useContext } from "react"
import { MessageContext } from "../../../context/messageContext"
import { changePassword } from "../../../api/authApi"
import { SessionContext } from "../../../context/sessionContext"

const ChangePassPage = () => {
	const navigate = useNavigate()
	const { showMessage, NORMAL_MESSAGE } = useContext(MessageContext)
	const { logOff } = useContext(SessionContext)

	const handlePasswordChange = async ({ newPassword, repeatedPassword }) => {
		if (newPassword != repeatedPassword)
			return showMessage("Passwords don't match")

		try {
			await changePassword(newPassword)
			await logOff()
			navigate("/")
			showMessage("Password changed, you can log in again.", NORMAL_MESSAGE)
		} catch (err) {
			showMessage(err.response.data.message)
		}
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