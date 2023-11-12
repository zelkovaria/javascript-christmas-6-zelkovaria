// Date.js
import { MissionUtils } from "@woowacourse/mission-utils";
import Validator from "../utils/validator.js";
import { MESSAGE } from "../constants/message.js";

class DateManager {
  static async getDate() {
    let date;
    let inputDateValid = false;

    while (!inputDateValid) {
      date = await MissionUtils.Console.readLineAsync(MESSAGE.INPUT_DATE_GUIDE);

      try {
        Validator.validateDate(date);
        inputDateValid = true;
      } catch (error) {
        MissionUtils.Console.print(MESSAGE.INVALID_DATE);
      }
    }

    return date;
  }
}

export default DateManager;
