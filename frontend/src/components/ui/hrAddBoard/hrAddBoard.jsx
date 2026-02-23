import "./hrAddBoard.css"

import { FaPlusCircle } from "react-icons/fa"

const HrAddBoard = () => {
	return (
		<button 
			className="add-board-container"
			title="Create new board"
		>
			<FaPlusCircle size={40}/>
		</button>
	)
}

export default HrAddBoard