import db from "../connection.ts"

export default class columnController {
	db: db
	
	constructor (con: db) {
		this.db = con
	}

	async createColumn (title: string, boardId: Buffer, position: number): Promise<number> {
		const res = await this.db.query("INSERT INTO board_column (column_title) VALUES (?)", [title])
		await this.db.query("INSERT INTO board_has_column (column_id, board_id, column_position) VALUES (?, ?, ?)", [res.insertId, boardId, position])
		return 	res.insertId
	}
}