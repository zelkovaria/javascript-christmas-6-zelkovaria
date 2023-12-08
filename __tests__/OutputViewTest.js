import OutputView from "../src/views/OutputView";
import { MissionUtils } from "@woowacourse/mission-utils";
import { MESSAGE } from "../src/constants/message";

jest.mock("@woowacourse/mission-utils", () => ({
  MissionUtils: {
    Console: {
      print: jest.fn(),
    },
  },
}));

describe("OutputViewTest", () => {
  beforeEach(() => {
    MissionUtils.Console.print.mockClear();
  });

  test("readInputMenu는 메뉴와 수량을 정확하게 출력한다", () => {
    const date = 3;
    const menuOrders = [
      { name: "해산물파스타", quantity: 2 },
      { name: "레드와인", quantity: 1 },
    ];
    const expectedString = "해산물파스타 2개\n레드와인 1개";

    OutputView.readInputMenu(date, menuOrders);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith(
      MESSAGE.OUTPUT_ORDERED_MENU + expectedString + "\n"
    );
  });
});
