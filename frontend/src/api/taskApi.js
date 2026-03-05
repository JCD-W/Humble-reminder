import axios from "axios"
import { axiosInstance } from "../utils/axiosInstance"

const createTask = async (columnId, boardId, name, description, hasDeadline, deadline, type) => {
	await axiosInstance.post(`/task/create/${boardId}/${columnId}`, {
		name,
		description,
		type,
		deadline: hasDeadline ? deadline : undefined
	})
}

const updateTask = async (taskId, name, desc, type, deadline) => {
	await axiosInstance.put(`/task/${taskId}`, {
		name, desc, type, deadline
	})
}

const moveTaskColumn = async (boardId, taskId, columnId) => {
	await axiosInstance.put(`/task/${boardId}/${taskId}/move`, {
		column: columnId
	})
}

const moveTask = async (taskId, position) => {
	await axiosInstance.put(`/task/move/${taskId}`, {position})
}

const archiveTask = async (taskId) => {
	await axiosInstance.delete(`/task/${taskId}`)
}

const deliverUrlTask = async (taskId, url) => {
	await axiosInstance.post(`/task/deliver/${taskId}`, {url})
}

const deliverFile = async (taskId, file) => {
	console.log(file)
	await axiosInstance.postForm(`/task/deliver/${taskId}`, {file})
}

const deleteDeliver = async (taskId) => {
	await axiosInstance.delete(`/task/deliver/${taskId}`)
}

export {
	createTask,
	updateTask,
	moveTaskColumn,
	moveTask,
	archiveTask,
	deliverUrlTask,
	deleteDeliver,
	deliverFile
}