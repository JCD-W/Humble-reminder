import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import internalRoutes from "./routes/internal.routes.ts"
import authRoutes from "./routes/auth.routes.ts"
import archiveRoutes from "./routes/archive.routes.ts"
import boardRoutes from "./routes/board.routes.ts"
import columnRoutes from "./routes/column.routes.ts"
import taskRoutes from "./routes/task.routes.ts"
import themeRoutes from "./routes/theme.routes.ts"

import db from "./db/connection.ts"
import userController from "./db/controllers/userController.ts"
import themeController from "./db/controllers/themeController.ts"

import { handleJwt, loginRequired } from "./middleware/jwtHandling.ts"
import errorHandling from "./middleware/errorHandling.ts"
import boardController from "./db/controllers/boardController.ts"
import columnController from "./db/controllers/columnController.ts"
import taskController from "./db/controllers/taskController.ts"

const SERVER_PORT = process.env.SERVER_PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || "*"

export default class server {
	myDB: db
	sv: express.Application

	myAuthRoutes: authRoutes
	myInternalRoutes: internalRoutes
	myBoardRoutes: boardRoutes
	myArchiveRoutes: archiveRoutes
	myColumnRoutes: columnRoutes
	myTaskRoutes: taskRoutes
	myThemeRoutes: themeRoutes

	myUserController: userController
	myThemeController: themeController
	myBoardController: boardController
	myColumnController: columnController
	myTaskController: taskController

	constructor () {
		this.myDB = new db()
		this.sv = express()

		this.myUserController = new userController(this.myDB)
		this.myThemeController = new themeController(this.myDB)
		this.myColumnController = new columnController(this.myDB)
		this.myTaskController = new taskController(this.myDB)
		this.myBoardController = new boardController(
			this.myDB, 
			this.myColumnController,
			this.myTaskController,
			this.myThemeController
		)

		this.myAuthRoutes = new authRoutes(this.myUserController)
		this.myInternalRoutes = new internalRoutes()
		this.myBoardRoutes = new boardRoutes(this.myBoardController)
		this.myArchiveRoutes = new archiveRoutes()
		this.myColumnRoutes = new columnRoutes()
		this.myTaskRoutes = new taskRoutes()
		this.myThemeRoutes = new themeRoutes(
			this.myThemeController,
			this.myBoardController
		)

		this.sv.use(express.json())
		this.sv.use(cookieParser())
		this.sv.use(handleJwt)
		this.sv.use(cors({
			origin: FRONTEND_URL,
			credentials: true
		}))

		this.sv.use("/", this.myInternalRoutes.routes)
		this.sv.use("/auth", this.myAuthRoutes.routes)
		this.sv.use("/board", loginRequired, this.myBoardRoutes.routes)
		this.sv.use("/archive", loginRequired, this.myArchiveRoutes.routes)
		this.sv.use("/:board/column", this.myColumnRoutes.routes)
		this.sv.use("/:board/task", this.myTaskRoutes.routes)
		this.sv.use("/theme", loginRequired, this.myThemeRoutes.routes)

		this.sv.use(errorHandling)
	}

	async run () {
		await this.myDB.connect()
		await this.createDefaults()

		this.sv.listen(SERVER_PORT, () => {
			console.log(`Server running on port ${SERVER_PORT}`)
		})
	}

	async createDefaults () {
		const userId = await this.myUserController.createDefaults()
		if (userId) {
			await this.myThemeController.createDefaults()
			await this.myBoardController.createDefaults(userId)
		}
	}

	close () {
		console.log("Closing server...")
		if (this.sv == undefined && this.myDB == undefined) {
			console.error("Failed to close gracefully")
			return
		}
		this.myDB.close()
	}
}