import { MESSAGE } from "../constants/message.js";
import { CONSTANTS } from "../constants/constants.js";
import MenuParser from "../utils/MenuParser.js";
import Promotion from "../models/Promotion.js";

class Validator {
  static validateDate(date) {
    const isOnlyNumbers = /^\d+$/.test(date);
    if (!isOnlyNumbers) {
      throw new Error(MESSAGE.INVALID_DATE);
    }

    let inputDate = parseInt(date, CONSTANTS.DECIMAL_RADIX);
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
      isNaN(
        parseInt(MenuParser.divideMenuSet(orders)[1], CONSTANTS.DECIMAL_RADIX)
      )
    ) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }

  static validateMenuQuantity(orders) {
    if (
      parseInt(MenuParser.divideMenuSet(orders)[1], CONSTANTS.DECIMAL_RADIX) <=
      0
    ) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }

  static validateMenuRepeat(orders) {
    const menuSet = new Set();
    orders.forEach((order) => {
      const menuName = MenuParser.divideMenuSet(order)[0].trim();
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

  static validateOnlyBeverage(menus, promotion) {
    if (promotion.isOnlyBeverageOrder(menus)) {
      throw new Error(MESSAGE.INVALID_BEVERAGE_ONLY);
    }
  }

  static validateMenuExist(menus, promotion) {
    if (!promotion.isMenuExist(menus)) {
      throw new Error(MESSAGE.INVALID_MENU_ORDER);
    }
  }
}

export default Validator;
