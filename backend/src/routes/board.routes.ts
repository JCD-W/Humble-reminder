import type {Request, Response} from "express"
import Router from "express"
import type boardController from "../db/controllers/boardController.ts"


export default class boardRoutes {
	routes = Router()
	boardController: boardController

	constructor (bc: boardController) {
		this.boardController = bc

		this.routes.post("/:id", this.createBoard)
		this.routes.put("/:id", this.updateBoard)
		this.routes.delete("/:id", this.deleteBoard)
		this.routes.get("/:id", this.getBoard)
	}

	createBoard = async (req: Request, res: Response) => {
		const title = req.body.title
		const desc = req.body.description

		if (!title || !desc) {
			return res.status(400).send({
				message: "Board title or description needed"
			})
		}

		const boardId = await this.boardController.createBoard(title, desc, req.user.id)

		return res.status(200).send({
			message: `New ${title} board created`,
			board: boardId.toString("hex")
		})
	}

	updateBoard = async (req: Request, res: Response) => {
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