import "./boardsStyle.css"

import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import HrHeader from "../../layout/header"
import { getBoards } from "../../../api/boardApi"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import HrBoard from "../../ui/hrBoard/hrBoard"
import HrAddBoard from "../../ui/hrAddBoard/hrAddBoard"
import HrPageNavigation from "../../ui/hrPageNavigation/HrPageNavigation"
import { checkConnection } from "../../../api/authApi"
import HrArchiveBoards from "../../ui/hrArchive/hrArchiveBoards"

const BoardsPage = () => {
	const navigate = useNavigate()
	const { showMessage } = useContext(MessageContext)
	const [params, setParams] = useSearchParams()

	const [page, setPage] = useState(0)
	const [boardQuanity, setBoardQuantity] = useState(0)
	const [boards, setBoards] = useState([])
	const [finishedFetching, setFinishedFetching] = useState(false)
	const [showArchive, setShowArchive] = useState(false)

	const calculatePages = (totalQuantity=boardQuanity) => {
		return Math.ceil(totalQuantity / 8)
	}

	const fetchBoards = async (currentPage = page) => {
		if (!(await checkConnection()))
			return navigate("/")
		try {
			const resp = await getBoards(currentPage)
			setBoardQuantity(resp.amount)
			setBoards(resp.boards)
			if (page >= calculatePages(resp.amount)) {
				fetchBoards(page - 1)
				setPage(page - 1)
			}		
			setFinishedFetching(true)
		} catch (err) {
			if (!err.response.data)
				return
			showMessage(err.response.data.message, ERROR_MESSAGE)
			navigate("/")
		}
	}

	const changePage = (newPage) => {
		setPage(newPage)
		setParams({
			page: newPage + 1
		})
	}

	useEffect(() => {
		const paramPage = params.get("page")
		fetchBoards(paramPage ? paramPage - 1 : page)
	}, [page, params.get("page")])

	return (
		<>
			<HrHeader
				title={"Boards"}
				onOpenArchive={() => setShowArchive(!showArchive)}
			/>
			<HrPageNavigation 
				isForMobile
				page={page + 1}
				pages={calculatePages()}
				onPageChange={changePage}
			/>
			<main className="screen-centered" style={{
				height: "84vh"
			}}>
				{finishedFetching ?
					boards.length < 1 ?
						<>
							<h2 className="no-boards">There are no boards so far.</h2>
							<HrAddBoard/>
						</>
					:
						<div className="boards-container">
							{boards.map((board) => 
								<HrBoard
									data={board}
									refreshFunc={() => fetchBoards()}
								/>
							)}
							<HrAddBoard/>
						</div>
				:
					<h2 className="connecting">Loading boards...</h2>
				}
			</main>
			<HrPageNavigation
				isForDesktop
				page={page + 1}
				pages={calculatePages()}
				onPageChange={changePage}
			/>
			{showArchive && <HrArchiveBoards/>}
		</>
	)
}

export default BoardsPage