describe("home page test", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should visit home and the text", () => {
    cy.contains("같이달램").click()
    cy.location("pathname").should("eq", "/")
    cy.contains("NEW 모임").should("be.visible")
  })

  it("should visit login page", () => {
    cy.contains("로그인").click()
    cy.contains("아이디").should("be.visible")
    cy.contains("비밀번호").should("be.visible")
  })

  it("should be seen next section", () => {
    cy.scrollTo(0, 600)
    cy.contains("모임 이용자들의 실제 후기").should("be.visible")
  })

  it("should be able to request infinitely", () => {
    cy.intercept("POST", "/").as("requestData")
    cy.scrollTo("bottom")
    cy.wait("@requestData").its("response.statusCode").should("eq", 200)
    cy.get("[data-cy=reviews]").should("have.length.above", 11)
  })
})
