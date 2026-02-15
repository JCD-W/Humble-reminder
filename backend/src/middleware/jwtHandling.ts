import type {Request, Response} from "express"
import { validateToken } from "../utils/jwt.ts"

const handleJwt = (req: Request, res: Response, next: Function) => {
	const refreshToken = req.cookies["refresh-token"]
	const sessionToken = req.cookies["session-token"]
	if (!refreshToken || !sessionToken) {
		next()
		return
	}

	const tokenData = validateToken(sessionToken)
	if (tokenData == undefined) {
		next()
		return
	}

	req.user = {
		id: Buffer.from(tokenData.user_id.data),
		name: tokenData.user_name
	}

	next()
}

const loginRequired = (req: Request, res: Response, next: Function) => {
	if (!req.user)
		return res.status(403).send({message: "You need to login first"})

	next()
}

export {
	loginRequired,
	handleJwt
}