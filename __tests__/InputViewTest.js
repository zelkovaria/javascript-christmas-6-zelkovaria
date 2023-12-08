import InputView from "../src/views/InputView.js";
import { MissionUtils } from "@woowacourse/mission-utils";

jest.mock("@woowacourse/mission-utils", () => ({
  MissionUtils: {
    Console: {
      readLineAsync: jest.fn(),
    },
  },
}));

describe("InputViewTest", () => {
  test(",를 기준으로 메뉴와 수량을 구분한다", async () => {
    const userInput = "해산물파스타-2,레드와인-1";
    const expected = ["해산물파스타-2", "레드와인-1"];
    MissionUtils.Console.readLineAsync.mockResolvedValue(userInput);

    const result = await InputView.inputUserMenu();

    expect(result).toEqual(expected);
    expect(MissionUtils.Console.readLineAsync).toHaveBeenCalled();
  });
});
