import "./hrThemePicker.css"

import { useContext, useState } from "react"

import { assignTheme, createTheme, getThemes } from "../../../api/themeApi"
import HrThemeSample from "./hrThemeSample/hrThemeSample"
import { FaPlusCircle } from "react-icons/fa"
import HrThemeForm from "./hrThemeForm/hrThemeForm"
import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"
import HrPageNavigation from "../hrPageNavigation/HrPageNavigation"

const HrThemePicker = ({ board, onClose, refreshFunc }) => {
	const { showMessage } = useContext(MessageContext)

	const [themes, setThemes] = useState([])
	const [newTheme, setNewTheme] = useState({})
	const [currentThemeId, setCurrentThemeId] = useState(board.theme.id)
	const [themeQuantity, setThemeQuantity] = useState(0)
	const [page, setPage] = useState(0)
	const [creatingTheme, setCreatingTheme] = useState(false)

	const fetchThemes = async (page=0) => {
		setPage(page)
		const resp = await getThemes(page)
		setThemeQuantity(resp.amount)
		setThemes(resp.themes)
	}

	const createNewTheme = async () => {
		try {
			await createTheme(newTheme.clear, newTheme.primary, newTheme.secondary, newTheme.tertiary, board.id)
			showMessage("Theme created", NORMAL_MESSAGE)
			refreshFunc()
		} catch (err) {
			if (!err.response) {
				console.log(err)
				return
			}
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	const pickTheme = async () => {
		try {
			await assignTheme(board.id, currentThemeId)
			showMessage("Theme changed", NORMAL_MESSAGE)
			refreshFunc()
		} catch (err) {
			if (!err.response) {
				console.log(err)
				return
			}
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	const calculatePages = (totalQuantity=themeQuantity) => {
		return Math.ceil(totalQuantity / 20)
	}

	const changePage = (page) => {
		fetchThemes(page)
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
						<button
							className={`${theme.id == currentThemeId ? "theme-picked" : "theme-not-picked"} theme`}
							onClick={() => setCurrentThemeId(theme.id)}
						>
							<HrThemeSample
								key={theme.id}
								theme={theme}
							/>
						</button>
					)}
					<button
						onClick={() => setCreatingTheme(true)}
						className="create-theme-button"
					>
						<FaPlusCircle size={30}/>
					</button>
				</div>
			}
			{themeQuantity > 20 &&
				<HrPageNavigation
					page={page + 1}
					pages={calculatePages()}
					onPageChange={changePage}
				/>			
			}
			<div>
				<button
					className="theme-picker-button"
					onClick={() => onClose()}
				>CLOSE</button>
				<button
					className="theme-picker-button"
					onClick={() => {
						if (creatingTheme)
							createNewTheme()
						else
							pickTheme()
					}}
				>
					{creatingTheme ? "CREATE" : "PICK"}
				</button>
			</div>
		</div>
	)
}

export default HrThemePicker