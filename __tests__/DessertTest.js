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
});
