import { MAIN_COURSE_ITEMS } from "../constants/constants.js";

class MainCourse {
  #items;

  constructor() {
    this.#items = MAIN_COURSE_ITEMS;
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

  isMenuAvailable(menuName) {
    return this.#items.some((item) => item.name === menuName);
  }
}

export default MainCourse;
