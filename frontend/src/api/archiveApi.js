import { axiosInstance } from "../utils/axiosInstance"

const getBoardArchive = async (page) => {
	const res = await axiosInstance.get(`/archive/?page=${page}`)
	return res.data
}

const getColumnArchive = async (board) => {
	const res = await axiosInstance.get(`/archive/column/${board}`)
	return res.data
}

const restoreBoard = async (board) => {
	await axiosInstance.post(`/archive/board/${board}`)
}

const deleteBoard = async (board) => {
	await axiosInstance.delete(`/archive/board/${board}`)
}

export {
	getBoardArchive,
	restoreBoard,
	deleteBoard,
	getColumnArchive
}