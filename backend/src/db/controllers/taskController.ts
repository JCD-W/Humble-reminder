import db from "../connection.ts"

export default class taskController {
	db: db
	
	constructor (con: db) {
		this.db = con
	}

	async createTask (name: string, desc: string, columnId: number, position: number, type: string = "normal", task_deadline: Date | null = null) {

	}
}