import { axiosInstance } from "../utils/axiosInstance"

const getColumns = async (boardId) => {
	const resp = await axiosInstance.get(`/columns/${boardId}`)
	return resp.data
}

const createColumn = async (boardId, title, position) => {
	await axiosInstance.post(`/columns/${boardId}`, {
		title,
		position
	})
}

const archiveColumn = async (columnId) => {
	await axiosInstance.delete(`/columns/${columnId}`)
}

const updateColumn = async (columnId, title) => {
	await axiosInstance.put(`/columns/${columnId}`, {
		title
	})
}

const moveColumn = async (boardId, columnId, position) => {
	await axiosInstance.patch(`/columns/${columnId}`, {
		position,
		board: boardId
	})
}

export {
	getColumns,
	createColumn,
	archiveColumn,
	updateColumn,
	moveColumn
}