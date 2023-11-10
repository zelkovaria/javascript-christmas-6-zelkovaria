import { MESSAGE } from "../constants/message.js";
import { CONSTANTS } from "../constants/constants.js";
import MenuParser from "../utils/MenuParser.js";

class Validator {
  static validateDate(date) {
    let inputDate = parseInt(date, 10);
    const isNotANumber = isNaN(inputDate);
    const isValid =
      inputDate > CONSTANTS.MAX_DATE || inputDate < CONSTANTS.MIN_DATE;
    if (isValid || isNotANumber) {
      throw new Error(MESSAGE.INVALID_DATE);
    }
  }

  static validateMenuOrder(order) {
    if (
      MenuParser.divideMenuSet(order).length !== 2 ||
      !MenuParser.divideMenuSet(order)[1] ||
      isNaN(parseInt(MenuParser.divideMenuSet(order)[1], 10))
    ) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }
}

export default Validator;
