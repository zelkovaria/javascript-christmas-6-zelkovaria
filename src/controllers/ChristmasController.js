import Appetizer from "../models/Appetizer.js";
import MainCourse from "../models/MainCourse.js";
import Dessert from "../models/Dessert.js";
import Beverage from "../models/Beverage.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";

class ChristmasController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }
}
export default ChristmasController;
