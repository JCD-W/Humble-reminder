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
		cy.get("#add-board-button").should("be.visible").and("be.enabled")
		cy.get("#add-board-button").click()

		cy.wait(100)
		cy.get("#name").should("be.visible").and("be.enabled")
		cy.get("#description").should("be.visible").and("be.enabled")
		cy.get("#Create-new-board-submit-button").should("be.visible").and("be.enabled")
		cy.get("#name").type("Test board")
		cy.get("#description").type("Test description")
		cy.get("#Create-new-board-submit-button").click()

		cy.wait(500)
	})

	it("Check if boards are in chronological order", () => {
	})
})