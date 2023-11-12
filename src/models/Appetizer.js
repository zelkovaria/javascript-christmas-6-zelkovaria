class Appetizer {
  #items;

  constructor() {
    this.#items = [
      { name: "양송이수프", price: 6_000 },
      { name: "타파스", price: 5_500 },
      { name: "시저샐러드", price: 8_000 },
    ];
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
