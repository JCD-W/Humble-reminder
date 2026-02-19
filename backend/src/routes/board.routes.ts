import type {Request, Response} from "express"
import Router from "express"
import type boardController from "../db/controllers/boardController.ts"


export default class boardRoutes {
	routes = Router()
	boardController: boardController

	constructor (bc: boardController) {
		this.boardController = bc

		this.routes.post("/", this.create)
		this.routes.put("/:id", this.updateBoard)
		this.routes.delete("/:id", this.deleteBoard)
		this.routes.get("/:id", this.getBoard)
		this.routes.get("/", this.getBoards)
	}

	create = async (req: Request, res: Response) => {
		const title = req.body.title
		const desc = req.body.description

		if (!title || !desc) {
			return res.status(400).send({
				message: "Board title or description needed"
			})
		}

		const boardId = await this.boardController.create(title, desc, req.user.id)

		return res.status(200).send({
			message: `New "${title}" board created`,
			board: boardId.toString("hex")
		})
	}

	updateBoard = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})

		if (!req.body.title && !req.body.description)
			return res.status(304).send({message: "Nothing changed"})

		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		if (board.board_state !== "active")
			return res.status(400).send({message: "The board is deleted/archived"})

		await this.boardController.update(boardId, {
			"board_title": req.body.title,
			"board_desc": req.body.description,
		})

		return res.status(200).send({
			message: "Board updated"
		})
	}

	deleteBoard = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})

		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		if (board.board_state !== "active")
			return res.status(400).send({message: "The board is already deleted/archived"})

		await this.boardController.update(boardId, {
			"board_state": "archived"
		})

		return res.status(200).send({
			message: "Board deleted"
		})
	}

	getBoard = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Board not specified"})

		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		/* Specifies if the board is being requested not as part of a list but 
		   opening it, then updating the date of the last time it was opened */
		if (req.query.open)
			await this.boardController.updateRecentDate(boardId)

		const theme = await this.boardController.getTheme(boardId)

		return res.status(200).send({
			title: board.board_title,
			description: board.board_desc,
			state: board.state,
			creation: board.board_creation,
			recent: board.board_recent,
			theme
		})
	}

	getBoards = async (req: Request, res: Response) => {
		const page = req.query.page ?? 0
		const amount = await this.boardController.getAmountUserBoards(req.user.id)

		const boards = (await this.boardController.getUserBoards(req.user.id, page * 9)).map((board: any) => ({
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
}