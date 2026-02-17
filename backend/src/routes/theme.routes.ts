import type {Request, Response} from "express"
import Router from "express"
import type themeController from "../db/controllers/themeController.ts"

export default class themeRoutes {
	routes = Router()

	themeController: themeController

	constructor (tc: themeController) {
		this.themeController = tc

		this.routes.post("/", this.createTheme)
		this.routes.put("/:board", this.setBoardTheme)
		this.routes.get("/:id", this.getTheme)
		this.routes.get("/", this.getThemes)
	}

	createTheme (req: Request, res: Response) {
		const clearColor = req.body.clear
		const primaryColor = req.body.primary
		const secondaryColor = req.body.secondary
		const tertiaryColor = req.body.tertiary

		if (!clearColor || !primaryColor || !secondaryColor || !tertiaryColor)
			return res.status(400).send({message: "Colors missing"})

		return res.status(200).send({
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

