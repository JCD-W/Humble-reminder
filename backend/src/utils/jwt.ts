import jwt from "jsonwebtoken"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "aa899300e155f5d0e1959bf54118b42a" // JWT secret placeholder

const signToken = (data: object | string, expiresIn: string = "10m"): string => {
	return jwt.sign(data, JWT_SECRET_KEY, {
		expiresIn
	})
}

const validateToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET_KEY)
	} catch (err) {
		return null
	}
}

export {
	signToken,
	validateToken
}