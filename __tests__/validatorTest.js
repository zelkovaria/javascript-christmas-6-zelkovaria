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
});
