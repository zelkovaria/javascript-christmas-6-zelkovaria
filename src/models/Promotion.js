import Appetizer from "../models/Appetizer.js";
import MainCourse from "../models/MainCourse.js";
import Dessert from "../models/Dessert.js";
import Beverage from "../models/Beverage.js";
import FormatPrice from "../utils/FormatPrice.js";

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
    const validItems = "샴페인 1개";
    const notValidItems = "없음";

    if (beforeDiscountPrice >= 120000) {
      return validItems;
    }
    return notValidItems;
  }

  dDayDiscount(date) {
    if (date >= 1 && date <= 25) {
      return 1000 + (date - 1) * 100;
    }
    if (date > 25) {
      return 3400;
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
      weekdayDiscount = totalDessertQuantity * 2023;
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
      weekendDiscount = totalMainCourseQuantity * 2023;
    }
    return weekendDiscount;
  }

  applyDiscount(menus) {
    if (this.applyPromotionItems(menus) === "샴페인 1개") {
      return 25000;
    }
    return 0;
  }

  specailDiscount(date) {
    let specailDayDiscount = 0;
    const specialDay = [3, 10, 17, 24, 25, 31];

    if (specialDay.includes(parseInt(date, 10))) {
      specailDayDiscount = 1000;
    }

    return specailDayDiscount;
  }

  calculateTotalDiscount(date, menus) {
    const beforeDiscountPrice = FormatPrice.replaceFormatPrice(
      this.calculateTotalPrice(menus)
    );

    if (beforeDiscountPrice < 10000) {
      return 0;
    }

    let totalDiscount =
      this.dDayDiscount(date) +
      this.weekdayDiscount(date, menus) +
      this.weekendDiscount(date, menus) +
      this.specailDiscount(date);

    if (this.applyPromotionItems(menus) === "샴페인 1개") {
      totalDiscount += 25000;
    }

    return totalDiscount;
  }

  afterDiscountPrice(date, menus) {
    const totalPrice = FormatPrice.replaceFormatPrice(
      this.calculateTotalPrice(menus)
    );
    let totalDiscount = this.calculateTotalDiscount(date, menus);

    if (this.applyPromotionItems(menus) === "샴페인 1개") {
      totalDiscount -= 25000;
    }

    return totalPrice - totalDiscount;
  }

  getDiscountBadge(date, menus) {
    const totalDiscount = this.calculateTotalDiscount(date, menus);

    if (totalDiscount >= 20000) {
      return "산타";
    }
    if (totalDiscount >= 10000) {
      return "트리";
    }
    if (totalDiscount >= 5000) {
      return "별";
    }
    return "없음";
  }
}

export default Promotion;
