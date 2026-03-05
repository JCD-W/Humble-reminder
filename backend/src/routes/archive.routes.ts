import type {Request, Response} from "express"
import Router from "express"
import type boardController from "../db/controllers/boardController.ts"
import type columnController from "../db/controllers/columnController.ts"
import type taskController from "../db/controllers/taskController.ts"

export default class archiveRoutes {
	routes = Router()
	boardController: boardController
	columnController: columnController
	taskController: taskController

	constructor (bc: boardController, cc: columnController, tc: taskController) {
		this.boardController = bc
		this.columnController = cc
		this.taskController = tc

		this.routes.get("/", this.getBoardArchives)
		this.routes.get("/column/:board", this.getColumnArchive)
		this.routes.get("/task/:board", this.getTaskArchive)
		this.routes.post("/board/:id", this.restoreBoard)
		this.routes.post("/column/:id", this.restoreColumn)
		this.routes.post("/task/:id", this.restoreTask)
		this.routes.delete("/board/:id", this.deleteBoardArchive)
		this.routes.delete("/column/:id", this.deleteColumnArchive)
		this.routes.delete("/task/:id", this.deleteTaskArchive)
	}

	getBoardArchives = async (req: Request, res: Response) => {
		const page = req.query.page ?? 0
		const amount = await this.boardController.getAmountUserBoards(req.user.id, "archived")

		const boards = (await this.boardController.getUserBoards(req.user.id, page * 8, "archived")).map((board: any) => ({
			id: board.board_id.toString("hex"),
			title: board.board_title,
			description: board.board_desc,
			state: board.board_state,
			creation: board.board_creation,
			recent: board.board_recent
		}))

		return res.status(200).send({
			boards,
			amount
		})
	}

	getColumnArchive = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.board, "hex")

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		const columns = await this.columnController.getColumns(boardId, "archived")

		return res.status(200).send(columns)
	}

	getTaskArchive = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.board, "hex")

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		const tasks = await this.taskController.getTasks(boardId, "archived")

		return res.status(200).send(tasks)
	}

	restoreBoard = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		
		if (board.board_state !== "archived")
			return res.status(400).send({message: "The board is not archived"})

		await this.boardController.update(boardId, {
			board_state: "active"
		})

		return res.status(200).send({
			message: "Board restored"
		})
	}

	restoreColumn = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Column not specified"})		
		const columnId = parseInt(req.params.id)
		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "archived")
			return res.status(400).send({message: `The column is not archived`})

		await this.columnController.update(columnId, {
			column_state: "active"
		})

		return res.status(200).send({
			message: `Column restored`
		})
	}

	restoreTask = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})
		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})
		if (task.state !== "archived")
			return res.status(400).send({message: `The task is not archived`})

		await this.taskController.update(taskId, {
			task_state: "active"
		})

		res.status(200).send({
			message: `Task restored`
		})
	}

	deleteBoardArchive = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		
		await this.boardController.update(boardId, {
			board_state: "deleted"
		})

		return res.status(200).send({
			message: `Board deleted`
		})
	}

	deleteColumnArchive = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Column not specified"})		
		const columnId = parseInt(req.params.id)
		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})

		await this.columnController.update(columnId, {
			column_state: "deleted"
		})

		return res.status(200).send({
			message: `Column deleted`
		})
	}

	deleteTaskArchive = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})
		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})

		await this.taskController.update(taskId, {
			task_state: "deleted"
		})

		return res.status(200).send({
			message: `Archive deleted`
		})
	}
}