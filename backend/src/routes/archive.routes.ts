import type {Request, Response} from "express"
import Router from "express"

export default class archiveRoutes {
	routes = Router()

	constructor () {
		this.routes.get("/:board", this.getArchives)
		this.routes.get("/column/:id", this.getColumnArchive)
		this.routes.get("/task/:id", this.getTaskArchive)
		this.routes.post("/column/:id", this.restoreColumn)
		this.routes.post("/task/:id", this.restoreTask)
		this.routes.delete("/:id", this.deleteArchive)
	}

	getArchives = async (req: Request, res: Response) => {
		res.status(200).send({
			amount: 0
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

	getColumnArchive = (req: Request, res: Response) => {
		res.status(200).send({
			id: 0
		})
	}

	getTaskArchive = (req: Request, res: Response) => {
		res.status(200).send({
			id: 0
		})
	}

	deleteArchive = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Archive deleted`
		})
	}
}