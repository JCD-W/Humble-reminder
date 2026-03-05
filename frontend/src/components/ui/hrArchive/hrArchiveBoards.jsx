import { useEffect, useState } from "react"
import "./hrArchive.css"
import { getBoardArchive } from "../../../api/archiveApi"

const HrArchiveBoards = () => {
	const [boards, setBoards] = useState([])
	const [page, setPage] = useState(0)
	const [pages, setPages] = useState(0)

	const fetchArchives = async () => {
		const res = await getBoardArchive(page)
		setPages(Math.ceil(res.amount / 9))
	}

	useEffect(() => {
		fetchArchives()
	}, [, page])

	return (
		<aside className="archive-container menu-showup">

		</aside>
	)
}

export default HrArchiveBoards