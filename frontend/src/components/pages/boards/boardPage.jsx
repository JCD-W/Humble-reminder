import { useState } from "react"
import { useParams } from "react-router-dom"

import { getBoard } from "../../../api/boardApi"
import HrHeader from "../../layout/header"

export default () => {
	const { id } = useParams()

	const [board, setBoard] = useState({})
	
	const fetchBoard = async () => {
		setBoard(await getBoard(id))
	}

	useState(() => {
		fetchBoard()
	}, [])

	return (
		<>
			<HrHeader
				title={board.title ?? "..."}
				back="/boards"
			/>
		</>
	)
}