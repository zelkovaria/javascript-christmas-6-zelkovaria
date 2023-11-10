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
    MissionUtils.Console.print(
      "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!" + "\n"
    );
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

  async readPromotions(discount) {
    const discounts = await discount;
    MissionUtils.Console.print("<혜택 내역>\n");
    for (const [key, value] of Object.entries(discounts)) {
      MissionUtils.Console.print(`${key}: -${value}원\n`);
    }
  },

  readApplyPromotions(menus) {
    const promotion = new Promotion();
    const applyDiscounts = promotion.applyDiscount(menus);
    MissionUtils.Console.print(`증정 이벤트: ${applyDiscounts}\n`);
  },
};

export default OutputView;
