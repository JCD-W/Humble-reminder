describe("Board tests", () => {
	beforeEach(() => {
		cy.visit("/")
		cy.get("#password").type("12345678*")
		cy.get("#Login-submit-button").click()
	})

	afterEach(() => {
		cy.get("#header-session-menu").click()
		cy.wait(100)
		cy.get("#header-close-session").click()
	})

	it("Board creation", () => {
		cy.get("#boards-container").should("be.visible")
		cy.get("#add-board-button").should("be.visible")
	})
})