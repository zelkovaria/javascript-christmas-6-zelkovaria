import { DESSERT_ITEMS } from "../src/constants/constants.js";
import Dessert from "../src/models/Dessert.js";

describe("DessertTest", () => {
  let dessert;

  beforeEach(() => {
    dessert = new Dessert();
  });

  test("주문된 디저트는 존재하는 메뉴에 대해서만 결과를 반환한다", () => {
    const menus = [
      { name: DESSERT_ITEMS[0].name, quantity: 2 },
      { name: "존재하지 않는 메뉴", quantity: 3 },
    ];
    const processedOrders = dessert.dessertProcessOrder(menus);

    expect(processedOrders).toEqual([
      { name: DESSERT_ITEMS[0].name, quantity: 2 },
    ]);
  });

  test("메뉴에 존재하는 디저트의 총 가격을 계산한다", () => {
    const menus = [
      { name: DESSERT_ITEMS[0].name, quantity: 2 },
      { name: DESSERT_ITEMS[1].name, quantity: 3 },
    ];
    const totalPrice = dessert.calculateDessertTotalPrice(menus);
    const expectedPrice =
      DESSERT_ITEMS[0].price * 2 + DESSERT_ITEMS[1].price * 3;

    expect(totalPrice).toBe(expectedPrice);
  });
});
