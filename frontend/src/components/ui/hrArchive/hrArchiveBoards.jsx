import "./hrArchive.css"

import { useEffect, useState } from "react"

import { getBoardArchive } from "../../../api/archiveApi"
import HrPageNavigation from "../hrPageNavigation/HrPageNavigation"
import HrBoardArchive from "../hrBoard/hrBoardArchive"
import { FaAngleDoubleRight } from "react-icons/fa"

const HrArchiveBoards = ({ onRefresh, onClose }) => {
	const [boards, setBoards] = useState([])
	const [page, setPage] = useState(0)
	const [pages, setPages] = useState(0)

	const fetchArchives = async () => {
		const res = await getBoardArchive(page)
		setPages(Math.ceil(res.amount / 8))
		setBoards(res.boards)
	}

	useEffect(() => {
		fetchArchives()
	}, [, page])

	return (
		<aside className="archive-container menu-showup">
			<div className="archive-header">
				<button onClick={onClose} className="archive-go-back">
					<FaAngleDoubleRight size={20}/>
				</button>
				<span className="archive-label">Archived boards</span>
			</div>
			{boards.length < 1 ?
				<span className="archive-message">There are no boards archived...</span>
			:
				<>
					{boards.map((board) => 
						<HrBoardArchive
							key={board.id}
							board={board}
							onRefresh={() => {
								onRefresh()
								fetchArchives()
							}}
						/>
					)}
					{(pages > 1) &&
						<HrPageNavigation
							page={page + 1}
							pages={pages}
							onPageChange={setPage}
						/>
					}
				</>
			}
		</aside>
	)
}

export default HrArchiveBoards