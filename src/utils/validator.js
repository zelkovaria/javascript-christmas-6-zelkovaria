import { MESSAGE } from "../constants/message.js";
import { CONSTANTS } from "../constants/constants.js";

class Validator {
  static validateDate(date) {
    let inputDate = parseInt(date, 10);
    const isValid =
      inputDate > CONSTANTS.MAX_DATE || inputDate < CONSTANTS.MIN_DATE;
    if (isValid) {
      throw new Error(MESSAGE.INVALID_DATE);
    }
  }
}

export default Validator;
