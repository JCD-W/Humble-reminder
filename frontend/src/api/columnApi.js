import { axiosInstance } from "../utils/axiosInstance"

const getColumns = async (boardId) => {
	const resp = await axiosInstance.get(`/column/${boardId}`)
	return resp.data
}

const createColumn = async (boardId, title, position) => {
	await axiosInstance.post(`/column/${boardId}`, {
		title,
		position
	})
}

export {
	getColumns,
	createColumn
}