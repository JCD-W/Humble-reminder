import { axiosInstance } from "../utils/axiosInstance"

// /
const checkConnection = async () => {
	try {
		const resp = await axiosInstance.get("/")
		return resp.status === 200 && resp.data === "Working."
	} catch (err) {
		console.error(err)
		return false
	}
}

// /auth/check
const checkLogin = async () => {
	try {
		const resp = await axiosInstance.get("/auth/check")
		return resp.status === 200
	} catch (err) {
		console.log(err)
		return false
	}
}

// /auth/login
const login = async (name, pass) => {
	return await axiosInstance.post("/auth/login", {
		name,
		pass
	})
}

export {
	checkConnection,
	login,
	checkLogin
}