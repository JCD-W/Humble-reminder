import "./errorStyle.css"

import { FaRegQuestionCircle } from "react-icons/fa"

const PageNotFound = () => {
	return (
		<main className="screen-centered">
			<FaRegQuestionCircle size={200}/>
			<h1 className="error-title">ERROR 404</h1>
			<h2 className="error-subtitle">Page not found.</h2>
		</main>
	)
}

export default PageNotFound