import DateManager from "../src/models/Date.js";
import InputView from "../src/views/InputView.js";
import Validator from "../src/utils/validator.js";
import ChristmasController from "../src/controllers/ChristmasController.js";

jest.mock("../src/models/Date.js", () => ({
  getDate: jest.fn(),
}));

jest.mock("../src/views/InputView.js", () => ({
  inputUserMenu: jest.fn(),
}));

jest.mock("../src/utils/validator.js", () => ({
  validateOnlyBeverage: jest.fn(),
  validateMenuExist: jest.fn(),
  totalMenuValidator: jest.fn(),
}));

describe("ChristmasControllerTest", () => {
  test("유저의 날짜와 메뉴 주문을 받고 올바르게 처리하는지 확인한다", async () => {
    const controller = new ChristmasController();
    const date = 25;
    const userInput = ["티본스테이크-2", "제로콜라-1"];
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "제로콜라", quantity: 1 },
    ];

    DateManager.getDate.mockResolvedValue(date);
    InputView.inputUserMenu.mockResolvedValue(userInput);

    await controller.order();

    expect(DateManager.getDate).toHaveBeenCalled();
    expect(InputView.inputUserMenu).toHaveBeenCalled();
    expect(Validator.validateOnlyBeverage).toHaveBeenCalledWith(
      menus,
      controller.promotion
    );
    expect(Validator.validateMenuExist).toHaveBeenCalledWith(
      menus,
      controller.promotion
    );
  });
});
