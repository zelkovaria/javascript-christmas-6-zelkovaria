import { MissionUtils } from "@woowacourse/mission-utils";

import { MESSAGE } from "../constants/message.js";
import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Promotion from "../models/Promotion.js";
import DateManager from "../models/Date.js";

class ChristmasController {
  constructor() {
    this.promotion = new Promotion();
  }

  async order() {
    const nowDay = await DateManager.getDate();
    const menus = await this.#getInputMenu();
    OutputView.readInputMenu(menus);
    OutputView.readTotalPrice(menus);
    OutputView.readPromotionItems(menus);

    const discount = await this.#promotionTypes(nowDay, menus);
    OutputView.readPromotions(discount);
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
    return this.promotion.dDayDiscount(nowDay);
  }
}
export default ChristmasController;
