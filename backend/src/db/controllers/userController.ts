import { encryptPass } from "../../utils/encryption.ts"
import db from "../connection.ts"

export default class userController {
	db: db

	constructor (con: db) {
		this.db = con
	}

	async getUserByName (name: string) {
		const res = await this.db.query("SELECT user_pass, user_id FROM user WHERE user_name = ?", [name])
		if (res.length < 1)
			return null
		else
			return res[0]
	}

	async createUser (name: string, pass: string) {
		await this.db.query("INSERT INTO user (user_name, user_pass) VALUES (?, ?)", [name, encryptPass(pass)])
	}

	async changePassword (id: Buffer, pass: string) {
		await this.db.query("UPDATE user SET user_pass = ? WHERE user_id = ?", [encryptPass(pass), id])
	}

	async createDefaults () {
		if (await this.getUserByName("Default") == null) {
			console.log("Creating default user...")
			this.createUser("Default", "12345678*")
		}
	}
}