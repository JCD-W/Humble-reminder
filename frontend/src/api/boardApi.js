import { axiosInstance } from "../utils/axiosInstance"

const createBoard = async (title, description) => {
	const resp = await axiosInstance.post("/board/", {
		title, description
	})
	return resp.data.board
}

const updateBoard = async (boardId, title, description) => {
	await axiosInstance.put(`/board/${boardId}`, {
		title,
		description
	})
}

const deleteBoard = async (boardId) => {
	await axiosInstance.delete(`/board/${boardId}`)
}

const getBoard = async (boardId) => {
	const resp = await axiosInstance.get(`/board/${boardId}`)
	return resp.data
}

const getBoards = async (page = 0) => {
	const resp = await axiosInstance.get(`/board/?page=${page}`)
	return resp.data
}

export {
	createBoard,
	updateBoard,
	deleteBoard,
	getBoard,
	getBoards
}