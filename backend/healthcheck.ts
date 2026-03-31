import Axios from "axios"

const URL = process.env.URL || "http://localhost"
const PORT = process.env.SERVER_PORT || 3000

const instance = Axios.create({
	baseURL: `${URL}:${PORT}`
})

fetch(`${URL}:${PORT}/`)
	.then((resp) => {
		if (resp.status == 200)
			console.log("Working")
		else {
			process.exit(1)
		}
		process.exit(0)
	})
	.catch((err) => {
		console.log("Not working")
		process.exit(1)
	})