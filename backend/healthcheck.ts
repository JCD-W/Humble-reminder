import Axios from "axios"

const URL = process.env.URL || "http://localhost"
const PORT = process.env.SERVER_PORT || 3000

const instance = Axios.create({
	baseURL: `${URL}:${PORT}`
})

instance.get("/")
	.then((resp) => {
		if (resp.data == "Working." && resp.status == 200)
			console.log("Working")
		else
			throw resp
		process.exit(0)
	})
	.catch((err) => {
		console.log("Not working")
		process.exit(1)
	})