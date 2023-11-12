import { MissionUtils } from "@woowacourse/mission-utils";

import { MESSAGE } from "../constants/message.js";
import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Promotion from "../models/Promotion.js";
import DateManager from "../models/Date.js";
import FormatPrice from "../utils/FormatPrice.js";
import MenuParser from "../utils/MenuParser.js";
import { CONSTANTS } from "../constants/constants.js";

class ChristmasController {
  constructor() {
    this.promotion = new Promotion();
  }

  async order() {
    const nowDay = await DateManager.getDate();
    const menus = await this.#getInputMenu();

    Validator.validateOnlyBeverage(menus, this.promotion);

    OutputView.readInputMenu(nowDay, menus);
    OutputView.readTotalPrice(menus);
    OutputView.readPromotionItems(menus);

    const totalDiscount = this.#totalDiscountPrice(nowDay, menus);
    OutputView.readTotalDiscount(totalDiscount);

    const discount = await this.#promotionTypes(nowDay, menus);
    OutputView.readPromotions(discount, totalDiscount === 0);
    OutputView.readAfterDiscountPrice(
      this.promotion.afterDiscountPrice(nowDay, menus),
      totalDiscount
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
          const [name, quantity] = MenuParser.divideMenuSet(order);
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
      [CONSTANTS.PROMOTION_D_DAY]: FormatPrice.formatPrice(
        this.promotion.dDayDiscount(nowDay)
      ),
      [CONSTANTS.PROMOTION_WEEKDAY]: FormatPrice.formatPrice(
        this.promotion.weekdayDiscount(nowDay, menus)
      ),
      [CONSTANTS.PROMOTION_WEKKEND]: FormatPrice.formatPrice(
        this.promotion.weekendDiscount(nowDay, menus)
      ),
      [CONSTANTS.PROMOTION_SPECAIL]: FormatPrice.formatPrice(
        this.promotion.specailDiscount(nowDay)
      ),
      [CONSTANTS.PROMOTION_GIFT]: FormatPrice.formatPrice(
        this.promotion.applyDiscount(menus)
      ),
    };
  }

  #totalDiscountPrice(nowDay, menus) {
    return this.promotion.calculateTotalDiscount(nowDay, menus);
  }
}
export default ChristmasController;
