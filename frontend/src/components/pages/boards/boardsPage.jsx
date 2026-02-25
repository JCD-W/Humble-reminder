import "./boardsStyle.css"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import HrHeader from "../../layout/header"
import { getBoards } from "../../../api/boardApi"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import HrBoard from "../../ui/hrBoard/hrBoard"
import HrAddBoard from "../../ui/hrAddBoard/hrAddBoard"
import HrPageNavigation from "../../ui/hrPageNavigation/HrPageNavigation"

const BoardsPage = () => {
	const navigator = useNavigate()
	const { showMessage } = useContext(MessageContext)

	const [page, setPage] = useState(0)
	const [boardQuanity, setBoardQuantity] = useState(0)
	const [boards, setBoards] = useState([])

	const calculatePages = (totalQuantity=boardQuanity) => {
		return Math.ceil(totalQuantity / 8)
	}

	const requestBoards = async (currentPage = page) => {
		try {
			const resp = await getBoards(currentPage)
			setBoardQuantity(resp.amount)
			setBoards(resp.boards)
			if (page >= calculatePages(resp.amount)) {
				requestBoards(page - 1)
				setPage(page - 1)
			}
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
			navigator("/")
		}
	}

	// It was done this way because the useState wasn't triggering
	const changePage = (newPage) => {
		setPage(newPage)
		requestBoards(newPage)
	}

	useState(() => {
		requestBoards(page)
	}, [page])

	return (
		<>
			<HrHeader title={"Boards"}/>
			<HrPageNavigation 
				isForMobile
				page={page + 1}
				pages={calculatePages()}
				onPageChange={changePage}
			/>
			<main className="screen-centered" style={{
				height: "84vh"
			}}>
				<div className="boards-container">
					{boards.map((board) => 
						<HrBoard
							data={board}
							refreshFunc={() => requestBoards()}
						/>
					)}
					<HrAddBoard/>
				</div>
			</main>
			<HrPageNavigation
				isForDesktop
				page={page + 1}
				pages={calculatePages()}
				onPageChange={changePage}
			/>
		</>
	)
}

export default BoardsPage