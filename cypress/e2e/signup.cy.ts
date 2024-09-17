describe("sign-up page test", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.contains("로그인").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.contains("회원가입").click()
  })

  it("should visit sign up page", () => {
    cy.contains("회원가입").should("be.visible")
    cy.contains("이름").should("be.visible")
    cy.contains("아이디").should("be.visible")
    cy.contains("회사명").should("be.visible")
    cy.contains("비밀번호").should("be.visible")
    cy.contains("비밀번호 확인").should("be.visible")
  })

  it("should show error message", () => {
    cy.get("#name").click()
    cy.contains("회원가입").click()
    cy.contains("이름을 입력해주세요").should("be.visible")
    cy.contains("아이디을 입력해주세요").should("be.visible")
    cy.contains("회사명을 입력해주세요").should("be.visible")
    cy.contains("비밀번호을 입력해주세요").should("be.visible")
  })

  it("should show extra error message", () => {
    const testId = Cypress.env("TEST_ID")
    const testPassword = Cypress.env("TEST_PASSWORD")
    cy.get("#name").type("test")
    cy.get("#email").type("test")
    cy.contains("회원가입").click()
    cy.contains("이메일양식에 맞게").should("be.visible")
    cy.get("#email").type(testId)
    cy.get("#companyName").type("test10")
    cy.get("#password").type("test10")
    cy.contains("회원가입").click()
    cy.contains("8자 이상, 숫자, 소문자").should("be.visible")
    cy.get("#password").type(testPassword.concat("1!"))
    cy.get("#verify-password").type(testPassword.concat("1"))
    cy.contains("회원가입").click()
    cy.contains("비밀번호가 서로 다릅니다").should("be.visible")
  })

  it("should show password after clicking button", () => {
    cy.get("#password").type("1234")
    cy.get(":nth-child(4) > .relative > .absolute > img").first().click()
    cy.get("#password").should("have.attr", "type").and("equal", "text")
    cy.get(":nth-child(4) > .relative > .absolute > img").first().click()
    cy.get("#password").should("have.attr", "type").and("equal", "password")
  })

  it("should be disable to sign up with same email", () => {
    const testId = Cypress.env("TEST_ID")
    const testPassword = Cypress.env("TEST_PASSWORD")
    cy.get("#name").type("test")
    cy.get("#name").blur()
    cy.get("#email").type(testId)
    cy.get("#email").blur()
    cy.get("#companyName").type("test10")
    cy.get("#companyName").blur()
    cy.get("#password").type(testPassword.concat("1!"))
    cy.get("#password").blur()
    cy.get("#verify-password").type(testPassword.concat("1!"))
    cy.get("#verify-password").blur()
    cy.contains("회원가입").click()
    cy.contains("이미 사용 중인").should("be.visible")
  })

  it("should be able to sign up", () => {
    const testId = Cypress.env("TEST_ID")
    const testPassword = Cypress.env("TEST_PASSWORD")
    cy.intercept("POST", "/", {
      statusCode: 201,
      body: {
        message: "사용자 생성 성공",
      },
    }).as("signupRequest")
    cy.get("#name").type("test")
    cy.get("#name").blur()
    cy.get("#email").type(testId)
    cy.get("#email").blur()
    cy.get("#companyName").type("test18")
    cy.get("#companyName").blur()
    cy.get("#password").type(testPassword.concat("1!"))
    cy.get("#password").blur()
    cy.get("#verify-password").type(testPassword.concat("1!"))
    cy.get("#verify-password").blur()
    cy.contains("회원가입").click()
    cy.wait("@signupRequest").then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
    })
    cy.contains("가입이 완료되었습니다.").should("be.visible")
    cy.contains("확인").click()
    cy.location("pathname").should("eq", "/")
  })
})
