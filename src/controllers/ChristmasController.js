import { MissionUtils } from "@woowacourse/mission-utils";

import { MESSAGE } from "../constants/message.js";
import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Appetizer from "../models/Appetizer.js";

class ChristmasController {
  constructor() {
    this.appetizer = new Appetizer();
  }

  async orderStart() {
    const menus = await this.#getInputMenu();
    OutputView.readInputMenu(menus);
    MissionUtils.Console.print(
      this.appetizer.calculateAppetizerTotalPrice(menus)
    );
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
}
export default ChristmasController;
