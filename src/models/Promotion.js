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
}

export default Promotion;
