import Promotion from "../src/models/Promotion.js";

describe("PromotionTest", () => {
  test("주어진 메뉴의 총 가격을 할인 전 가격으로 계산한다", () => {
    const promotion = new Promotion();
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "레드와인", quantity: 1 },
    ];

    const expectedPrice = "170,000";
    expect(promotion.calculateTotalPrice(menus)).toBe(expectedPrice);
  });
});
