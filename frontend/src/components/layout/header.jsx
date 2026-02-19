import { useState } from "react"
import "./header.css"

import { FaArchive, FaRegUser } from "react-icons/fa"
import { FaBars } from "react-icons/fa"

const HrHeader = ({ title }) => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header className="hr-header">
			<h1 className="hr-header-title">{title}</h1>
			<div className="hr-header-buttons">
				<button 
					className="hr-header-mobile hr-header-button"
					onClick={() => setShowMenu(!showMenu)}
				>
					<FaBars/>
				</button>
				<div className={`hr-header-button-menu ${showMenu ? 
					"hr-header-show-menu" : "hr-header-hide-menu"
				}`}>
					<button className="hr-header-button hr-header-menu-button">
						<FaRegUser/>
						<span className="hr-header-mobile hr-header-label">Session</span>
					</button>
					<button className="hr-header-button hr-header-menu-button">
						<FaArchive/>
						<span className="hr-header-mobile hr-header-label">Archive</span>
					</button>
				</div>
			</div>
		</header>
	)
}

export default HrHeader