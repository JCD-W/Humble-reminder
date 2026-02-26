import "./hrThemeForm.css"

import { useState } from "react"

import HrThemeSample from "../hrThemeSample/hrThemeSample"
import { HexColorPicker } from "react-colorful"

const HrThemeForm = () => {
	const [clearColor, setClearColor] = useState("d84727")
	const [primaryColor, setPrimaryColor] = useState("D9D9D9")
	const [secondaryColor, setSecondaryColor] = useState("B5B5B5")
	const [tertiaryColor, setTertiaryColor] = useState("2d3142")

	const HrColorPicker = ({ color, onChange }) => {
		return (
			<div className="theme-color-container">
				<HexColorPicker
					color={color}
					onChange={onChange}
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

	return (
		<div className="theme-colors-container">
			<HrThemeSample
				theme={{
					clear: clearColor,
					primary: primaryColor,
					secondary: secondaryColor,
					tertiary: tertiaryColor
				}}
			/>
			<HrColorPicker
				color={clearColor}
				onChange={(color) => setClearColor(color.slice(1))}
			/>
			<HrColorPicker
				color={primaryColor}
				onChange={(color) => setPrimaryColor(color.slice(1))}
			/>
			<HrColorPicker
				color={secondaryColor}
				onChange={(color) => setSecondaryColor(color.slice(1))}
			/>
			<HrColorPicker
				color={tertiaryColor}
				onChange={(color) => setTertiaryColor(color.slice(1))}
			/>
		</div>
	)
}

export default HrThemeForm