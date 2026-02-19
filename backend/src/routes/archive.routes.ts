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
		this.routes.get("/task/:column", this.getTaskArchive)
		this.routes.post("/column/:id", this.restoreColumn)
		this.routes.post("/task/:id", this.restoreTask)
		this.routes.delete("/:id", this.deleteArchive)
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

	getTaskArchive = (req: Request, res: Response) => {
		res.status(200).send({
			id: 0
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

	deleteArchive = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Archive deleted`
		})
	}
}