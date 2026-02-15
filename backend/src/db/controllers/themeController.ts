import db from "../connection.ts"

export default class themeController {
	db: db
	
	constructor (con: db) {
		this.db = con
	}

	async getThemeById (id: number) {
		const res = await this.db.query("SELECT text_color, primary_color, secondary_color, tertiary_color FROM theme WHERE theme_id = ?", [id])
		if (res.length < 1) {
			return null
		} else {
			return {
				textColor: res.text_color,
				primaryColor: res.primaryColor,
				secondaryColor: res.secondary_color,
				tertiaryColor: res.tertiary_color
			}
		}
	}

	async createTheme (text: string, primary: string, secondary: string, tertiary: string) {
		await this.db.query(
			"INSERT INTO theme (theme_id, text_color, primary_color, secondary_color, tertiary_color) VALUES (?, ?, ?, ?, ?)", 
			[1, text, primary, secondary, tertiary]
		)
	}

	async createDefaults () {
		if (await this.getThemeById(1) == null) {
			console.log("Creating default theme...")
			this.createTheme("d84727", "D9D9D9", "B5B5B5", "2d3142") // https://coolors.co/palette/2d3142-bfc0c0-ffffff-ef8354-4f5d75
		}
	}
}