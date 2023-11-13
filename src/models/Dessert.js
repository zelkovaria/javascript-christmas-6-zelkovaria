import { DESSERT_ITEMS } from "../constants/constants.js";

class Dessert {
  #items;

  constructor() {
    this.#items = DESSERT_ITEMS;
  }

  dessertProcessOrder(menus) {
    let orderedDessertCourseMenus = [];
    menus.forEach((menu) => {
      if (this.#items.some((item) => item.name === menu.name)) {
        orderedDessertCourseMenus.push({
          name: menu.name,
          quantity: menu.quantity,
        });
      }
    });
    return orderedDessertCourseMenus;
  }

  calculateDessertTotalPrice(menus) {
    let dessertTotalPrice = 0;
    menus.forEach((menu) => {
      const item = this.#items.find((item) => item.name === menu.name);
      if (item) {
        dessertTotalPrice += item.price * menu.quantity;
      }
    });
    return dessertTotalPrice;
  }

  isMenuAvailable(menuName) {
    return this.#items.some((item) => item.name === menuName);
  }
}
export default Dessert;
