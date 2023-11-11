import { MissionUtils } from "@woowacourse/mission-utils";

import { MESSAGE } from "../constants/message.js";
import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Promotion from "../models/Promotion.js";
import DateManager from "../models/Date.js";
import FormatPrice from "../utils/FormatPrice.js";

class ChristmasController {
  constructor() {
    this.promotion = new Promotion();
  }

  async order() {
    const nowDay = await DateManager.getDate();
    const menus = await this.#getInputMenu();
    OutputView.readInputMenu(nowDay, menus);
    OutputView.readTotalPrice(menus);
    OutputView.readPromotionItems(menus);

    const discount = await this.#promotionTypes(nowDay, menus);
    OutputView.readPromotions(discount);
    OutputView.readTotalDiscount(this.#totalDiscountPrice(nowDay, menus));
    OutputView.readAfterDiscountPrice(
      this.promotion.afterDiscountPrice(nowDay, menus),
      this.#totalDiscountPrice(nowDay, menus)
    );

    const badge = this.promotion.getDiscountBadge(nowDay, menus);
    OutputView.readDiscountBadge(badge);
  }

  async #getInputMenu() {
    let menuOrders = [];
    let inputValid = false;

    while (!inputValid) {
      try {
        const userInput = await InputView.inputUserMenu();
        const orders = userInput.map((item) => item.trim());
        Validator.totalMenuValidator(orders);
        menuOrders = orders.map((order) => {
          const [name, quantity] = order.split("-");
          return { name, quantity: parseInt(quantity, 10) };
        });

        inputValid = true;
      } catch (error) {
        MissionUtils.Console.print(MESSAGE.INVALID_MENU_ORDER);
      }
    }
    return menuOrders;
  }

  async #promotionTypes(nowDay, menus) {
    return {
      "크리스마스 디데이 할인": FormatPrice.formatPrice(
        this.promotion.dDayDiscount(nowDay)
      ),
      "평일 할인": FormatPrice.formatPrice(
        this.promotion.weekdayDiscount(nowDay, menus)
      ),
      "주말 할인": FormatPrice.formatPrice(
        this.promotion.weekendDiscount(nowDay, menus)
      ),
      "특별 할인": FormatPrice.formatPrice(
        this.promotion.specailDiscount(nowDay)
      ),
      "증정 이벤트": FormatPrice.formatPrice(
        this.promotion.applyDiscount(menus)
      ),
    };
  }

  #totalDiscountPrice(nowDay, menus) {
    return this.promotion.calculateTotalDiscount(nowDay, menus);
  }
}
export default ChristmasController;
