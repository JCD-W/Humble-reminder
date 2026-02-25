import { axiosInstance } from "../utils/axiosInstance"

const getThemes = async () => {
	const resp = await axiosInstance.get("/theme/")
	return resp.data
}

export {
	getThemes
}