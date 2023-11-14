import { CONSTANTS } from "../src/constants/constants";
import Promotion from "../src/models/Promotion.js";

describe("PromotionTest", () => {
  let promotion;

  beforeEach(() => {
    promotion = new Promotion();
  });

  test("주어진 메뉴의 총 가격을 할인 전 가격으로 계산한다", () => {
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "레드와인", quantity: 1 },
    ];

    const expectedPrice = "170,000";
    expect(promotion.calculateTotalPrice(menus)).toBe(expectedPrice);
  });

  test("할인 전 총 주문 금액이 프로모션 적용 기준을 넘으면 샴페인을 증정한다", () => {
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "해물파스타", quantity: 1 },
      { name: "레드와인", quantity: 2 },
    ];
    expect(promotion.applyPromotionItems(menus)).toBe(
      CONSTANTS.APPLY_CHAMPAGNE
    );
  });

  test("할인 전 총 주문 금액이 프로모션 적용 기준을 넘지 않으면 아무것도 증정하지 않는다", () => {
    const menus = [
      { name: "해물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 2 },
    ];
    expect(promotion.applyPromotionItems(menus)).toBe(CONSTANTS.APPLY_NOTHING);
  });

  test("d-Day할인은 12/1~12/25사이 기간동안 1000원부터 100원씩 증가된다", () => {
    const date = 16;
    const expectedDiscount = 2500;
    expect(promotion.dDayDiscount(date)).toBe(expectedDiscount);
  });

  test("d-Day할인은 12/25이후 최대 할인 금액이 3400원이다", () => {
    const date = 27;
    const expectedDiscount = 3400;
    expect(promotion.dDayDiscount(date)).toBe(expectedDiscount);
  });

  test("평일 할인은 1만원 이상 주문시 일~금요일 기준 디저트 메뉴1개당 2023원 할인한다", () => {
    const date = 10;
    const menus = [
      { name: "해물파스타", quantity: 1 },
      { name: "초코케이크", quantity: 2 },
    ];
    const expectedDiscount = 4046;
    expect(promotion.weekdayDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("평일 할인은 1만원 이상 주문시 일~금요일 기준 디저트 메뉴가 없으면 할인이 없다", () => {
    const date = 10;
    const menus = [
      { name: "해물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 2 },
    ];
    const expectedDiscount = 0;
    expect(promotion.weekdayDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("평일 할인은 주말엔 할인하지 않는다", () => {
    const date = 29;
    const menus = [
      { name: "해물파스타", quantity: 1 },
      { name: "초코케이크", quantity: 2 },
    ];
    const expectedDiscount = 0;
    expect(promotion.weekdayDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("주말 할인은 1만원 이상 주문시 금~토요일 기준 메인 메뉴1개당 2023원 할인한다", () => {
    const date = 15;
    const menus = [
      { name: "티본스테이크", quantity: 1 },
      { name: "제로콜라", quantity: 1 },
    ];
    const expectedDiscount = 2023;
    expect(promotion.weekendDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("주말 할인은 1만원 이상 주문시 금~토요일 기준 메인 메뉴가 없으면 할인이 없다", () => {
    const date = 15;
    const menus = [
      { name: "초코케이크", quantity: 3 },
      { name: "제로콜라", quantity: 1 },
    ];
    const expectedDiscount = 0;
    expect(promotion.weekendDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("주말 할인은 평일엔 할인하지 않는다", () => {
    const date = 25;
    const menus = [
      { name: "티본스테이크", quantity: 1 },
      { name: "해산물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 1 },
    ];
    const expectedDiscount = 0;
    expect(promotion.weekendDiscount(date, menus)).toBe(expectedDiscount);
  });

  test("샴페인 증정 상황시 샴페인 가격을 반환한다", () => {
    const menus = [
      { name: "티본스테이크", quantity: 2 },
      { name: "해산물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 1 },
    ];
    expect(promotion.applyDiscount(menus)).toBe(25000);
  });

  test("샴페인 미증정 상황시 0원을 반환한다", () => {
    const menus = [
      { name: "해산물파스타", quantity: 1 },
      { name: "제로콜라", quantity: 1 },
    ];
    expect(promotion.applyDiscount(menus)).toBe(0);
  });

  test("달력에 별이 있는 날짜에는 특별할인 1000원이 추가된다", () => {
    const date = 25;
    expect(promotion.specailDiscount(date)).toBe(1000);
  });

  test("달력에 별이 없는 날짜에는 특별할인이 없다", () => {
    const date = 29;
    expect(promotion.specailDiscount(date)).toBe(0);
  });

  test("할인전 금액이 1만원 미만인 경우 할인혜택이 없다", () => {
    const date = 24;
    const menus = [{ name: "양송이수프", quantity: 1 }];
    expect(promotion.calculateTotalDiscount(date, menus)).toBe(0);
  });

  test("할인전 금액이 1만원 이상인 경우 할인혜택을 제공한다", () => {
    const date = 3;
    const menus = [
      { name: "티본스테이크", quantity: 1 },
      { name: "바비큐립", quantity: 1 },
      { name: "초코케이크", quantity: 1 },
      { name: "제로콜라", quantity: 1 },
    ];
    expect(promotion.calculateTotalDiscount(date, menus)).toBe(4223);
  });

  test("할인 적용이 없는 경우 원가를 반환한다", () => {
    const date = 5;
    const menus = [{ name: "양송이수프", quantity: 1 }];
    const expectedPrice = 6000;
    expect(promotion.afterDiscountPrice(date, menus)).toBe(expectedPrice);
  });

  test("평일날 할인 적용시 12만원 미만인 경우 샴페인을 미제공한다", () => {
    const date = 5;
    const menus = [
      { name: "티본스테이크", quantity: 1 },
      { name: "초코케이크", quantity: 2 },
    ];
    const expectedPrice = 79554;
    expect(promotion.afterDiscountPrice(date, menus)).toBe(expectedPrice);
  });

  test("평일날 할인 적용시 12만원 이상인 경우 샴페인을 제공한다", () => {
    const date = 5;
    const menus = [
      { name: "티본스테이크", quantity: 3 },
      { name: "초코케이크", quantity: 1 },
    ];
    const expectedPrice = 176577;
    expect(promotion.afterDiscountPrice(date, menus)).toBe(expectedPrice);
  });

  test("주말날 할인 적용시 12만원 미만인 경우 샴페인을 미제공한다", () => {
    const date = 15;
    const menus = [
      { name: "티본스테이크", quantity: 1 },
      { name: "초코케이크", quantity: 2 },
    ];
    const expectedPrice = 80577;
    expect(promotion.afterDiscountPrice(date, menus)).toBe(expectedPrice);
  });

  test("주말날 할인 적용시 12만원 이상인 경우 샴페인을 제공한다", () => {
    const date = 15;
    const menus = [
      { name: "티본스테이크", quantity: 3 },
      { name: "초코케이크", quantity: 1 },
    ];
    const expectedPrice = 171531;
    expect(promotion.afterDiscountPrice(date, menus)).toBe(expectedPrice);
  });
});
