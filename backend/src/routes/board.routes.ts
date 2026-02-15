import type {Request, Response} from "express"
import Router from "express"


export default class boardRoutes {
	routes = Router()

	constructor () {
		this.routes.post("/:id", this.createBoard)
		this.routes.put("/:id", this.updateBoard)
		this.routes.delete("/:id", this.deleteBoard)
		this.routes.get("/:id", this.getBoard)
	}

	createBoard (req: Request, res: Response) {
		res.status(200).send({
			message: "New board created",
			board: 0
		})
	}

	updateBoard (req: Request, res: Response) {
		res.status(200).send({
			message: "Board updated"
		})
	}

	deleteBoard (req: Request, res: Response) {
		res.status(200).send({
			message: "Board deleted"
		})
	}

	getBoard (req: Request, res: Response) {
		res.status(200).send({
			id: 0,
			title: "",
			description: "",
			creation: null
		})
	}
}