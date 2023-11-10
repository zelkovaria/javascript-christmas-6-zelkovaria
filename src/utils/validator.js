import { MESSAGE } from "../constants/message.js";
import { CONSTANTS } from "../constants/constants.js";

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
    const parts = order.split("-");
    if (parts.length !== 2 || !parts[1] || isNaN(parseInt(parts[1], 10))) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }
}

export default Validator;
