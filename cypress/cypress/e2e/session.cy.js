describe("Session tests", () => {
	it("Log in", () => {
		cy.visit("/")
		cy.get("#password").should("be.visible").and("be.enabled")
		cy.get("#Login-submit-button").should("be.visible").and("be.enabled")

		cy.get("#password").type("12345678*")
		cy.get("#Login-submit-button").click()

		cy.get("#boards-container").should("be.visible")
	})

	it("Log off", () => {
		cy.visit("/")
		cy.get("#password").type("12345678*")
		cy.get("#Login-submit-button").click()

		cy.get("#header-session-menu").should("be.visible").and("be.enabled")
		cy.get("#header-session-menu").click()
		cy.wait(100)
		cy.get("#header-close-session").should("be.visible").and("be.enabled")
		cy.get("#header-close-session").click()

		cy.get("#password").should("be.visible").and("be.enabled")
	})
})