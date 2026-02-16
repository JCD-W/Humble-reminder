import mysql from "mysql2/promise"

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost"
const DATABASE_USER = process.env.DATABASE_USER || "root"
const DATABASE_PASS = process.env.DATABASE_PASS || ""
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT ?? "3306")
const DATABASE_NAME = process.env.DATABASE_NAME || "humble_reminder_db"

export default class db {
	con: unknown | mysql.Connection

	async query (query: string, values: Array<any> = []) {
		const [result] = await this.con.execute(query, values)
		return result
	}

	async getUUID (): Promise<Buffer> {
		const res = await this.con.query("SELECT UUID_TO_BIN(UUID()) AS id")
		return res[0][0].id
	}
	
	async connect () {
		return new Promise(async (resolve) => {
			console.log(`Connecting to the database "${DATABASE_NAME}" (${DATABASE_USER})...`)
			let connectionError: mysql.QueryError | unknown
			for (let i = 1; i <= 10; i++) {
				console.log(`Connection attempt (${i}/10)`)
				connectionError = await this.attemptConnection()
				if (connectionError == null)
					break
				await this.wait()
			}
			if (connectionError != null)
				throw connectionError
			resolve(null)
		})
	}

	close () {
		/*console.log("Closing connection...")
		this.con.end(() => {
			console.log("Done")
		})*/
	}

	wait () {
		return new Promise((resolve) => {
			setTimeout(resolve, 1500)
		})
	}

	async attemptConnection () {
		try {
			this.con = await mysql.createConnection({
				host: DATABASE_HOST,
				user: DATABASE_USER,
				password: DATABASE_PASS,
				database: DATABASE_NAME,
				port: DATABASE_PORT
			})
			console.log("Success!")
			return null
		} catch (err: mysql.QueryError) {
			console.log(`Failed: ${err.code}`)
			return err
		}
	}
}