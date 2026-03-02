import { axiosInstance } from "../utils/axiosInstance"

const getThemes = async (page) => {
	const resp = await axiosInstance.get(`/theme?page=${page}`)
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

const assignTheme = async (boardId, themeId) => {
	await axiosInstance.put(`/theme/${boardId}`, {
		theme: themeId
	})
}

export {
	getThemes,
	createTheme,
	assignTheme
}