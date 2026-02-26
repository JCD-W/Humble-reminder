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

const asignTheme = async (boardId, themeId) => {
	await axiosInstance.put(`/theme/${boardId}`, {
		theme: themeId
	})
}

export {
	getThemes,
	createTheme,
	asignTheme
}