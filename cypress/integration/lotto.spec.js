describe("ui-play", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
  })

  it("사이트 접속시에 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get("#buy").children().should("exist")
    cy.get("#pocket").children().should("not.exist")
    cy.get("#winning").children().should("not.exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket").children().should("exist")
    cy.get("#winning").children().should("exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-lottos").children().its("length").should("eq", 5)
  })

  it("번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect($numbers.text().split(" ").length).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect(new Set($numbers.text().split(" ")).size).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      cy.get($numbers.text().split(" ")).each(($number) => {
        cy.wrap(parseInt($number, 10)).should("be.lte", 45).and("be.gte", 1)
      })
    })
  })

  it("", () => {
    cy.get("#winning-result-button").click("")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "최소 입력금액은 1000원입니다."
    )
  })
})

describe("ui-exception", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
    cy.window()
      .then((win) => cy.stub(win, "alert"))
      .as("alertStub")
  })

  it("금액에 소수점을 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("432.13")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "금액은 소수가 될 수 없습니다."
    )
  })

  it("금액에 음수를 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("-1000")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should("be.calledWith", "금액은 자연수여야 합니다.")
  })

  it("금액에 1000원 미만을 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("500")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "최소 입력금액은 1000원입니다."
    )
  })
})
