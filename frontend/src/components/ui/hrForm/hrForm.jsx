import HrCheckbox from "./hrCheckbox/hrCheckbox"
import "./hrForm.css"

import { useForm } from "react-hook-form"

const HrForm = ({ title, fields, buttons, onSubmit = ()=>{}, onClose, submitText, customFields=<></> }) => {
	const {
		register, handleSubmit, control,
		formState: { errors }
	} = useForm({
		defaultValues: fields
			.filter((field) => field.default)
			.reduce((acc, field) => {
				acc[field.name] = field.default
				return acc
			}, {})
	})

	return (
		<>
			{title && 
				<h1 className="form-title">{title}</h1>
			}
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				{fields.map((field) => {
					let options = {}
					if (field.required)
						options.required = field.required
					if (field.regex)
						options.pattern = {
							value: field.regex,
							message: `${field.label} invalid`
						}
					if (field.maxLength)
						options.maxLength = {
							value: field.maxLength,
							message: `${field.label} too long`
						}
					return (
						<div className="form-field" key={field.name}>
							<label className="form-label">{field.label}</label>
							{
								field.type === "textarea" ?
									<textarea
										className="form-input form-textarea"
										{...register(field.name, options)}	
										id={field.name}
									></textarea>
								: field.type === "button" ?
									<button
										type="button"
										className="form-button"
										onClick={() => field.onClick()}
										id={field.name}
									>{field.text}</button>
								: field.type === "select" ?
									<select
										className="form-select"
										name={field.name}
										{...register(field.name, options)}
										id={field.name}
									>
										{field.options.map((option) => 
											<option value={option.value}>{option.label}</option>
										)}
									</select>
								: field.type === "check" ?
									<HrCheckbox
										name={field.name}
										ifOn={field.ifOn}
										ifOff={field.ifOff}
										checked={field.checked ?? false}
										registerFunc={register}
										options={options}
										control={control}
										id={field.name}
									/>
								:
									<input
										className="form-input" 
										name={field.name}
										type={field.type}
										id={field.name}
										{...register(field.name, options)}	
									/>
							}
							{Object.keys(errors).includes(field.name) &&
								<span className="form-error">{errors[field.name].message}</span>
							}
						</div>
					)
				})}
				{customFields}
				{buttons ?? 
					<div className={onClose ? "spaced": "centered"}>
						{onClose && 
							<button
								className="form-submit"
								onClick={onClose}
								type="button"
							>CANCEL</button>
						}
						<input className="form-submit" id={`${title}-submit-button`} type="submit" value={submitText ?? "SUBMIT"}/>
					</div>
				}
			</form>
		</>
	)
}

export default HrForm