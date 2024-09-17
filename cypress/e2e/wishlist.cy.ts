/// <reference types="cypress" />

// describe("wishlist page access test", () => {
//   before(() => {
//     cy.clock()
//   })
//   it("should be unable to visit wishlist page without login", () => {
//     cy.visit("/wishlist")
//     cy.tick(1000)
//     cy.contains("로그인 이후에").as("error").should("exist")
//     cy.tick(5000)
//     cy.contains("@error").should("not.exist")
//     cy.location("pathname").should("eq", "/")
//   })
// })

describe("add wish button test", () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.login()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.visit("/findMeeting").then((win) => {
      cy.spy(win.localStorage, "setItem").as("storeGathering")
      cy.spy(win.localStorage, "getItem").as("getWishList")
    })
  })

  it("should be able to add gathering to wishlist", () => {
    cy.intercept("/findMeeting/972").as("testPage")
    cy.get('[href="/findMeeting/972"] > .left-0').click()
    cy.wait("@testPage")
    cy.get("button[aria-label=wishAdd]").click({ multiple: true })
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("have.text", "1")
  })

  it("should be able to cancel wishlist", () => {
    cy.intercept("/findMeeting/972").as("testPage")
    cy.get('[href="/findMeeting/972"] > .left-0').click()
    cy.wait("@testPage")
    cy.get("button[aria-label=wishAdd]").click({ multiple: true })
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("have.text", "1")
    cy.get("button[aria-label=wishAdd]").click({ multiple: true })
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("not.exist")
  })
})

describe("wishlist page test", () => {
  beforeEach(() => {
    cy.login()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.visit("/wishlist")
  })
  it("should access wishlist page", () => {
    cy.get(".text-lg").last().should("have.text", "찜한 모임")
    cy.contains("마감되기 전에 지금 바로 참여해보세요").should("be.visible")
    cy.contains("아직 찜한 모임이 없어요").should("be.visible")
  })
  it("should change active state", () => {
    cy.contains("워케이션").click()
    cy.contains("워케이션").should("have.attr", "class").and("contain", "active")
    cy.contains("지역 선택").click()
    cy.contains("건대입구").click()
    cy.get(":nth-child(1) > .relative.inline-flex > .cursor-pointer").should(
      "have.text",
      "건대입구",
    )
    cy.contains("날짜 선택").click()
    cy.get(".react-calendar__navigation__label").should("be.visible")
    cy.contains("마감 임박 순").click()
    cy.get(".ml-auto > .relative > .absolute").should("be.visible")
    cy.get('[value="dateTime"]').click()
    cy.contains("등록순").should("be.visible")
  })
})
