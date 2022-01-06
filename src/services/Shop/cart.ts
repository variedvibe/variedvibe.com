export class CartEntry {
  readonly productId: string;
  readonly productSlug: string;
  readonly variantId: string;
  quantity: number;

  constructor(
    productId: string,
    productSlug: string,
    variantId: string,
    quantity: number,
  ) {
    this.productId = productId;
    this.productSlug = productSlug;
    this.variantId = variantId;
    this.quantity = quantity;
  }

  isSameProductVariant(other: this): boolean {
    return (
      this.productId === other.productId && this.variantId === other.variantId
    );
  }

  addQuantity(quantity: number): void {
    this.quantity += quantity;
  }
}
