import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

const OutputView = {
  async readDate() {
    const date = await InputView.readDate();
    MissionUtils.Console.print(`입력날짜 ${date}`);
  },
};

export default OutputView;
