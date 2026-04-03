module.exports = {
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:4000",
		chromeWebSecurity: false,
		setupNodeEvents(on, config) {}
	}
}