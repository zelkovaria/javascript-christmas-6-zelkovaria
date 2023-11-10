class FormatPrice {
  static formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
    }).format(price);
  }
}

export default FormatPrice;
