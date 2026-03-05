import { axiosInstance } from "../utils/axiosInstance"

const getBoardArchive = async (page) => {
	const res = await axiosInstance.get(`/archive/?page=${page}`)
	return res.data
}

const getColumnArchive = async (board) => {
	const res = await axiosInstance.get(`/archive/column/${board}`)
	return res.data
}

const getTaskArchive = async (board) => {
	const res = await axiosInstance.get(`/archive/task/${board}`)
	return res.data
}

const restoreBoard = async (board) => {
	await axiosInstance.post(`/archive/board/${board}`)
}

const restoreColumn = async (column) => {
	await axiosInstance.post(`/archive/column/${column}`)
}

const restoreTask = async (task) => {
	await axiosInstance.post(`/archive/task/${task}`)
}

const deleteBoard = async (board) => {
	await axiosInstance.delete(`/archive/board/${board}`)
}

const deleteColumn = async (column) => {
	await axiosInstance.delete(`/archive/column/${column}`)
}

const deleteTask = async (task) => {
	await axiosInstance.delete(`/archive/task/${task}`)
}

export {
	getBoardArchive,
	getColumnArchive,
	getTaskArchive,
	restoreBoard,
	deleteBoard,
	restoreTask,
	restoreColumn,
	deleteColumn,
	deleteTask
}