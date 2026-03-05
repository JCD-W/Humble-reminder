import { useContext, useEffect, useState } from "react"
import { login, refreshToken } from "../../../api/authApi"
import HrForm from "../../ui/hrForm/hrForm"
import HrStickyNote from "../../ui/hrStickyNote/hrStickyNote"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
	const navigate = useNavigate()
	const { showMessage } = useContext(MessageContext)

	const handeLogin = async ({ password }) => {
		try {
			await login(
				"Default",
				password
			)
			navigate("/boards")
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}
	
	const checkIfLogged = async () => {
		try {
			const result = await refreshToken()
			if (result.status == 200)
				navigate("/boards")
		} catch (err) {}
	}

	useEffect(() => {
		checkIfLogged()
	}, [])

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