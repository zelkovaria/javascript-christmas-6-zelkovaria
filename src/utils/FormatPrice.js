import { CONSTANTS } from "../constants/constants.js";

class FormatPrice {
  static formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
    }).format(price);
  }

  static replaceFormatPrice(price) {
    return parseInt(price.replace(/,/g, ""), CONSTANTS.DECIMAL_RADIX);
  }
}

export default FormatPrice;
