import { BEVERAGE_ITEMS } from "../constants/constants";

class Beverage {
  #items;

  constructor() {
    this.#items = BEVERAGE_ITEMS;
  }

  beverageProcessOrder(menus) {
    let orderedBeverageMenus = [];
    menus.forEach((menu) => {
      if (this.#items.some((item) => item.name === menu.name)) {
        orderedBeverageMenus.push({
          name: menu.name,
          quantity: menu.quantity,
        });
      }
    });
    return orderedBeverageMenus;
  }

  calculateBeverageTotalPrice(menus) {
    let beverageTotalPrice = 0;
    menus.forEach((menu) => {
      const item = this.#items.find((item) => item.name === menu.name);
      if (item) {
        beverageTotalPrice += item.price * menu.quantity;
      }
    });
    return beverageTotalPrice;
  }

  isMenuAvailable(menuName) {
    return this.#items.some((item) => item.name === menuName);
  }
}
export default Beverage;
