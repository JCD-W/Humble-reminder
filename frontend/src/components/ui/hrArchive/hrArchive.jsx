import { FaAngleDoubleRight } from "react-icons/fa"
import { getColumnArchive, getTaskArchive } from "../../../api/archiveApi"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import HrColumnArchive from "../hrColumn/hrColumnArchive"
import HrTaskArchive from "../hrTask/hrTaskArchive"
import "./hrArchive.css"

import { useContext, useEffect, useState } from "react"

const HrArchive = ({ board, onRefresh, onClose }) => {
	const { showMessage } = useContext(MessageContext)

	const [columns, setColumns] = useState([])
	const [tasks, setTasks] = useState([])

	const fetchArchive = async () => {
		try {
			setColumns(await getColumnArchive(board))
			setTasks(await getTaskArchive(board))
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
	}

	useEffect(() => {
		fetchArchive()
	}, [])

	return (
		<aside className="archive-container menu-showup">
			<button onClick={onClose} className="archive-go-back archive-go-back-flying">
				<FaAngleDoubleRight size={20}/>
			</button>
			{columns.map((column) => 
				<HrColumnArchive data={column} onRefresh={() => {
					onRefresh()
					fetchArchive()
				}}/>
			)}
			{tasks.map((task) =>
				<HrTaskArchive data={task} onRefresh={() => {
					onRefresh()
					fetchArchive()
				}}/>
			)}
		</aside>
	)
}

export default HrArchive