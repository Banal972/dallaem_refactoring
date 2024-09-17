describe("log-in page test", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.contains("로그인").click({ waitForAnimations: true })
  })

  it("should be trigger login popup", () => {
    cy.contains("아이디").should("be.visible")
    cy.get("#email").should("have.attr", "placeholder").should("contain", "이메일을 입력해주세요")
    cy.contains("비밀번호").should("be.visible")
    cy.get("#password")
      .should("have.attr", "placeholder")
      .should("contain", "비밀번호를 입력해주세요")
    cy.contains("같이달램이 처음 이신가요?").should("be.visible")
  })
})
