// Date.js
import { MissionUtils } from "@woowacourse/mission-utils";
import Validator from "../utils/validator.js";
import { MESSAGE } from "../constants/message.js";

class DateManager {
  static async getDate() {
    let date;
    let inputDateValid = false;

    while (!inputDateValid) {
      date = await MissionUtils.Console.readLineAsync(
        "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n"
      );

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