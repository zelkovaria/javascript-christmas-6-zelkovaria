class Beverage {
  #items;

  constructor() {
    this.#items = [
      { name: "제로콜라", price: 3_000 },
      { name: "레드와인", price: 60_000 },
      { name: "샴페인", price: 25_000 },
    ];
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
