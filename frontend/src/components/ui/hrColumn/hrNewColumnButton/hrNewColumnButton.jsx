import "./hrNewColumnButton.css"

import { FaPlusCircle } from "react-icons/fa"

const HrNewColumnButton = () => {
	return (
		<div className="hr-separator">
			<hr className="hr-vertical-separator"/>
			<button className="hr-add-columm">
				<FaPlusCircle className="hr-add-column-button"/>
			</button>
			<hr className="hr-vertical-separator"/>
		</div>
	)
}

export default HrNewColumnButton