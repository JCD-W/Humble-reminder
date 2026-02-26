import { axiosInstance } from "../utils/axiosInstance"

const getThemes = async () => {
	const resp = await axiosInstance.get("/theme/")
	return resp.data
}

const createTheme = async (clear, primary, secondary, tertiary, board=undefined) => {
	await axiosInstance.post("/theme/", {
		clear,
		primary,
		secondary,
		tertiary,
		board
	})
}

export {
	getThemes,
	createTheme
}