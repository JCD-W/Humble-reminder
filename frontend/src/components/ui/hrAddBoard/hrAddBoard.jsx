import "./hrAddBoard.css"

import { useState } from "react"
import { FaPlusCircle } from "react-icons/fa"

import HrCreateBoardForm from "../hrCreateBoardForm/hrCreateBoardForm"

const HrAddBoard = () => {
	const [showCreateBoardForm, setShowCreateBoardForm] = useState(false)

	return (
		<>
			<button 
				className="add-board-container"
				title="Create new board"
				onClick={() => setShowCreateBoardForm(true)}
			>
				<FaPlusCircle size={40}/>
			</button>
			{showCreateBoardForm && <HrCreateBoardForm onClose={() => setShowCreateBoardForm(false)}/>}
		</>
	)
}

export default HrAddBoard