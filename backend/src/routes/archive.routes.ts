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

		const boards = (await this.boardController.getUserBoards(req.user.id, page * 9, "archived")).map((board: any) => ({
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

	restoreBoard = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		console.log(board)
		if (board.board_state !== "archived")
			return res.status(400).send({message: "The board is not archived"})

		await this.boardController.update(boardId, {
			board_state: "active"
		})

		return res.status(400).send({
			message: "Board restored"
		})
	}

	restoreColumn = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Column restored`
		})
	}

	restoreTask = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Task restored`
		})
	}

	deleteBoardArchive = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Archive deleted`
		})
	}

	deleteColumnArchive = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Archive deleted`
		})
	}

	deleteTaskArchive = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Archive deleted`
		})
	}
}