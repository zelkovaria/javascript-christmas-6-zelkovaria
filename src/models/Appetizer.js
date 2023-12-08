import { APPETIZER_ITEMS } from "../constants/constants.js";

class Appetizer {
  #items;

  constructor() {
    this.#items = APPETIZER_ITEMS;
  }

  appetizerProcessOrder(menus) {
    let orderedAppetizerMenus = [];
    menus.forEach((menu) => {
      if (this.#items.some((item) => item.name === menu.name)) {
        orderedAppetizerMenus.push({
          name: menu.name,
          quantity: menu.quantity,
        });
      }
    });
    return orderedAppetizerMenus;
  }

  calculateAppetizerTotalPrice(menus) {
    let appetizerTotalPrice = 0;
    menus.forEach((menu) => {
      const item = this.#items.find((item) => item.name === menu.name);
      if (item) {
        appetizerTotalPrice += item.price * menu.quantity;
      }
    });
    return appetizerTotalPrice;
  }

  isMenuAvailable(menuName) {
    return this.#items.some((item) => item.name === menuName);
  }
}

export default Appetizer;
