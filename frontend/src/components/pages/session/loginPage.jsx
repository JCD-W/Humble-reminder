import { useContext } from "react"
import { login } from "../../../api/authApi"
import HrForm from "../../ui/hrForm/hrForm"
import HrStickyNote from "../../ui/hrStickyNote/hrStickyNote"
import { MessageContext } from "../../../context/messageContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
	const navigate = useNavigate()
	const { showMessage, ERROR_MESSAGE } = useContext(MessageContext)

	const handeLogin = async (data) => {
		try {
			await login(
				"Default",
				data.password
			)
			navigate(0)
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	return (
		<>
			<main className="screen-centered">
				<HrForm
					title={"Login"}
					fields={[
						{
							name: "password",
							label: "Password",
							type: "password",
							required: "Password required",
							regex: /^([ñA-Za-z0-9\*\s]){8,}$/i
						}
					]}
					onSubmit={handeLogin}
				/>
			</main>
			<HrStickyNote title={"Default password:"} content={"12345678*"}/>
		</>
	)
}

export default LoginPage