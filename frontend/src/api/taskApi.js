import { axiosInstance } from "../utils/axiosInstance"

const createTask = async (columnId, boardId, name, description, hasDeadline, deadline, type) => {
	await axiosInstance.post(`/task/create/${boardId}/${columnId}`, {
		name,
		description,
		type,
		deadline: hasDeadline ? deadline : undefined
	})
}

export {
	createTask
}