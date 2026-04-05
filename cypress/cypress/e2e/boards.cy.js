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

	it("Check board was created", () => {
		cy.wait(200)

		cy.get(".board-title").eq(0).should("have.text", "Test board").and("be.visible")
		cy.get(".board-description-box").eq(0).should("have.text", "Test description").and("be.visible")

		cy.wait(500)
	})

	it("Board archival", () => {
		cy.wait(200)

		cy.get(".board-options-button").eq(0).should("be.visible").and("be.enabled")
		cy.get(".board-options-button").eq(0).click()
		cy.wait(100)

		cy.get("#board-menu-archive-button").eq(0).should("be.visible").and("be.enabled")
		cy.get("#board-menu-archive-button").eq(0).click()
		cy.wait(100)

		cy.get("#message-question-yes").should("be.visible").and("be.enabled")
		cy.get("#message-question-yes").click()
		cy.wait(100)

		cy.get(".board-title").eq(0).should("not.include.text", "Test board")
		cy.wait(500)		
	})

	it("Board deletion", () => {
		cy.wait(200)

		cy.get("#header-open-archive-button").should("be.visible").and("be.enabled")
		cy.get("#header-open-archive-button").click()
		cy.wait(100)

		cy.get(".archive-delete-button").eq(0).should("be.visible").and("be.enabled")
		cy.get(".archive-delete-button").eq(0).click()
		cy.wait(100)

		cy.get("#message-question-yes").should("be.visible").and("be.enabled")
		cy.get("#message-question-yes").click()
		cy.wait(100)

		cy.get('body').then(($body) => {
			if ($body.find(".board-archive-title").length > 0)
				cy.get(".board-archive-title").eq(0).should("not.include.text", "Test board")
		})
		cy.wait(500)
	})
})