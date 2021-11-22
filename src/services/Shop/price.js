export class Price {
  amount;
  currencyCode;

  constructor(amount, currencyCode) {
    this.amount = amount;
    this.currencyCode = currencyCode;
  }

  format(locale) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currencyCode,
    }).format(this.amount);
  }
}
