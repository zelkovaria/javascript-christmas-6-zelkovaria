import { MissionUtils } from "@woowacourse/mission-utils";

import { MESSAGE } from "../constants/message.js";
import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Appetizer from "../models/Appetizer.js";
import MainCourse from "../models/MainCourse.js";
import Dessert from "../models/Dessert.js";
import Beverage from "../models/Beverage.js";

class ChristmasController {
  constructor() {
    this.appetizer = new Appetizer();
    this.maincourse = new MainCourse();
    this.dessert = new Dessert();
    this.beverage = new Beverage();
  }

  async orderStart() {
    const menus = await this.#getInputMenu();
    OutputView.readInputMenu(menus);
    MissionUtils.Console.print(
      this.appetizer.calculateAppetizerTotalPrice(menus)
    );
    MissionUtils.Console.print(
      this.maincourse.calculateMainCourseTotalPrice(menus)
    );
    MissionUtils.Console.print(this.dessert.calculateDessertTotalPrice(menus));
    MissionUtils.Console.print(
      this.beverage.calculateBeverageTotalPrice(menus)
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
