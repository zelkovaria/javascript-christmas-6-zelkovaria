import Validator from "../src/utils/validator";
import { MESSAGE } from "../src/constants/message";

describe("ValidateTest", () => {
  test("입력한 날짜는 문자가 들어가면 예외가 발생한다.", () => {
    expect(() => Validator.validateDate("3!@")).toThrow(MESSAGE.INVALID_DATE);
  });
});
