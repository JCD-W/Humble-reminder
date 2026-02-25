import "./hrThemeSample.css"

const HrThemeSample = ({ theme }) => {
	return (
		<div 
			className="sample-container"
			style={{
				"--clear-color": "#"+theme.clear,
				"--primary-color": "#"+theme.primary,
				"--seconadry-color": "#"+theme.secondary,
				"--tertiary-color": "#"+theme.tertiary
			}}
		>
			<span className="sample-title">Sample text</span>
			<div className="sample-column">
				<div className="sample-column-header">Column</div>
				<div className="sample-task">Task</div>
			</div>
		</div>
	)
}

export default HrThemeSample