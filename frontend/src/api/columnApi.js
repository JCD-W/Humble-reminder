import { axiosInstance } from "../utils/axiosInstance"

const getColumns = async (boardId) => {
	const resp = await axiosInstance.get(`/column/${boardId}`)
	return resp.data
}

export {
	getColumns
}