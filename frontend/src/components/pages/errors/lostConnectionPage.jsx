import "./errorStyle.css"

import { IoCloudOffline } from "react-icons/io5"

const LostConnection = () => {
	return (
		<main className="screen-centered">
			<IoCloudOffline size={200}/>
			<h1 className="error-title">Lost connection to the server</h1>
			<h2 className="error-subtitle">Come back later.</h2>
		</main>
	)
}

export default LostConnection