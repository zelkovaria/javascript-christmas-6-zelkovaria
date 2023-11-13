import Validator from "../src/utils/validator";
import { MESSAGE } from "../src/constants/message";

describe("ValidateTest", () => {
  //validateDate test
  test("입력한 날짜는 특수문자가 들어가면 예외가 발생한다.", () => {
    expect(() => Validator.validateDate("3!@")).toThrow(MESSAGE.INVALID_DATE);
  });

  test("입력한 날짜는 영어가 들어가면 예외가 발생한다", () => {
    expect(() => Validator.validateDate("3a")).toThrow(MESSAGE.INVALID_DATE);
  });

  test("입력한 날짜는 한글이 들어가면 예외가 발생한다", () => {
    expect(() => Validator.validateDate("3가나다")).toThrow(
      MESSAGE.INVALID_DATE
    );
  });

  test("입력한 날짜는 공백이 들어가면 예외가 발생한다", () => {
    expect(() => Validator.validateDate("2 3")).toThrow(MESSAGE.INVALID_DATE);
  });

  //validateMenuOrder
  test("올바른 형식의 주문은 예외를 발생시키지 않는다", () => {
    expect(() => Validator.validateMenuOrder("티본스테이크-2")).not.toThrow();
  });

  test("잘못된 구분자를 사용한 주문은 예외가 발생한다", () => {
    expect(() => Validator.validateMenuOrder("티본스테이크.2")).toThrow(
      MESSAGE.INVALID_MENU_ORDER
    );
  });

  test("잘못된 구분자를 사용한 주문은 예외가 발생한다", () => {
    expect(() => Validator.validateMenuOrder("티본스테이크a2")).toThrow(
      MESSAGE.INVALID_MENU_ORDER
    );
  });
});
