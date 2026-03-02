import { useWatch } from "react-hook-form"
import "./hrCheckbox.css"

const HrCheckbox = ({ name, ifOn, ifOff, registerFunc, options, control }) => {
	const isChecked = useWatch({
		control,
		name,
   		defaultValue: false
  	})

	return (
		<div className="check-container">
			<input
				type="checkbox"
				id={name}
				className="check-input"
				{...registerFunc(name, options)}
			/>
			<label className={`check-label ${isChecked ? "check-label-active" : "check-label-inactive"}`} htmlFor={name}/>
			{isChecked ?
				<input
					{...ifOn}
					{...registerFunc(ifOn.name, options)}
				/>
			: ifOff}
		</div>
	)
}

export default HrCheckbox