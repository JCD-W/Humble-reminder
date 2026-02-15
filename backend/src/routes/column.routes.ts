import type {Request, Response} from "express"
import Router from "express"

export default class columnRoutes {
	routes = Router()

	constructor () {
		this.routes.post("/create", this.createColumn)
		this.routes.put("/:id", this.updateColumn)
		this.routes.delete("/:id", this.deleteColumn)
		this.routes.get("/:id", this.getColumn)
		this.routes.get("/", this.getBoardColumns)
	}

	createColumn (req: Request, res: Response) {
		res.status(200).send({
			message: `Column created`
		})
	}

	updateColumn (req: Request, res: Response) {
		res.status(200).send({
			message: `Column updated`
		})
	}

	getColumn (req: Request, res: Response) {
		res.status(200).send({
			id: 0
		})
	}

	deleteColumn (req: Request, res: Response) {
		res.status(200).send({
			message: `Column deleted`
		})
	}

	getBoardColumns (req: Request, res: Response) {
		res.status(200).send({
			amount: 0
		})
	}
}