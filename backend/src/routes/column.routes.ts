import type {Request, Response} from "express"
import Router from "express"
import type columnController from "../db/controllers/columnController.ts"
import type boardController from "../db/controllers/boardController.ts"

export default class columnRoutes {
	routes = Router()
	columnController: columnController
	boardController: boardController

	constructor (cc: columnController, bc: boardController) {
		this.columnController = cc
		this.boardController = bc

		this.routes.post("/:board", this.create)
		this.routes.put("/:id", this.update)
		this.routes.patch("/:id", this.move)
		this.routes.delete("/:id", this.delete)
		this.routes.get("/:board", this.getBoardColumns)
	}

	create = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		const title = req.body.title
		const position = req.body.position
		const boardId = Buffer.from(req.params.board, "hex")
		if (!title || !position)
			return res.status(400).send({message: "Title or position required"})

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		const columnId = await this.columnController.create(title, boardId, position)

		return res.status(200).send({
			message: `Column "${title}" created`,
			column: columnId
		})
	}

	update = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Column not specified"})		
		const columnId = parseInt(req.params.id)
		const { title } = req.body

		if (!title)
			return res.status(304).send({message: "Nothing changed"})

		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "active")
			return res.status(400).send({message: `The column is ${column.state}`})

		await this.columnController.update(columnId, {
			column_title: title,
		})

		return res.status(200).send({
			message: `Column updated`
		})
	}

	delete = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Column not specified"})		
		const columnId = parseInt(req.params.id)

		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "active")
			return res.status(400).send({message: `The column is ${column.state}`})

		await this.columnController.update(columnId, {
			column_state: "archived"
		})

		return res.status(200).send({
			message: `Column deleted`
		})
	}

	getBoardColumns = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		const boardId = Buffer.from(req.params.board, "hex")

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		const columns = await this.columnController.getColumns(boardId)

		return res.status(200).send(columns)
	}

	move = async (req: Request, res: Response) => {
		if (!req.body.position)
			return res.status(400).send({message: "New position not specified"})
		if (!req.body.board)
			return res.status(400).send({message: "Board not specified"})
		if (!req.params.id)
			return res.status(400).send({message: "Column not specified"})	

		const boardId = Buffer.from(req.body.board, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		if (board.board_state !== "active")
			return res.status(400).send({message: `The board is ${board.state}`})

		const columnId = parseInt(req.params.id)
		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "active")
			return res.status(400).send({message: `The column is ${column.state}`})

		await this.columnController.move(columnId, boardId, req.body.position)

		return res.status(200).send({
			message: "Column moved"
		})
	}
}