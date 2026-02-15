import type {Request, Response} from "express"
import Router from "express"


export default class internalRoutes {
	routes = Router()

	constructor () {
		this.routes.get("/", this.heartbeat)
	}

	heartbeat = (req: Request, res: Response) => {
		res.status(200).send("Working.")
	}
}