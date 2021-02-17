import LottoModel from "./model.js";
import { $, getQuotient, getRandomNumber } from "./util.js";
import LottoView from "./view.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
  }

  init() {
    // handleMoney
  }

  getBuyInputValue() {
    return $("#buy-input").value;
  }

  getCount(price) {
    return getQuotient(price, 1000);
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== 6) {
      lotto.add(getRandomNumber(1, 45));
    }
    return [...lotto];
  }

  createPocket() {
    // 모델에서 detail 가져옴
    // pocket view 생성,
    // pocket handler 추가
  }

  manageLotto() {
    // 구입금액 가져옴.
    // 횟수 도출,
    // 로또번호 생성,
    // model에 로또번호저장,
    // 모델에서 detail 가져옴
    // pocket view 생성,
    // pocket handler 추가
  }

  manageDetail() {
    // 모델에서 detail 가져옴
    // pocket view 재생성,
    // pocket handler 추가
    // detail = !detail
  }

  handleMoney() {
    const $buyButton = $("#buy-button");
    $buyButton.addEventListener("click", () => {
      this.manageLotto();
    });
  }

  handlePocket() {
    const $pocketButton = $("#pocket-toggle-number");
    $pocketButton.addEventListener("click", () => {
      this.manageDetail();
    });
  }
}