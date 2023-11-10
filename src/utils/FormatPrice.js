class FormatPrice {
  static formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
    }).format(price);
  }

  static replaceFormatPrice(price) {
    return parseInt(price.replace(/,/g, ""), 10);
  }
}

export default FormatPrice;
