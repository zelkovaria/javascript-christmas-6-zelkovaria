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

  test("할인 전 총 주문 금액이 프로모션 적용 기준을 넘지 않으면 아무것도 증정하지 않는다", () => {
    const menus = [
      { name: "해물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 2 },
    ];
    expect(promotion.applyPromotionItems(menus)).toBe(CONSTANTS.APPLY_NOTHING);
  });

  test("d-Day할인은 12/1~12/25사이 기간동안 1000원부터 100원씩 증가된다", () => {
    const promotion = new Promotion();
    const date = 16;
    const expectedDiscount = 2500;
    expect(promotion.dDayDiscount(date)).toBe(expectedDiscount);
  });

  test("d-Day할인은 12/25이후 최대 할인 금액이 3400원이다", () => {
    const promotion = new Promotion();
    const date = 27;
    const expectedDiscount = 3400;
    expect(promotion.dDayDiscount(date)).toBe(expectedDiscount);
  });
});
