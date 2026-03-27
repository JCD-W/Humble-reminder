import { axiosInstance } from "../utils/axiosInstance"

const createBoard = async (title, description) => {
	const resp = await axiosInstance.post("/boards/", {
		title, description
	})
	return resp.data.board
}

const updateBoard = async (boardId, title, description) => {
	await axiosInstance.put(`/boards/${boardId}`, {
		title,
		description
	})
}

const deleteBoard = async (boardId) => {
	await axiosInstance.patch(`/boards/${boardId}`)
}

const getBoard = async (boardId, open=false) => {
	const resp = await axiosInstance.get(`/boards/${boardId}${open ? "?open=1" : ""}`)
	return resp.data
}

const getBoards = async (page = 0) => {
	const resp = await axiosInstance.get(`/boards/?page=${page}`)
	return resp.data
}

export {
	createBoard,
	updateBoard,
	deleteBoard,
	getBoard,
	getBoards
}