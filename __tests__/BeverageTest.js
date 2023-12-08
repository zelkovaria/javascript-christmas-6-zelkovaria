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

  test("메뉴에 존재하는 음료의 총 주문 가격을 계산한다", () => {
    const menus = [
      { name: BEVERAGE_ITEMS[0].name, quantity: 3 },
      { name: BEVERAGE_ITEMS[1].name, quantity: 2 },
    ];
    const totalPrice = beverage.calculateBeverageTotalPrice(menus);
    const expectedPrice =
      BEVERAGE_ITEMS[0].price * 3 + BEVERAGE_ITEMS[1].price * 2;

    expect(totalPrice).toBe(expectedPrice);
  });

  test("입력받은 메뉴가 음료 메뉴에 존재하는지 확인한다", () => {
    const existingItem = BEVERAGE_ITEMS[0].name;
    const nonExistingItem = "존재하지 않는 메뉴";

    expect(beverage.isMenuAvailable(existingItem)).toBe(true);
    expect(beverage.isMenuAvailable(nonExistingItem)).toBe(false);
  });
});
