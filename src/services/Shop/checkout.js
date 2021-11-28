import { Price } from "./price.js";

export class Checkout {
  #shopClient;

  #id;

  #lineItems;
  #webUrl;
  #subtotalPrice;
  #totalTaxPrice;
  #totalPrice;
  #createdAt;
  #updatedAt;
  #completedAt;

  constructor(shopClient, id, data) {
    this.#shopClient = shopClient;
    this.#id = id;

    data && this.#update(data);
  }

  get id() {
    return this.#id;
  }

  get lineItems() {
    return this.#lineItems;
  }

  get webUrl() {
    return this.#webUrl;
  }

  get subtotalPrice() {
    return this.#subtotalPrice;
  }

  get totalTaxPrice() {
    return this.#totalTaxPrice;
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  get completedAt() {
    return this.#completedAt;
  }

  async addLineItems(items) {
    let updatedCheckout = await this.#shopClient.checkout.addLineItems(
      this.id,
      items.map((item) => item.asRawWithoutId())
    );

    this.#update(updatedCheckout);

    return this;
  }

  async removeLineItems(itemIds) {
    let updatedCheckout = await this.#shopClient.checkout.removeLineItems(
      this.id,
      itemIds
    );

    this.#update(updatedCheckout);

    return this;
  }

  async replaceLineItems(items) {
    let updatedCheckout = await this.#shopClient.checkout.replaceLineItems(
      this.id,
      items.map((item) => item.asRawWithoutId())
    );

    this.#update(updatedCheckout);

    return this;
  }

  async updateLineItems(items) {
    let updatedCheckout = await this.#shopClient.checkout.updateLineItems(
      this.id,
      items.map((item) => item.asRaw())
    );

    this.#update(updatedCheckout);

    return this;
  }

  #update(shopifyCheckout) {
    this.#lineItems = shopifyCheckout.lineItems.map(
      (item) => new LineItem(item.id, item.variant.id, item.quantity)
    );
    this.#webUrl = shopifyCheckout.webUrl
      ? new URL(shopifyCheckout.webUrl)
      : null;
    this.#createdAt = shopifyCheckout.createdAt
      ? new Date(shopifyCheckout.createdAt)
      : null;
    this.#updatedAt = shopifyCheckout.updatedAt
      ? new Date(shopifyCheckout.updatedAt)
      : null;
    this.#completedAt = shopifyCheckout.completedAt
      ? new Date(shopifyCheckout.completedAt)
      : null;
    this.#subtotalPrice = shopifyCheckout.subtotalPriceV2
      ? new Price(
          shopifyCheckout.subtotalPriceV2.amount,
          shopifyCheckout.subtotalPriceV2.currencyCode
        )
      : null;
    this.#totalTaxPrice = shopifyCheckout.totalTaxV2
      ? new Price(
          shopifyCheckout.totalTaxV2.amount,
          shopifyCheckout.totalTaxV2.currencyCode
        )
      : null;
    this.#totalPrice = shopifyCheckout.totalPriceV2
      ? new Price(
          shopifyCheckout.totalPriceV2.amount,
          shopifyCheckout.totalPriceV2.currencyCode
        )
      : null;
  }
}

export class LineItem {
  id;
  variantId;
  quantity;

  constructor(id, variantId, quantity) {
    this.id = id;
    this.variantId = variantId;
    this.quantity = quantity;
  }

  asRaw() {
    return { ...this };
  }

  asRawWithoutId() {
    let raw = { ...this };

    delete raw.id;

    return raw;
  }
}
