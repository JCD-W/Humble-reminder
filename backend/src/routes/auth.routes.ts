import type {Request, Response} from "express"
import Router from "express"

import { encryptPass } from "../utils/encryption.ts"
import userController from "../db/controllers/userController.ts"
import { validateString } from "../utils/validate.ts"
import { signToken, validateToken } from "../utils/jwt.ts"
import { loginRequired } from "../middleware/jwtHandling.ts"

export default class authRoutes {
	routes = Router()
	userController: userController

	constructor (uc: userController) {
		this.userController = uc

		this.routes.post("/", this.login)
		this.routes.put("/", loginRequired, this.changePass)
		this.routes.post("/refresh", this.refresh)
		this.routes.get("/me", this.checkToken)
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
		const sessionToken = req.cookies["refresh-token"]
		
		if (!sessionToken)
			return res.status(403).send({message: "You need to login first"})
		
		const tokenData = validateToken(sessionToken)
		if (!tokenData)
			return res.status(403).send({message: "Token expired"})

		const userData = {
			user_name: tokenData.user_name,
			user_id: tokenData.user_id
		}

		const newSessionToken = signToken(userData)
		const newRefreshToken = signToken(userData, "10h")


		return res.status(200)
			.cookie("session-token", newSessionToken)
			.cookie("refresh-token", newRefreshToken)
			.send({message: "Token refreshed"})
	}

	// Endpoint for development reasons
	checkToken = (req: Request, res: Response) => {
		if (!req.user)
			return res.status(403).send({message: "Token invalid / Not found"})
	
		return res.status(200).send({
			message: "The token is valid"
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