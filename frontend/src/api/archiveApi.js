import { axiosInstance } from "../utils/axiosInstance"

const getBoardArchive = async (page) => {
	const res = await axiosInstance.get(`/archive/?page=${page}`)
	return res.data
}

export {
	getBoardArchive
}