import db from "../connection.ts"
import type taskController from "./taskController.ts"

export default class columnController {
	db: db
	taskController: taskController
	
	constructor (con: db, tc: taskController) {
		this.db = con
		this.taskController = tc
	}

	async create (title: string, boardId: Buffer, position: number): Promise<number> {
		const res = await this.db.query("INSERT INTO board_column (column_title) VALUES (?)", [title])
		await this.db.query("UPDATE board_has_column SET column_position = column_position + 1 WHERE column_position >= ? AND board_id = ?", [position, boardId])
		await this.db.query("INSERT INTO board_has_column (column_id, board_id, column_position) VALUES (?, ?, ?)", [res.insertId, boardId, position])
		return res.insertId
	}

	async getColumns (boardId: Buffer) {
		const columns = await this.db.query(`SELECT c.column_id AS id, c.column_title AS title, c.column_state AS state, bhc.column_position AS "order" FROM board_column c JOIN board_has_column bhc ON bhc.column_id = c.column_id WHERE bhc.board_id = ? ORDER BY bhc.column_position ASC`, [boardId])
		return columns
	}
}