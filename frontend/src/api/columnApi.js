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

const archiveColumn = async (columnId) => {
	await axiosInstance.delete(`/column/${columnId}`)
}

const updateColumn = async (columnId, title) => {
	await axiosInstance.put(`/column/${columnId}`, {
		title
	})
}

export {
	getColumns,
	createColumn,
	archiveColumn,
	updateColumn
}