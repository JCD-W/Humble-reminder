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

		if (!req.body.title && !req.body.description && !req.body.state)
			return res.status(304).send({message: "Nothing changed"})

		const boardId = Buffer.from(req.params.id, "hex")
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		await this.boardController.update(boardId, {
			"board_title": req.body.title,
			"board_desc": req.body.description,
			"board_state": req.body.state
		})

		res.status(200).send({
			message: "Board updated"
		})
	}

	deleteBoard = async (req: Request, res: Response) => {
		res.status(200).send({
			message: "Board deleted"
		})
	}

	getBoard = (req: Request, res: Response) => {
		res.status(200).send({
			id: 0,
			title: "",
			description: "",
			creation: null
		})
	}
}