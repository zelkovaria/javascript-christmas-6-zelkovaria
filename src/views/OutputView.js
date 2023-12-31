import { MissionUtils } from "@woowacourse/mission-utils";

import Promotion from "../models/Promotion.js";
import FormatPrice from "../utils/FormatPrice.js";
import { MESSAGE } from "../constants/message.js";

const OutputView = {
  readInputMenu(date, menuOrders) {
    const formattedOrders = menuOrders
      .map((order) => `${order.name} ${order.quantity}개`)
      .join(MESSAGE.ENTER);
    MissionUtils.Console.print(MESSAGE.OUTPUT_EVENT_PREVIEW(date));
    MissionUtils.Console.print(
      MESSAGE.OUTPUT_ORDERED_MENU + formattedOrders + MESSAGE.ENTER
    );
  },

  readTotalPrice(menus) {
    const promotion = new Promotion();
    MissionUtils.Console.print(
      MESSAGE.OUTPUT_BEFORE_DISCOUNT_TOTALMONEY +
        promotion.calculateTotalPrice(menus) +
        MESSAGE.OUTPUT_MONEY_UNIT +
        MESSAGE.ENTER
    );
  },

  readPromotionItems(menus) {
    const promotion = new Promotion();
    MissionUtils.Console.print(
      MESSAGE.OUTPUT_APPLY_MENU +
        promotion.applyPromotionItems(menus) +
        MESSAGE.ENTER
    );
  },

  async readPromotions(discounts, noDiscounts) {
    if (noDiscounts) {
      MissionUtils.Console.print(MESSAGE.BENEFIT_SERVICE_NOTHING);
      return;
    }

    MissionUtils.Console.print(MESSAGE.BENEFIT_SERVICE);
    for (const [key, value] of Object.entries(discounts)) {
      if (
        FormatPrice.replaceFormatPrice(value) !== 0 &&
        value !== MESSAGE.NOTHING
      ) {
        const formattedValue = `-${value}원`;
        MissionUtils.Console.print(`${key}: ${formattedValue}`);
      }
    }
  },

  readTotalDiscount(totalDiscount) {
    MissionUtils.Console.print(MESSAGE.TOTAL_DISCOUNT_MONEY);
    totalDiscount === 0
      ? MissionUtils.Console.print(MESSAGE.NOTHING_MONEY)
      : MissionUtils.Console.print(
          `-${FormatPrice.formatPrice(totalDiscount)}원\n`
        );
  },

  readAfterDiscountPrice(price, totalDiscount) {
    MissionUtils.Console.print(MESSAGE.OUTPUT_AFTER_DISCOUNT_PRICE);
    if (totalDiscount > 0) {
      MissionUtils.Console.print(
        FormatPrice.formatPrice(price) + MESSAGE.OUTPUT_MONEY_UNIT_ENTER
      );
    } else {
      MissionUtils.Console.print(
        FormatPrice.formatPrice(price - totalDiscount) +
          MESSAGE.OUTPUT_MONEY_UNIT_ENTER
      );
    }
  },

  readDiscountBadge(badge) {
    MissionUtils.Console.print(MESSAGE.OUTPUT_EVENT_BADGE);
    MissionUtils.Console.print(badge + MESSAGE.ENTER);
  },
};

export default OutputView;
