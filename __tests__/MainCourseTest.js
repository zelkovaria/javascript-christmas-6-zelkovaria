import { MAIN_COURSE_ITEMS } from "../src/constants/constants.js";
import MainCourse from "../src/models/MainCourse.js";

describe("MainCourseTest", () => {
  let maincourse;

  beforeEach(() => {
    maincourse = new MainCourse();
  });

  test("주문된 메인코스는 존재하는 메뉴에 대해서만 결과를 반환한다", () => {
    const menus = [
      { name: MAIN_COURSE_ITEMS[0].name, quantity: 1 },
      { name: "존재하지 않는 메뉴", quantity: 2 },
    ];
    const processedOrders = maincourse.mainCourseProcessOrder(menus);

    expect(processedOrders).toEqual([
      { name: MAIN_COURSE_ITEMS[0].name, quantity: 1 },
    ]);
  });

  test("메뉴에 존재하는 메인코스의 총 주문 가격을 계산한다", () => {
    const menus = [
      { name: MAIN_COURSE_ITEMS[0].name, quantity: 2 },
      { name: MAIN_COURSE_ITEMS[1].name, quantity: 3 },
    ];
    const totalPrice = maincourse.calculateMainCourseTotalPrice(menus);
    const expectedPrice =
      MAIN_COURSE_ITEMS[0].price * 2 + MAIN_COURSE_ITEMS[1].price * 3;

    expect(totalPrice).toBe(expectedPrice);
  });

  test("입력받은 메뉴가 메인코스 메뉴에 존재하는지 확인한다", () => {
    const existingItem = MAIN_COURSE_ITEMS[0].name;
    const nonExistingItem = "존재하지 않는 메뉴";

    expect(maincourse.isMenuAvailable(existingItem)).toBe(true);
    expect(maincourse.isMenuAvailable(nonExistingItem)).toBe(false);
  });
});
