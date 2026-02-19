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

	async getColumnTasks (columnId: number, state: string = "active") {
		return await this.db.query(
			"SELECT t.task_id AS id, t.task_name AS name, t.task_desc AS description, t.task_state AS state,"+
			"t.task_type AS type, t.task_deliver AS deliver_url, t.task_deadline AS deadline, t.task_creation AS creation,"+
			"t.task_delivered AS delivery_date, cht.task_position AS position FROM task t "+
			"JOIN column_has_task cht ON cht.task_id = t.task_id WHERE cht.column_id = ? AND t.task_state = ? ORDER BY cht.task_position ASC",
			[columnId, state]
		)
	}

	async getTaskById (taskId: number) {
		const [res] = await this.db.query(
			"SELECT t.task_id AS id, t.task_name AS name, t.task_desc AS description, t.task_state AS state,"+
			"t.task_type AS type, t.task_deliver AS deliver_url, t.task_deadline AS deadline, t.task_creation AS creation,"+
			"t.task_delivered AS delivery_date, cht.task_position AS position, cht.column_id AS \"column\" FROM task t "+
			"JOIN column_has_task cht ON cht.task_id = t.task_id WHERE cht.task_id = ?", [taskId]
		)
		return res
	}

	async moveTaskColumn (taskId: number, oldColumn: number, newColumn: number, position: number) {
		await this.db.query("UPDATE column_has_task SET task_position = task_position + 1 WHERE column_id = ? AND task_position >= ?", [newColumn, position])
		await this.db.query("UPDATE column_has_task SET column_id = ? WHERE task_id = ? AND column_id = ?", [newColumn, taskId, oldColumn])
		await this.db.query("UPDATE column_has_task SET task_position = task_position - 1 WHERE column_id = ? AND task_position >= ?", [oldColumn, position])
	}

	async moveTask (taskId: number, columnId: number, position: number) {
		await this.db.query("UPDATE column_has_task SET task_position = task_position + 1 WHERE task_position >= ? AND column_id = ?", [position, columnId])
		await this.db.query("UPDATE column_has_task SET task_position = ? WHERE task_id = ?", [position, taskId])
	}

	async update (taskId: number, newData: Map<string, any>) {
		await this.db.update("task", newData, taskId, "task_id")
	}
}