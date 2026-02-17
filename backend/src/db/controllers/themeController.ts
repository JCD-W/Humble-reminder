import db from "../connection.ts"

export default class themeController {
	db: db
	
	constructor (con: db) {
		this.db = con
	}

	async getThemeById (id: number) {
		const res = await this.db.query("SELECT clear_color, primary_color, secondary_color, tertiary_color FROM theme WHERE theme_id = ?", [id])
		if (res.length < 1) {
			return null
		} else {
			return {
				clear: res[0].clear_color,
				primary: res[0].primary_color,
				secondary: res[0].secondary_color,
				tertiary: res[0].tertiary_color
			}
		}
	}

	async createTheme (clear: string, primary: string, secondary: string, tertiary: string) {
		const res = await this.db.query(
			"INSERT INTO theme (clear_color, primary_color, secondary_color, tertiary_color) VALUES (?, ?, ?, ?)", 
			[clear, primary, secondary, tertiary]
		)
		return res.insertId
	}

	async createDefaults () {
		if (await this.getThemeById(1) == null) {
			console.log("Creating default theme...")
			await this.db.query(
				"INSERT INTO theme (theme_id, clear_color, primary_color, secondary_color, tertiary_color) VALUES (?, ?, ?, ?, ?)", 
				[1, "d84727", "D9D9D9", "B5B5B5", "2d3142"]
			)
			// https://coolors.co/palette/2d3142-bfc0c0-ffffff-ef8354-4f5d75
		}
	}
}