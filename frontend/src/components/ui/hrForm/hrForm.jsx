import "./hrForm.css"

import { useForm } from "react-hook-form"

const HrForm = ({ title, fields, buttons, onSubmit = ()=>{} }) => {
	const {
		register, handleSubmit,
		formState: { errors }
	} = useForm()

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
					return (
						<div className="form-field" key={field.name}>
							<label className="form-label">{field.label}</label>
							<input
								className="form-input" 
								name={field.name}
								type={field.type}
								{...register(field.name, options)}	
							/>
							{Object.keys(errors).includes(field.name) &&
								<span className="form-error">{errors[field.name].message}</span>
							}
						</div>
					)
				})}
				{buttons ?? <input type="submit" value={"SUBMIT"}/>}
			</form>
		</>
	)
}

export default HrForm