import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getBoard } from "../../../api/boardApi"
import HrHeader from "../../layout/header"
import { ERROR_MESSAGE, MessageContext } from "../../../context/messageContext"
import { getColumns } from "../../../api/columnApi"
import HrColumn from "../../ui/hrColumn/hrColumn"
import { checkConnection } from "../../../api/authApi"
import HrNewColumnButton from "../../ui/hrColumn/hrNewColumnButton/hrNewColumnButton"

export default () => {
	const { id } = useParams()
	const { showMessage } = useContext(MessageContext)
	const navigate = useNavigate()

	const [board, setBoard] = useState({
		theme: {
			clear: "d84727",
			primary: "D9D9D9",
			secondary: "B5B5B5",
			tertiary: "2d3142",
		}
	})
	const [finishedFetching, setFinishedFetching] = useState(false)
	const [columns, setColumns] = useState([])
	
	const fetchBoard = async () => {
		if (!(await checkConnection()))
			return navigate("/")
		try {
			setBoard(await getBoard(id))
			setColumns(await getColumns(id))
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
			navigate("/")
		}
		setFinishedFetching(true)
	}

	useState(() => {
		fetchBoard()
	}, [])

	return (
		<div
			style={{
				"--clear-color": "#"+board.theme.clear,
				"--primary-color": "#"+board.theme.primary,
				"--secondary-color": "#"+board.theme.secondary,
				"--tertiary-color": "#"+board.theme.tertiary
			}}
		>
			<HrHeader
				title={board.title ?? "..."}
				back="/boards"
			/>
			{finishedFetching ?
				<div className="column-container">
					<HrNewColumnButton/>
					{columns.map((column) => 
						<>
							<HrColumn data={column}/>							
							<HrNewColumnButton/>
						</>
					)}
				</div>
			:
				<h2 className="connecting">Loading columns and tasks...</h2>
			}
		</div>
	)
}