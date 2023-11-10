class Beverage {
  #items;

  constructor() {
    this.#items = [
      { name: "제로콜라", price: 3_000 },
      { name: "레드와인", price: 60_000 },
      { name: "샴페인", price: 25_000 },
    ];
  }
}
export default Beverage;
