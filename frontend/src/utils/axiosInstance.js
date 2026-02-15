import Axios from "axios"

const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:3000"

export const axiosInstance = Axios.create({
	baseURL: BACKEND_URI,
	withCredentials: true
})