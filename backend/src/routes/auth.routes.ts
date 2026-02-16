import type {Request, Response} from "express"
import Router from "express"

import { encryptPass } from "../utils/encryption.ts"
import userController from "../db/controllers/userController.ts"
import { validateString } from "../utils/validate.ts"
import { signToken } from "../utils/jwt.ts"
import { loginRequired } from "../middleware/jwtHandling.ts"

export default class authRoutes {
	routes = Router()
	userController: userController

	constructor (uc: userController) {
		this.userController = uc

		this.routes.post("/login", this.login)
		this.routes.put("/", loginRequired, this.changePass)
		this.routes.get("/refresh", loginRequired, this.refresh)
		this.routes.get("/check", loginRequired, this.checkToken)
	}

	login = async (req: Request, res: Response) => {
		if (!req.body.pass || !req.body.name)
			return res.status(400).send({message: "Name or password required"})

		if (!validateString(req.body.name, 6))
			return res.status(403).send({message: "Invalid name"})

		const pass = encryptPass(req.body.pass)
		const user = await this.userController.getUserByName(req.body.name)

		if (user == null)
			return res.status(404).send({message: "User not found"})

		if (Buffer.compare(user.user_pass, pass))
			return res.status(403).send({message: "Wrong password"})

		const tokenData = {
			user_id: user.user_id,
			user_name: req.body.name
		}
		const sessionToken = signToken(tokenData)
		const refreshToken = signToken(tokenData, "10h")

		return res.status(200)
			.cookie("session-token", sessionToken)
			.cookie("refresh-token", refreshToken)
			.send({message: "Logged in successfully"})
	}

	refresh = (req: Request, res: Response) => {
		const tokenData = {
			user_id: req.user.user_id,
			user_name: req.user.user_name
		}
		const sessionToken = signToken(tokenData)
		const refreshToken = signToken(tokenData, "10h")

		return res.status(200)
			.cookie("session-token", sessionToken)
			.cookie("refresh-token", refreshToken)
			.send({message: "Token refreshed"})
	}

	// Endpoint for development reasons
	checkToken = (req: Request, res: Response) => {
		return res.status(200).send({
			message: "The token is valid!"
		})
	}

	/* The proper way to handle this would been sending a token to an email address
	   and then have the token being received by another endpoint, however since this
	   project was not made with working emails in mind is left this way. */
	changePass = (req: Request, res: Response) => {
		const password = req.body.password
		if (!password)
			return res.status(400).send({message: "Password required"})

		if (!validateString(password, 6))
			return res.status(403).send({message: "Invalid password"})

		this.userController.changePassword(req.user.id, password)

		return res.status(200).send({
			message: "Password successfuly updated"
		})
	}
}