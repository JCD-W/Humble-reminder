import type {Request, Response} from "express"
import Router from "express"

export default class themeRoutes {
	routes = Router()

	constructor () {
		this.routes.post("/create", this.createTheme)
		this.routes.post("/set/:board", this.setBoardTheme)
		this.routes.get("/:id", this.getTheme)
	}

	createTheme (req: Request, res: Response) {
		res.status(200).send({
			message: "Theme created"
		})
	}

	setBoardTheme (req: Request, res: Response) {
		res.status(200).send({
			message: "Board theme changed"
		})
	}

	getTheme (req: Request, res: Response) {
		res.status(200).send({
			id: 0
		})
	}

	getThemes (req: Request, res: Response) {
		res.status(200).send({
			amount: 0
		})
	}
}

