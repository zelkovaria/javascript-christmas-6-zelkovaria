import { MESSAGE } from "../constants/message.js";
import { CONSTANTS } from "../constants/constants.js";
import MenuParser from "../utils/MenuParser.js";

class Validator {
  static validateDate(date) {
    const isOnlyNumbers = /^\d+$/.test(date);
    if (!isOnlyNumbers) {
      throw new Error(MESSAGE.INVALID_DATE);
    }

    let inputDate = parseInt(date, 10);
    const isOutOfRange =
      inputDate > CONSTANTS.MAX_DATE || inputDate < CONSTANTS.MIN_DATE;

    if (isOutOfRange) {
      throw new Error(MESSAGE.INVALID_DATE);
    }
  }

  static validateMenuOrder(orders) {
    if (
      MenuParser.divideMenuSet(orders).length !== 2 ||
      !MenuParser.divideMenuSet(orders)[1] ||
      isNaN(parseInt(MenuParser.divideMenuSet(orders)[1], 10))
    ) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }

  static validateMenuQuantity(orders) {
    if (parseInt(MenuParser.divideMenuSet(orders)[1], 10) <= 0) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }

  static validateMenuRepeat(orders) {
    const menuSet = new Set();
    orders.forEach((order) => {
      const menuName = order.split("-")[0].trim();
      if (menuSet.has(menuName)) {
        throw new Error(MESSAGE.INVALID_MENU_ORDER);
      }
      menuSet.add(menuName);
    });
  }

  static totalMenuValidator(orders) {
    orders.forEach((order) => {
      this.validateMenuOrder(order);
      this.validateMenuQuantity(order);
    });
    this.validateMenuRepeat(orders);
  }
}

export default Validator;
