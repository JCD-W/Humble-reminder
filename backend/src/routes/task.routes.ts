import type {Request, Response} from "express"
import Router from "express"

export default class taskRoutes {
	routes = Router()

	constructor () {
		this.routes.post("/create", this.create)
		this.routes.post("/deliver/:id", this.deliver)
		this.routes.get("/:id", this.getTask)
		this.routes.put("/:id", this.updateTask)
		this.routes.put("/switch/:id", this.switchTaskColumn)
		this.routes.delete("/:id", this.deleteTask)
	}

	create (req: Request, res: Response) {
		res.status(200).send({
			message: `New task created`
		})
	}

	getTask (req: Request, res: Response) {
		res.status(200).send({
			id: 0
		})
	}

	updateTask (req: Request, res: Response) {
		res.status(200).send({
			message: `Task updated`
		})
	}

	deleteTask (req: Request, res: Response) {
		res.status(200).send({
			message: `Task deleted`
		})
	}

	deliver (req: Request, res: Response) {
		res.status(200).send({
			message: `Task delivered`
		})
	}

	switchTaskColumn (req: Request, res: Response) {
		res.status(200).send({
			message: `Column changed`
		})
	}
}