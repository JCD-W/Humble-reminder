import "./hrStickyNote.css"

const HrStickyNote = ({ title, content }) => {
	return (
		<div className="note-container">
			<span>{title}</span>
			<span>{content}</span>
		</div>
	)
}

export default HrStickyNote