describe("Session tests", () => {
	it("Login", () => {
		cy.visit("/")
		cy.get("#password").should("be.visible").and("be.enabled")
		cy.get("#Login-submit-button").should("be.visible").and("be.enabled")

		cy.get("#password").type("12345678*")
		cy.get("#Login-submit-button").click()

		cy.wait(3000)
		cy.get("#boards-container").should("be.visible")
	})
})