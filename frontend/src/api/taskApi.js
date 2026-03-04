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

export {
	createTask,
	updateTask,
	moveTaskColumn,
	moveTask
}