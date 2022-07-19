import type { Price } from "./price";
import { Gid } from "./gid";

export class Order {
  id: string;
  orderNumber: number;
  lineItems: OrderLineItem[];
  statusUrl: URL | null;
  customerUrl: URL | null;
  subtotalPrice: Price | null;
  totalRefunded: Price | null;
  totalShippingPrice: Price | null;
  totalTaxPrice: Price | null;
  totalPrice: Price | null;
  processedAt: Date | null;

  constructor(
    id: string,
    orderNumber: number,
    lineItems: OrderLineItem[],
    statusUrl: URL | null,
    customerUrl: URL | null,
    subtotalPrice: Price | null,
    totalRefunded: Price | null,
    totalShippingPrice: Price | null,
    totalTaxPrice: Price | null,
    totalPrice: Price | null,
    processedAt: Date | null,
  ) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.lineItems = lineItems;
    this.statusUrl = statusUrl;
    this.customerUrl = customerUrl;
    this.subtotalPrice = subtotalPrice;
    this.totalRefunded = totalRefunded;
    this.totalShippingPrice = totalShippingPrice;
    this.totalTaxPrice = totalTaxPrice;
    this.totalPrice = totalPrice;
    this.processedAt = processedAt;
  }

  get gid(): Gid {
    return Gid.parse(this.id);
  }
}

// NOTE: This may look like a CheckoutLineItem, but they actually can contain
// different values and refer to different things, so separating here to prevent
// collision/confusion.
export class OrderLineItem {
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
}
