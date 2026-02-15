import type {Request, Response} from "express"

export default (err: Error, req: Request, res: Response, next: Function) => {
	console.error(err)
	res.status(500).send({
		message: "Internal server error"
	})
}