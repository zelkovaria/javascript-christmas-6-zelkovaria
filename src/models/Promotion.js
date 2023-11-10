import { MissionUtils } from "@woowacourse/mission-utils";

import Validator from "../utils/validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Appetizer from "../models/Appetizer.js";
import MainCourse from "../models/MainCourse.js";
import Dessert from "../models/Dessert.js";
import Beverage from "../models/Beverage.js";
import FormatPrice from "../utils/FormatPrice.js";

class Promotion {
  constructor() {
    this.appetizer = new Appetizer();
    this.maincourse = new MainCourse();
    this.dessert = new Dessert();
    this.beverage = new Beverage();
  }

  calculateTotalPrice(menus) {
    const totalPrice =
      this.appetizer.calculateAppetizerTotalPrice(menus) +
      this.maincourse.calculateMainCourseTotalPrice(menus) +
      this.dessert.calculateDessertTotalPrice(menus) +
      this.beverage.calculateBeverageTotalPrice(menus);

    return FormatPrice.formatPrice(totalPrice);
  }
}

export default Promotion;
