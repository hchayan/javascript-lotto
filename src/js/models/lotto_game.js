import LottosModel from "./lottos.js"
import { RANK, TICKET } from "../constants/constant.js"
import { getProfitRate } from "../util.js"

class LottoGameModel {
  #lottos
  #answerLotto
  #lottoResult

  constructor() {
    this.#lottos = []
    this.#answerLotto = {
      numbers: null,
      bonus: null,
    }
    this.#lottoResult = {
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
    }
  }

  #addAnswerLotto(numbers, bonus) {
    this.#answerLotto = { numbers, bonus }
  }

  #calculateMatch(ticket) {
    const match = ticket.numbers.filter((x) =>
      this.#answerLotto.numbers.includes(x)
    ).length
    const bonusMatch = ticket.numbers.includes(this.#answerLotto.bonus)

    return { match, bonusMatch }
  }

  generateLottos(count) {
    const lottosModel = new LottosModel()
    for (let i = 0; i < count; i++) {
      lottosModel.generateRandomTicket()
    }
    this.#lottos = lottosModel.lottos
  }

  calculateLottosResult(answer) {
    this.#addAnswerLotto(answer.numbers, answer.bonus)

    this.#lottos.forEach((ticket) => {
      console.log(ticket.numbers)
      const { match, bonusMatch } = this.#calculateMatch(ticket)

      let key = ""
      switch (true) {
        case match === 6:
          key = RANK.FIRST.TEXT
          break
        case match === 5 && bonusMatch:
          key = RANK.SECOND.TEXT
          break
        case match === 5 || (match === 4 && bonusMatch):
          key = RANK.THIRD.TEXT
          break
        case match === 4 || (match === 3 && bonusMatch):
          key = RANK.FOURTH.TEXT
          break
        case match === 3 || (match === 2 && bonusMatch):
          key = RANK.FIFTH.TEXT
          break
        default:
      }

      key && this.#lottoResult[key].count++
    })
  }

  get lottos() {
    return this.#lottos
  }

  get profitRate() {
    const income = Object.values(this.#lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)
    return getProfitRate(income, this.#lottos.length * TICKET.PRICE)
  }

  get lottoResult() {
    return this.#lottoResult
  }

  reset() {
    this.#answerLotto = {
      numbers: null,
      bonus: null,
    }
    this.#lottoResult = {
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
    }
  }
  init() {
    this.#lottoResult = {
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
    }
  }
}
export default LottoGameModel