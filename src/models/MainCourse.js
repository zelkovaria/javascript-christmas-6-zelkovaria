class MainCourse {
  #items;

  constructor() {
    this.#items = [
      { name: "티본스테이크", price: 55_000 },
      { name: "바비큐립", price: 54_000 },
      { name: "해산물파스타", price: 35_000 },
      { name: "크리스마스파스타", price: 25_000 },
    ];
  }

  mainCourseProcessOrder(menus) {
    let orderedMainCourseMenus = [];
    menus.forEach((menu) => {
      if (this.#items.some((item) => item.name === menu.name)) {
        orderedMainCourseMenus.push({
          name: menu.name,
          quantity: menu.quantity,
        });
      }
    });
    return orderedMainCourseMenus;
  }

  calculateMainCourseTotalPrice(menus) {
    let mainCourseTotalPrice = 0;
    menus.forEach((menu) => {
      const item = this.#items.find((item) => item.name === menu.name);
      if (item) {
        mainCourseTotalPrice += item.price * menu.quantity;
      }
    });
    return mainCourseTotalPrice;
  }
}

export default MainCourse;
