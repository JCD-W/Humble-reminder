import "./hrThemePicker.css"

import { useState } from "react"

import { getThemes } from "../../../api/themeApi"
import HrThemeSample from "./hrThemeSample/hrThemeSample"

const HrThemePicker = ({ board, onClose }) => {
	const [themes, setThemes] = useState([])
	const [themeQuantity, setThemeQuantity] = useState(0)
	const [page, setPage] = useState(0)

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
			<span className="theme-picker-title">Pick theme</span>
			<div className="theme-container">
				{themes.map((theme) =>
					<div className={theme.id == board.theme.id && "theme-picked"}>
						<HrThemeSample
							key={theme.id}
							theme={theme}
						/>
					</div>
				)}
			</div>
			<button
				className="theme-picker-close"
				onClick={() => onClose()}
			>CLOSE</button>
		</div>
	)
}

export default HrThemePicker