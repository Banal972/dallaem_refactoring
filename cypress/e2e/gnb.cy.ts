describe("gnb test", () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit("/")
  })

  it("should be able to visit findMeeting", () => {
    cy.contains("모임 찾기").click()
    cy.location("pathname").should("eq", "/findMeeting")
  })

  it("should not be able to visit wishlist", () => {
    cy.contains("찜한 모임").click()
    cy.get(".right-4 > .text-gray-700").should("contain", "로그인 이후에 이용이")
    cy.location("pathname").should("eq", "/")
  })

  it("should be able to visit wishlist", () => {
    cy.login()
    cy.contains("찜한 모임").click()
    cy.location("pathname").should("eq", "/wishlist")
    cy.contains("마감되기 전에").should("be.visible")
  })

  it("should be able to visit AllReview", () => {
    cy.contains("모든 리뷰").click()
    cy.location("pathname").should("eq", "/allReview")
    cy.contains("모든 리뷰").should("be.visible")
    cy.contains("같이달램을 이용한").should("be.visible")
  })

  it("should not be able to visit mypage", () => {
    cy.contains("마이페이지").click()
    cy.get(".right-4 > .text-gray-700").should("contain", "로그인 이후에 이용이")
    cy.location("pathname").should("eq", "/")
  })
})
