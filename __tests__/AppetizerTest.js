import { APPETIZER_ITEMS } from "../src/constants/constants.js";
import Appetizer from "../src/models/Appetizer.js";

describe("AppetizerTest", () => {
  let appetizer;

  beforeEach(() => {
    appetizer = new Appetizer();
  });

  test("주문된 애피타이저는 존재하는 메뉴에 대해서만 결과를 반환한다", () => {
    const menus = [
      { name: APPETIZER_ITEMS[0].name, quantity: 2 },
      { name: "존재하지 않는 메뉴", quantity: 1 },
    ];
    const processedOrders = appetizer.appetizerProcessOrder(menus);

    expect(processedOrders).toEqual([
      { name: APPETIZER_ITEMS[0].name, quantity: 2 },
    ]);
  });

  test("메뉴에 존재하는 애피타이저의 총 가격을 계산한다", () => {
    const menus = [
      { name: APPETIZER_ITEMS[0].name, quantity: 2 },
      { name: APPETIZER_ITEMS[1].name, quantity: 1 },
    ];
    const totalPrice = appetizer.calculateAppetizerTotalPrice(menus);
    const expectedPrice =
      APPETIZER_ITEMS[0].price * 2 + APPETIZER_ITEMS[1].price * 1;

    expect(totalPrice).toBe(expectedPrice);
  });
});
