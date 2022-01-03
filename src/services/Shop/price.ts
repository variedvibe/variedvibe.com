export class Price {
  amount: number;
  currencyCode: string;

  constructor(amount: number, currencyCode: string) {
    this.amount = amount;
    this.currencyCode = currencyCode;
  }

  format(locale: string): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currencyCode,
    }).format(this.amount);
  }
}
