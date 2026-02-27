import { useContext, useState } from "react"
import "./header.css"

import { FaAngleLeft, FaArchive, FaRegUser } from "react-icons/fa"
import { FaBars } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { SessionContext } from "../../context/sessionContext"

const HrHeader = ({ title, back }) => {
	const navigate = useNavigate()
	const { logOff } = useContext(SessionContext)

	const [showMenu, setShowMenu] = useState(false)
	const [showUserMenu, setShowUserMenu] = useState(false)

	const changePassword = () => {
		navigate("/change-pass")
	}

	const closeSession = () => {
		logOff()
		navigate("/")
	}

	return (
		<header className="hr-header">
			{back && 
				<Link className="hr-header-back" to={back}>
					<FaAngleLeft size={24}/>
				</Link>
			}
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
					<button 
						className="hr-header-button hr-header-menu-button"
						onClick={() => setShowUserMenu(!showUserMenu)}
					>
						<FaRegUser/>
						<span className="hr-header-mobile hr-header-label">Session</span>
					</button>
					
					{showUserMenu && (
						<div className={`hr-submenu`}>
							<button 
								className="hr-header-submenu-button hr-header-menu-button"
								onClick={() => changePassword()}
							>
								<span className="hr-header-label">Change password</span>
							</button>
							<button 
								className="hr-header-submenu-button hr-header-menu-button"
								onClick={() => closeSession()}
							>
								<span className="hr-header-label">Close session</span>
							</button>
						</div>
					)}

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