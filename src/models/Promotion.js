import Appetizer from "../models/Appetizer.js";
import MainCourse from "../models/MainCourse.js";
import Dessert from "../models/Dessert.js";
import Beverage from "../models/Beverage.js";
import FormatPrice from "../utils/FormatPrice.js";
import { CONSTANTS } from "../constants/constants.js";

class Promotion {
  constructor() {
    this.appetizer = new Appetizer();
    this.maincourse = new MainCourse();
    this.dessert = new Dessert();
    this.beverage = new Beverage();
  }

  calculateTotalPrice(menus) {
    const totalPrice =
      this.appetizer.calculateAppetizerTotalPrice(menus) +
      this.maincourse.calculateMainCourseTotalPrice(menus) +
      this.dessert.calculateDessertTotalPrice(menus) +
      this.beverage.calculateBeverageTotalPrice(menus);

    return FormatPrice.formatPrice(totalPrice);
  }

  applyPromotionItems(menus) {
    const beforeDiscountPrice = FormatPrice.replaceFormatPrice(
      this.calculateTotalPrice(menus)
    );
    const validItems = CONSTANTS.APPLY_CHAMPAGNE;
    const notValidItems = CONSTANTS.APPLY_NOTHING;

    if (beforeDiscountPrice >= CONSTANTS.APPLY_EVENT_MONEY_LINE) {
      return validItems;
    }
    return notValidItems;
  }

  dDayDiscount(date) {
    if (
      date >= CONSTANTS.DDAY_DISCOUNT_START &&
      date <= CONSTANTS.DDAY_DSICOUNT_END
    ) {
      return (
        CONSTANTS.DDAY_DISCOUNT_START_MONEY +
        (date - 1) * CONSTANTS.DDAY_DISCOUNT_INCREASE_MONEY
      );
    }
    if (date > CONSTANTS.DDAY_DSICOUNT_END) {
      return CONSTANTS.DDAY_DISCOUNT_TOTAL_MONEY;
    }
  }

  weekdayDiscount(date, menus) {
    let weekdayDiscount = 0;
    const weekday = [
      3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 31,
    ];
    if (weekday.includes(parseInt(date, 10))) {
      const orderedDesserts = this.dessert.dessertProcessOrder(menus);
      const totalDessertQuantity = orderedDesserts.reduce(
        (total, dessert) => total + dessert.quantity,
        0
      );
      weekdayDiscount = totalDessertQuantity * CONSTANTS.DISCOUNT_MONEY;
    }
    return weekdayDiscount;
  }

  weekendDiscount(date, menus) {
    let weekendDiscount = 0;
    const weekend = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
    if (weekend.includes(parseInt(date, 10))) {
      const orderedMainCourse = this.maincourse.mainCourseProcessOrder(menus);
      const totalMainCourseQuantity = orderedMainCourse.reduce(
        (total, maincourse) => total + maincourse.quantity,
        0
      );
      weekendDiscount = totalMainCourseQuantity * CONSTANTS.DISCOUNT_MONEY;
    }
    return weekendDiscount;
  }

  applyDiscount(menus) {
    if (this.applyPromotionItems(menus) === CONSTANTS.APPLY_CHAMPAGNE) {
      return CONSTANTS.CHAMPAGNE_PRICE;
    }
    return 0;
  }

  specailDiscount(date) {
    let specailDayDiscount = 0;
    const specialDay = [3, 10, 17, 24, 25, 31];

    if (specialDay.includes(parseInt(date, 10))) {
      specailDayDiscount = CONSTANTS.SPECIALDAY_DISCOUNT;
    }

    return specailDayDiscount;
  }

  calculateTotalDiscount(date, menus) {
    const beforeDiscountPrice = FormatPrice.replaceFormatPrice(
      this.calculateTotalPrice(menus)
    );

    if (beforeDiscountPrice < CONSTANTS.DISCOUNT_EVENT_MONELY_LINE) {
      return 0;
    }

    let totalDiscount =
      this.dDayDiscount(date) +
      this.weekdayDiscount(date, menus) +
      this.weekendDiscount(date, menus) +
      this.specailDiscount(date);

    if (this.applyPromotionItems(menus) === CONSTANTS.CHAMPAGNE_PRICE) {
      totalDiscount += CONSTANTS.CHAMPAGNE_PRICE;
    }

    return totalDiscount;
  }

  afterDiscountPrice(date, menus) {
    const totalPrice = FormatPrice.replaceFormatPrice(
      this.calculateTotalPrice(menus)
    );
    let totalDiscount = this.calculateTotalDiscount(date, menus);

    if (this.applyPromotionItems(menus) === CONSTANTS.CHAMPAGNE_PRICE) {
      totalDiscount -= CONSTANTS.CHAMPAGNE_PRICE;
    }

    return totalPrice - totalDiscount;
  }

  getDiscountBadge(date, menus) {
    const totalDiscount = this.calculateTotalDiscount(date, menus);

    if (totalDiscount >= CONSTANTS.BADEGE_SANTA_MONEY) {
      return CONSTANTS.BADGE_SANTA;
    }
    if (totalDiscount >= CONSTANTS.BADGE_TREE_MONEY) {
      return CONSTANTS.BADGE_TREE;
    }
    if (totalDiscount >= CONSTANTS.BADGE_STAR_MONEY) {
      return CONSTANTS.BADGE_STAR;
    }
    return CONSTANTS.BADGE_NOTHING;
  }

  isOnlyBeverageOrder(menus) {
    const hasAppetizer = menus.some((menu) =>
      this.appetizer.isMenuAvailable(menu.name)
    );
    const hasMainCourse = menus.some((menu) =>
      this.maincourse.isMenuAvailable(menu.name)
    );
    const hasDessert = menus.some((menu) =>
      this.dessert.isMenuAvailable(menu.name)
    );
    const hasBeverage = menus.every((menu) =>
      this.beverage.isMenuAvailable(menu.name)
    );

    return hasBeverage && !hasAppetizer && !hasMainCourse && !hasDessert;
  }

  isMenuExist(menus) {
    return menus.every(
      (menu) =>
        this.appetizer.isMenuAvailable(menu.name) ||
        this.maincourse.isMenuAvailable(menu.name) ||
        this.dessert.isMenuAvailable(menu.name) ||
        this.beverage.isMenuAvailable(menu.name)
    );
  }
}

export default Promotion;
