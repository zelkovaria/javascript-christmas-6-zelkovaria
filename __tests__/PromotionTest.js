import { CONSTANTS } from "../src/constants/constants";
import Promotion from "../src/models/Promotion.js";

describe("PromotionTest", () => {
  let promotion;

  beforeEach(() => {
    promotion = new Promotion();
  });

  test("주어진 메뉴의 총 가격을 할인 전 가격으로 계산한다", () => {
    const promotion = new Promotion();
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "레드와인", quantity: 1 },
    ];

    const expectedPrice = "170,000";
    expect(promotion.calculateTotalPrice(menus)).toBe(expectedPrice);
  });

  test("할인 전 총 주문 금액이 프로모션 적용 기준을 넘으면 샴페인을 증정한다", () => {
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "해물파스타", quantity: 1 },
      { name: "레드와인", quantity: 2 },
    ];
    expect(promotion.applyPromotionItems(menus)).toBe(
      CONSTANTS.APPLY_CHAMPAGNE
    );
  });
});
