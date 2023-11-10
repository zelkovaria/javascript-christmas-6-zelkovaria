import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

import Promotion from "../models/Promotion.js";

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

  readTotalPrice(menus) {
    const promotion = new Promotion();
    MissionUtils.Console.print(
      "<할인 전 총주문 금액>\n" +
        promotion.calculateTotalPrice(menus) +
        "원" +
        "\n"
    );
  },

  readPromotionItems(menus) {
    const promotion = new Promotion();
    MissionUtils.Console.print(
      "<증정 메뉴>\n" + promotion.applyPromotionItems(menus) + "\n"
    );
  },
};

export default OutputView;
