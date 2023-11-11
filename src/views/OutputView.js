import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

import Promotion from "../models/Promotion.js";
import FormatPrice from "../utils/FormatPrice.js";

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

  async readPromotions(discounts) {
    const discountsData = await discounts;
    MissionUtils.Console.print("<혜택 내역>\n");
    for (const [key, value] of Object.entries(discountsData)) {
      if (FormatPrice.replaceFormatPrice(value) !== 0 && value !== "없음") {
        const formattedValue = `-${value}원`;
        MissionUtils.Console.print(`${key}: ${formattedValue}\n`);
      }
    }
  },

  readApplyPromotions(menus) {
    const promotion = new Promotion();
    const applyDiscounts = promotion.applyDiscount(menus);
    if (applyDiscounts === "-25000") {
      MissionUtils.Console.print(`증정 이벤트: ${applyDiscounts}\n`);
    }
  },

  readTotalDiscount(totalDiscount) {
    MissionUtils.Console.print("<총혜택 금액>");
    MissionUtils.Console.print(`-${FormatPrice.formatPrice(totalDiscount)}\n`);
  },
};

export default OutputView;
