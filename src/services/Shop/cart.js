export class CartEntry {
  productId;
  productSlug;
  variantId;
  quantity;

  constructor(productId, productSlug, variantId, quantity) {
    this.productId = productId;
    this.productSlug = productSlug;
    this.variantId = variantId;
    this.quantity = quantity;
  }

  isSameProductVariant(other) {
    return (
      this.productId === other.productId && this.variantId === other.variantId
    );
  }

  addQuantity(quantity) {
    this.quantity += quantity;
  }
}
