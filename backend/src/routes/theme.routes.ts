import type {Request, Response} from "express"
import Router from "express"
import type themeController from "../db/controllers/themeController.ts"
import type boardController from "../db/controllers/boardController.ts"

export default class themeRoutes {
	routes = Router()

	themeController: themeController
	boardController: boardController

	constructor (tc: themeController, bc: boardController) {
		this.themeController = tc
		this.boardController = bc

		this.routes.post("/", this.createTheme)
		this.routes.put("/:board", this.setBoardTheme)
		this.routes.get("/:id", this.getTheme)
		this.routes.get("/", this.getThemes)
	}

	createTheme = async (req: Request, res: Response) => {
		let clearColor: string = req.body.clear
		let primaryColor: string = req.body.primary
		let secondaryColor: string = req.body.secondary
		let tertiaryColor: string = req.body.tertiary

		// Verify all colors were specified
		if (!clearColor || !primaryColor || !secondaryColor || !tertiaryColor)
			return res.status(400).send({message: "Colors missing"})

		if (
			(clearColor.length < 6 || clearColor.length > 7) &&
			(primaryColor.length < 6 || primaryColor.length > 7) &&
			(secondaryColor.length < 6 || secondaryColor.length > 7) &&
			(tertiaryColor.length < 6 || tertiaryColor.length > 7)
		)
			return res.status(400).send({message: "Not a valid color"})

		// Clean up the received colors
		clearColor = clearColor.replaceAll("#", "")
		primaryColor = primaryColor.replaceAll("#", "")
		secondaryColor = secondaryColor.replaceAll("#", "")
		tertiaryColor = tertiaryColor.replaceAll("#", "")

		const themeId = await this.themeController.createTheme(
			clearColor, primaryColor, secondaryColor, tertiaryColor
		)

		if (req.body.board) {
			const boardId = Buffer.from(req.body.board, "hex")
			const board = await this.boardController.getBoardById(boardId)
			if (board)
				await this.boardController.setTheme(boardId, themeId)
		}

		return res.status(200).send({
			message: "Theme created",
			theme: themeId
		})
	}

	setBoardTheme = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "No board provided"})
		const themeId: number = parseInt(req.body.theme)
		const boardId = Buffer.from(req.params.board, "hex")
		
		const theme = await this.themeController.getThemeById(themeId)
		if (!theme)
			return res.status(404).send({message: "Theme not found"})

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		await this.boardController.setTheme(boardId, themeId)

		return res.status(200).send({
			message: "Board theme changed"
		})
	}

	getTheme = async (req: Request, res: Response) => {
		const themeId: number = parseInt(req.params.id)
		if (!req.params.id)
			return res.status(400).send({message: "No theme provided"})
		
		const theme = await this.themeController.getThemeById(themeId)
		if (!theme)
			return res.status(404).send({message: "Theme not found"})

		return res.status(200).send(theme)
	}

	getThemes = async (req: Request, res: Response) => {
		const page = (req.query.page ?? 0) * 20
		const amount = await this.themeController.getThemeAmount()
		const themes = await this.themeController.getThemes(page)

		return res.status(200).send({
			amount,
			themes
		})
	}
}