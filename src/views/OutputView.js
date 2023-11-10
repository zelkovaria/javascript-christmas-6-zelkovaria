import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

const OutputView = {
  async readDate() {
    const date = await InputView.readDate();
    MissionUtils.Console.print(`입력날짜 ${date}`);
  },

  readInputMenu(menuOrders) {
    const formattedOrders = menuOrders
      .map((order) => `${order.name} - 수량: ${order.quantity}`)
      .join(", ");
    MissionUtils.Console.print(`주문하신 메뉴: ${formattedOrders}`);
  },
};

export default OutputView;
