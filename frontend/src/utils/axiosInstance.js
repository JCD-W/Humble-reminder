import Axios from "axios"
import { refreshToken } from "../api/authApi"

const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:3000"

const axiosInstance = Axios.create({
	baseURL: BACKEND_URI,
	withCredentials: true
})

axiosInstance.interceptors.response.use((response) => response, 
	async (error) => {
		const request = error.config
		if (request.url === "/auth/refresh" || !error.response || error.response.status !== 403 || error.response.data.message !== "You need to login first")
			return Promise.reject(error)
		console.log("Refreshing token")
		try {
			const resp = await refreshToken()
			if (resp.status === 200)
				return axiosInstance(request)
		} catch (err) {
			console.log("Failed to refresh")
		}
		return Promise.reject(error)
	}
)

export {
	axiosInstance
}