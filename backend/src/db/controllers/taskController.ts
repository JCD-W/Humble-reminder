import db from "../connection.ts"

export default class taskController {
	db: db
	
	constructor (con: db) {
		this.db = con
	}

	async create (name: string, desc: string, columnId: number, position: number, type: string = "normal", task_deadline: Date | null = null) {
		const res = await this.db.query("INSERT INTO task (task_name, task_desc, task_type, task_deadline) VALUES (?, ?, ?, ?)", [name, desc, type, task_deadline])
		await this.db.query("UPDATE column_has_task SET task_position = task_position + 1 WHERE column_id = ? AND task_position >= ?", [columnId, position])
		await this.db.query("INSERT INTO column_has_task (column_id, task_id, task_position) VALUES (?, ?, ?)", [columnId, res.insertId, position])
		return res.insertId
	}

	async getColumnTasks (columnId: number) {
		
	}
}