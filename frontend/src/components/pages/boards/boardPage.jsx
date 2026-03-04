import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getBoard, updateBoard } from "../../../api/boardApi"
import HrHeader from "../../layout/header"
import { ERROR_MESSAGE, MessageContext, NORMAL_MESSAGE } from "../../../context/messageContext"
import { createColumn, getColumns, moveColumn } from "../../../api/columnApi"
import HrColumn from "../../ui/hrColumn/hrColumn"
import { checkConnection } from "../../../api/authApi"
import HrCreateColumnForm from "../../ui/hrCreateColumnForm/hrCreateColumnForm"
import HrNewColumnButton from "../../ui/hrColumn/hrNewColumnButton/hrNewColumnButton"
import HrCreateTaskForm from "../../ui/hrCreateTaskForm/hrCreateTaskForm"
import { createTask } from "../../../api/taskApi"

const HrBoardPage = () => {
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
	const [showCreateColumnForm, setShowCreateColumnForm] = useState(false)
	const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
	const [columns, setColumns] = useState([])
	const [newColumnPosition, setNewColumnPosition] = useState(1)
	const [selectedColumn, setSelectedColumn] = useState(0)
	const [backColumn, setBackColumn] = useState({})
	
	const fetchBoard = async () => {
		if (!(await checkConnection()))
			return navigate("/")
		try {
			setBoard(await getBoard(id, true))
			setColumns(await getColumns(id))
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
			navigate("/")
		}
		setFinishedFetching(true)
	}

	const createNewColumn = async ({ title }) => {
		try {
			await createColumn(id, title, newColumnPosition)
			await fetchBoard()
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
		setShowCreateColumnForm(false)
	}

	const createNewTask = async (data) => {
		if (selectedColumn === 0) {
			showMessage("The task doesn't belong to any columns", NORMAL_MESSAGE)
			return
		}

		try {
			await createTask(selectedColumn, id, data.name, data.description, data.deadline, data["deadline-date"], data.type)
			setSelectedColumn(0)
			fetchBoard()
			showMessage("Task created", NORMAL_MESSAGE)
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
		setShowCreateTaskForm(false)
	}

	const handleMoveColumn = async () => {
		try {
			await moveColumn(id, selectedColumn, backColumn.position + 1)
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
		fetchBoard()
	}

	const changeBoardName = async (name) => {
		try {
			await updateBoard(id, name)
		} catch (err) {
			showMessage(err.response.data.message, ERROR_MESSAGE)
		}
		fetchBoard()
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
				editable={true}
				onEdit={changeBoardName}
			/>
			{finishedFetching ?
				<div className="column-container">
					<HrNewColumnButton
						onClick={() => {
							setShowCreateColumnForm(true)
							setNewColumnPosition(1)
						}}
					/>
					{columns.map((column) => 
						<>
							<HrColumn
								key={column.id}
								data={column}
								onCreate={() => {
									setShowCreateTaskForm(true)
								}}
								selectColumnFunc={setSelectedColumn}
								onRefresh={() => fetchBoard()}
								onHover={setBackColumn}
								onDrop={handleMoveColumn}
							/>
							<HrNewColumnButton
								onClick={() => {
									setShowCreateColumnForm(true)
									setNewColumnPosition(column.order + 1)
								}}
							/>
						</>
					)}
				</div>
			:
				<h2 className="connecting">Loading columns and tasks...</h2>
			}
			{showCreateColumnForm && 
				<HrCreateColumnForm 
					onClose={() => setShowCreateColumnForm(false)}
					onSubmit={createNewColumn}
				/>
			}
			{showCreateTaskForm &&
				<HrCreateTaskForm
					onClose={() => setShowCreateTaskForm(false)}
					onSubmit={createNewTask}
				/>
			}
		</div>
	)
}

export default HrBoardPage