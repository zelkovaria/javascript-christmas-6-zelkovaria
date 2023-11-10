import { MissionUtils } from "@woowacourse/mission-utils";

import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import { MESSAGE } from "../constants/message.js";

class ChristmasController {
  constructor() {}

  async orderStart() {
    const menus = await this.#getInputMenu();
    OutputView.readInputMenu(menus);
  }

  async #getInputMenu() {
    let menuOrders = [];
    let inputValid = false;

    while (!inputValid) {
      try {
        const userInput = await InputView.inputUserMenu();
        const orders = userInput.map((item) => item.trim());
        orders.forEach((order) => Validator.validateMenuOrder(order));
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
}
export default ChristmasController;
