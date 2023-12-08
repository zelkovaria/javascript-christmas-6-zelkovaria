import { MissionUtils } from "@woowacourse/mission-utils";
import DateManager from "../models/Date.js";
import { MESSAGE } from "../constants/message.js";

const InputView = {
  async readDate() {
    return await DateManager.getDate();
  },

  async inputUserMenu() {
    const userInput = await MissionUtils.Console.readLineAsync(
      MESSAGE.INPUT_MENU_GUIDE
    );
    return userInput.split(",").map((item) => item.trim());
  },
};

export default InputView;
