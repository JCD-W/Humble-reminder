import "./hrThemePicker.css"

import { useState } from "react"

import { getThemes } from "../../../api/themeApi"
import HrThemeSample from "./hrThemeSample/hrThemeSample"
import { FaPlusCircle } from "react-icons/fa"
import HrThemeForm from "./hrThemeForm/hrThemeForm"

const HrThemePicker = ({ board, onClose }) => {
	const [themes, setThemes] = useState([])
	const [themeQuantity, setThemeQuantity] = useState(0)
	const [page, setPage] = useState(0)
	const [creatingTheme, setCreatingTheme] = useState(false)

	const fetchThemes = async () => {
		const resp = await getThemes()
		setThemeQuantity(resp.amount)
		setThemes(resp.themes)
	}

	useState(() => {
		fetchThemes()
	}, [])

	return (
		<div className="theme-picker-container flying">
			<span className="theme-picker-title">Theme picker</span>
			{creatingTheme ?
				<HrThemeForm/>
			:
				<div className="theme-container">
					{themes.map((theme) =>
						<div className={theme.id == board.theme.id && "theme-picked"}>
							<HrThemeSample
								key={theme.id}
								theme={theme}
							/>
						</div>
					)}
					<button
						onClick={() => setCreatingTheme(true)}
						className="create-theme-button"
					>
						<FaPlusCircle size={30}/>
					</button>
				</div>
			}
			<div>
				<button
					className="theme-picker-button"
					onClick={() => onClose()}
				>CLOSE</button>
				<button className="theme-picker-button">
					{creatingTheme ? "CREATE" : "PICK"}
				</button>
			</div>
		</div>
	)
}

export default HrThemePicker