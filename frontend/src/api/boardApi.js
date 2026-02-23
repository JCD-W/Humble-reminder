import { axiosInstance } from "../utils/axiosInstance"

const createBoard = async (title, description) => {
	const resp = await axiosInstance.post("/board/", {
		title, description
	})
	return resp.data.board
}

const updateBoard = async () => {
	//
}

const deleteBoard = async () => {
	//
}

const getBoard = async () => {
	//
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