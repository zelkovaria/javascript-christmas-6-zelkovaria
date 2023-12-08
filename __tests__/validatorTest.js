import Validator from "../src/utils/validator";
import Promotion from "../src/models/Promotion.js";
import { MESSAGE } from "../src/constants/message";

describe("ValidateTest", () => {
  //validateDate test
  test.each([
    ["3!@", MESSAGE.INVALID_DATE],
    ["3a", MESSAGE.INVALID_DATE],
    ["3가나다", MESSAGE.INVALID_DATE],
    ["2 3", MESSAGE.INVALID_DATE],
  ])(
    "입력한 날짜는 정수 외에 문자가 포함되어 있으면 예외가 발생한다",
    (input, expected) => {
      expect(() => Validator.validateDate(input)).toThrow(expected);
    }
  );

  //validateMenuOrder
  test("올바른 형식의 주문은 예외를 발생시키지 않는다", () => {
    expect(() => Validator.validateMenuOrder("티본스테이크-2")).not.toThrow();
  });

  test.each([
    ["티본스테이크.2", MESSAGE.INVALID_MENU_ORDER],
    ["티본스테이크a2", MESSAGE.INVALID_MENU_ORDER],
    ["티본스테이크크크2", MESSAGE.INVALID_MENU_ORDER],
    ["티본스테이크 2", MESSAGE.INVALID_MENU_ORDER],
  ])("잘못된 구분자를 사용한 주문은 예외가 발생한다", (input, expected) => {
    expect(() => Validator.validateMenuOrder(input)).toThrow(expected);
  });

  describe("validateOnlyBeverage", () => {
    let mockPromotion;

    beforeEach(() => {
      mockPromotion = new Promotion();
    });

    test("음료 메뉴만 포함된 경우는 예외가 발생한다", () => {
      mockPromotion.isOnlyBeverageOrder = jest.fn().mockReturnValue(true);

      const menus = [{ name: "제로콜라", quantity: 2 }];
      expect(() =>
        Validator.validateOnlyBeverage(menus, mockPromotion)
      ).toThrow(MESSAGE.INVALID_BEVERAGE_ONLY);
    });

    test("음료 외의 항목을 포함한 메뉴는 예외를 발생시키지 않는다", () => {
      mockPromotion.isOnlyBeverageOrder = jest.fn().mockReturnValue(false);

      const menus = [
        { name: "티본스테이크", quantity: 1 },
        { name: "제로콜라", quantity: 2 },
      ];
      expect(() =>
        Validator.validateOnlyBeverage(menus, mockPromotion)
      ).not.toThrow();
    });
  });
});
