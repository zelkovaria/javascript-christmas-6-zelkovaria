import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

const OutputView = {
  async readDate() {
    const date = await InputView.readDate();
    MissionUtils.Console.print(`입력날짜 ${date}`);
  },

  readInputMenu(menuOrders) {
    const formattedOrders = menuOrders
      .map((order) => `${order.name} ${order.quantity}개`)
      .join("\n");
    MissionUtils.Console.print("<주문 메뉴>\n" + formattedOrders + "\n");
  },
};

export default OutputView;
