declare global {
	namespace Express {
		interface Request {
			user: undefined | object
		}
	}
}