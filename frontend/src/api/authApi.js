import { axiosInstance } from "../utils/axiosInstance"

const checkConnection = async () => {
	try {
		const resp = await axiosInstance.get("/")
		return resp.status === 200 && resp.data === "Working."
	} catch (err) {
		console.error(err)
		return false
	}
}

const checkLogin = async () => {
	try {
		const resp = await axiosInstance.get("/sessions/me")
		return resp.status === 200
	} catch (err) {
		console.log(err)
		return false
	}
}

const login = async (name, pass) => {
	return await axiosInstance.post("/sessions/", {
		name,
		pass
	})
}

const refreshToken = async () => {
	return await axiosInstance.post("/sessions/refresh")
}

const changePassword = async (password) => {
	return await axiosInstance.put("/sessions/", {
		password
	})
}

export {
	checkConnection,
	login,
	checkLogin,
	refreshToken,
	changePassword
}