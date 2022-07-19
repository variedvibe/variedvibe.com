import type { Order } from "./order";
import type { Price } from "./price";
import { Gid } from "./gid";
import { shopifyOrderToOrder, shopifyPriceToPrice } from "./mappings";

export class Checkout {
  private shopClient: any; // TODO: Update when the client is typed.

  private _id: string;

  private _lineItems: CheckoutLineItem[] = [];
  private _order!: Order | null;
  private _webUrl!: URL | null;
  private _subtotalPrice!: Price | null;
  private _totalTaxPrice!: Price | null;
  private _totalPrice!: Price | null;
  private _createdAt!: Date | null;
  private _updatedAt!: Date | null;
  private _completedAt!: Date | null;

  constructor(shopClient: any, id: string, data: any) {
    this.shopClient = shopClient;
    this._id = id;

    data && this.update(data);
  }

  get id(): string {
    return this._id;
  }

  get gid(): Gid {
    return Gid.parse(this._id);
  }

  get lineItems(): CheckoutLineItem[] {
    return this._lineItems;
  }

  get order(): Order | null {
    return this._order;
  }

  get webUrl(): URL | null {
    return this._webUrl;
  }

  get subtotalPrice(): Price | null {
    return this._subtotalPrice;
  }

  get totalTaxPrice(): Price | null {
    return this._totalTaxPrice;
  }

  get totalPrice(): Price | null {
    return this._totalPrice;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  get completedAt(): Date | null {
    return this._completedAt;
  }

  isCompleted(): boolean {
    return this._completedAt != null;
  }

  async addLineItems(items: CheckoutLineItem[]): Promise<this> {
    const updatedCheckout = await this.shopClient.checkout.addLineItems(
      this.id,
      items.map((item) => item.asRawWithoutId()),
    );

    this.update(updatedCheckout);

    return this;
  }

  async removeLineItems(itemIds: string[]): Promise<this> {
    const updatedCheckout = await this.shopClient.checkout.removeLineItems(
      this.id,
      itemIds,
    );

    this.update(updatedCheckout);

    return this;
  }

  async replaceLineItems(items: CheckoutLineItem[]): Promise<this> {
    const updatedCheckout = await this.shopClient.checkout.replaceLineItems(
      this.id,
      items.map((item) => item.asRawWithoutId()),
    );

    this.update(updatedCheckout);

    return this;
  }

  async updateLineItems(items: CheckoutLineItem[]): Promise<this> {
    const updatedCheckout = await this.shopClient.checkout.updateLineItems(
      this.id,
      items.map((item) => item.asRaw()),
    );

    this.update(updatedCheckout);

    return this;
  }

  // TODO: Type the shopifyCheckout when the library adds types.
  private update(shopifyCheckout: any): void {
    this._lineItems = shopifyCheckout.lineItems.map(
      (item: any) =>
        new CheckoutLineItem(item.id, item.variant.id, item.quantity),
    );
    this._order = shopifyCheckout.order
      ? shopifyOrderToOrder(
        shopifyCheckout.order,
        shopifyCheckout.orderStatusUrl,
      )
      : null;
    this._webUrl = shopifyCheckout.webUrl
      ? new URL(shopifyCheckout.webUrl)
      : null;
    this._createdAt = shopifyCheckout.createdAt
      ? new Date(shopifyCheckout.createdAt)
      : null;
    this._updatedAt = shopifyCheckout.updatedAt
      ? new Date(shopifyCheckout.updatedAt)
      : null;
    this._completedAt = shopifyCheckout.completedAt
      ? new Date(shopifyCheckout.completedAt)
      : null;
    this._subtotalPrice = shopifyCheckout.subtotalPriceV2
      ? shopifyPriceToPrice(shopifyCheckout.subtotalPriceV2)
      : null;
    this._totalTaxPrice = shopifyCheckout.totalTaxV2
      ? shopifyPriceToPrice(shopifyCheckout.totalTaxV2)
      : null;
    this._totalPrice = shopifyCheckout.totalPriceV2
      ? shopifyPriceToPrice(shopifyCheckout.totalPriceV2)
      : null;
  }
}

export class CheckoutLineItem {
  id: string;
  variantId: string;
  quantity: number;

  constructor(id: string, variantId: string, quantity: number) {
    this.id = id;
    this.variantId = variantId;
    this.quantity = quantity;
  }

  get gid(): Gid {
    return Gid.parse(this.id);
  }

  asRaw(): object {
    return { ...this };
  }

  asRawWithoutId(): object {
    const raw = { ...this } as Partial<this>;

    delete raw.id;

    return raw;
  }
}
