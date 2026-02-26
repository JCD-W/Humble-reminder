import "./hrThemePicker.css"

import { useContext, useState } from "react"

import { createTheme, getThemes } from "../../../api/themeApi"
import HrThemeSample from "./hrThemeSample/hrThemeSample"
import { FaPlusCircle } from "react-icons/fa"
import HrThemeForm from "./hrThemeForm/hrThemeForm"
import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"

const HrThemePicker = ({ board, onClose }) => {
	const { showMessage } = useContext(MessageContext)

	const [themes, setThemes] = useState([])
	const [newTheme, setNewTheme] = useState({})
	const [themeQuantity, setThemeQuantity] = useState(0)
	const [page, setPage] = useState(0)
	const [creatingTheme, setCreatingTheme] = useState(false)

	const fetchThemes = async () => {
		const resp = await getThemes()
		setThemeQuantity(resp.amount)
		setThemes(resp.themes)
	}

	const createNewTheme = async () => {
		try {
			await createTheme(newTheme.clear, newTheme.primary, newTheme.secondary, newTheme.tertiary, board.id)
			showMessage("Theme created", NORMAL_MESSAGE)
		} catch (err) {
			if (!err.response) {
				console.log(err)
				return
			}
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	const pickTheme = async () => {

	}

	useState(() => {
		fetchThemes()
	}, [])

	return (
		<div className="theme-picker-container flying">
			<span className="theme-picker-title">Theme picker</span>
			{creatingTheme ?
				<HrThemeForm onChange={setNewTheme}/>
			:
				<div className="theme-container">
					{themes.map((theme) =>
						<div className={`${theme.id == board.theme.id && "theme-picked"} theme`}>
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
				<button
					className="theme-picker-button"
					onClick={() => createTheme ? createNewTheme() : pickTheme()}
				>
					{creatingTheme ? "CREATE" : "PICK"}
				</button>
			</div>
		</div>
	)
}

export default HrThemePicker