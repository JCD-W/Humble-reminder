import "./hrThemeForm.css"

import { useState } from "react"

import HrThemeSample from "../hrThemeSample/hrThemeSample"
import { HexColorPicker } from "react-colorful"

const HrThemeForm = ({ onChange }) => {
	const [theme, setTheme] = useState({
		clear: "d84727",
		primary: "D9D9D9",
		secondary: "B5B5B5",
		tertiary: "2d3142"
	})

	const HrColorPicker = ({ color, onColorChange }) => {
		return (
			<div className="theme-color-container">
				<HexColorPicker
					color={color}
					onChange={onColorChange}
					style={{
						width: "100%",
						height: "87%",
					}}
				/>
				<label
					className="theme-color-box"
					style={{
						backgroundColor: "#"+color
					}}
				/>
			</div>
		)
	}

	const changeColor = (key, color) => {
		setTheme({
			...theme,
			[key]: color
		})
		onChange({
			...theme,
			[key]: color
		})
	}

	return (
		<div className="theme-colors-container">
			<HrThemeSample theme={theme}/>
			<HrColorPicker
				color={theme.clear}
				onColorChange={(color) => changeColor("clear", color.slice(1))}
			/>
			<HrColorPicker
				color={theme.primary}
				onColorChange={(color) => changeColor("primary", color.slice(1))}
			/>
			<HrColorPicker
				color={theme.secondary}
				onColorChange={(color) => changeColor("secondary", color.slice(1))}
			/>
			<HrColorPicker
				color={theme.tertiary}
				onColorChange={(color) => changeColor("tertiary", color.slice(1))}
			/>
		</div>
	)
}

export default HrThemeForm