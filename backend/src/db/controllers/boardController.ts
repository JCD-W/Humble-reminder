import db from "../connection.ts"
import type columnController from "./columnController.ts"
import type taskController from "./taskController.ts"
import type themeController from "./themeController.ts"

export default class boardController {
	db: db
	columnController: columnController
	taskController: taskController
	themeController: themeController

	constructor (con: db, cc: columnController, tc: taskController, thc: themeController) {
		this.db = con
		this.columnController = cc
		this.taskController = tc
		this.themeController = thc
	}

	/* This whole process could had been made into a trigger, but I made it this way so it is easier to change if needed */
	async create (title: string, desc: string, userId: Buffer) : Promise<Buffer | string> {
		const id = await this.db.getUUID()
		await this.db.query("INSERT INTO board (board_id, board_title, board_desc) VALUES (?, ?, ?)", [id, title, desc])
		await this.db.query("INSERT INTO user_has_board (board_id, user_id) VALUES (?, ?)", [id, userId])
		await this.db.query("INSERT INTO board_has_theme (board_id, theme_id) VALUES (?, ?)", [id, 1])

		const backlogId = await this.columnController.create("Backlog", id, 1)
		await this.columnController.create("In process", id, 2)
		await this.columnController.create("Done", id, 3)

		await this.taskController.create(
			"Finish this board", 
			"Create new tasks, move them around, modify the columns and write an actual description.", 
			backlogId, 1
		)
		return id
	}

	async getBoardById (boardId: Buffer) {
		const [board] = await this.db.query("SELECT board_title, board_desc, board_state, board_creation, board_recent FROM board WHERE board_id = ?", [boardId])
		return board
	}

	async update (boardId: Buffer, newData: Map<string, any>) {
		await this.db.update("board", newData, boardId, "board_id")
	}

	async createDefaults (userId: Buffer) {
		if ((await this.getAmountUserBoards(userId)) < 1) {
			console.log("Creating example board...")
			await this.create("Example board", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit lectus, sit amet elementum metus pulvinar quis. Aenean efficitur pulvinar ligula, a pharetra nisl bibendum eget. Curabitur facilisis mattis lacus sit amet tempus. Quisque arcu urna, scelerisque ut turpis id, porta varius neque. Fusce sagittis rhoncus rhoncus. Nulla vitae blandit diam. Nunc elementum vel orci vitae sollicitudin. Etiam eu consequat orci, ut fringilla tortor. Duis eu tortor eu sem maximus aliquam sapien.", userId)
		}
	}

	async updateRecentDate (boardId: Buffer) {
		await this.db.query("UPDATE board SET board_recent = ? WHERE board_id = ?", [new Date(), boardId])
	}

	async getUserBoards (userId: Buffer, offset: number = 0, state: string = "active", limit: number = 8) {
		const res = await this.db.query(
			"SELECT b.board_id, b.board_title, b.board_desc, b.board_state, b.board_creation, b.board_recent, t.clear_color, "+
			"t.primary_color, t.secondary_color, t.tertiary_color, bht.theme_id AS theme_id FROM board b JOIN user_has_board uhc ON b.board_id = uhc.board_id "+
			"JOIN board_has_theme bht ON bht.board_id = b.board_id JOIN theme t ON t.theme_id = bht.theme_id "+
			"WHERE uhc.user_id = ? AND b.board_state = ? ORDER BY b.board_recent DESC LIMIT ? OFFSET ?", 
			[userId, state, limit.toString(), offset.toString()]
		)
		return res
	}

	async getAmountUserBoards (userId: Buffer, state: string = "active") {
		const [res] = await this.db.query("SELECT COUNT(b.board_id) as amount FROM board b JOIN user_has_board uhc ON b.board_id = uhc.board_id WHERE uhc.user_id = ? AND b.board_state = ?", [userId, state])
		return res.amount
	}

	async setTheme (boardId: Buffer, themeId: number) {
		await this.db.query("UPDATE board_has_theme SET theme_id = ? WHERE board_id = ?", [themeId, boardId])
	}

	async getTheme (boardId: Buffer) {
		const [{themeId}] = await this.db.query("SELECT theme_id as themeId FROM board_has_theme WHERE board_id = ?", [boardId])
		const theme = await this.themeController.getThemeById(themeId)
		return {
			...theme,
			id: themeId
		}
	}
}