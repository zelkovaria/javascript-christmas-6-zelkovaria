import { BEVERAGE_ITEMS } from "../src/constants/constants.js";
import Beverage from "../src/models/Beverage.js";

describe("BeverageTest", () => {
  let beverage;

  beforeEach(() => {
    beverage = new Beverage();
  });

  test("주문된 음료는 존재하는 메뉴에 대해서만 결과를 반환한다", () => {
    const menus = [
      { name: BEVERAGE_ITEMS[0].name, quantity: 3 },
      { name: "존재하지 않는 메뉴", quantity: 2 },
    ];
    const processedOrders = beverage.beverageProcessOrder(menus);

    expect(processedOrders).toEqual([
      { name: BEVERAGE_ITEMS[0].name, quantity: 3 },
    ]);
  });
});
