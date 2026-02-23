import "./boardsStyle.css"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import HrHeader from "../../layout/header"
import { getBoards } from "../../../api/boardApi"
import { MessageContext } from "../../../context/messageContext"
import HrBoard from "../../ui/hrBoard/hrBoard"
import HrAddBoard from "../../ui/hrAddBoard/hrAddBoard"

const BoardsPage = () => {
	const navigator = useNavigate()
	const { showMessage } = useContext(MessageContext)

	const [page, setPage] = useState(0)
	const [boardQuanity, setBoardQuantity] = useState(0)
	const [boards, setBoards] = useState([])

	const requestBoards = async () => {
		try {
			const resp = await getBoards(page)
			setBoardQuantity(resp.amount)
			setBoards(resp.boards)
		} catch (err) {
			showMessage(err.response.data.message)
			navigator("/")
		}
	}

	useState(() => {
		requestBoards()
	}, [page])

	return (
		<>
			<HrHeader title={"Boards"}/>
			<main className="boards-container">
				{boards.map((board) => 
					<HrBoard data={board}/>
				)}
				<HrAddBoard/>
			</main>
		</>
	)
}

export default BoardsPage