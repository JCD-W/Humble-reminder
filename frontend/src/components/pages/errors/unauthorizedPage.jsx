import { useEffect, useState } from "react"
import "./errorStyle.css"

import { IoAlertCircle } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const UnauthorizedPage = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 2000)
	}, [])
	
	return (
		<main className="screen-centered">
			<IoAlertCircle size={200}/>
			<h1 className="error-title">You're not allowed to see this board</h1>
			<h2 className="error-subtitle">Redirecting...</h2>
		</main>
	)
}

export default UnauthorizedPage