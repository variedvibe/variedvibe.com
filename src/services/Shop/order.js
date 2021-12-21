import { Price } from "./price.js";

export class Order {
  id;
  orderNumber;
  lineItems;
  statusUrl;
  customerUrl;
  subtotalPrice;
  totalRefunded;
  totalShippingPrice;
  totalTaxPrice;
  totalPrice;
  processedAt;

  constructor(
    id,
    orderNumber,
    lineItems,
    statusUrl,
    customerUrl,
    subtotalPrice,
    totalRefunded,
    totalShippingPrice,
    totalTaxPrice,
    totalPrice,
    processedAt
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
}

// NOTE: This may look like a CheckoutLineItem, but they actually can contain
// different values and refer to different things, so separating here to prevent
// collision/confusion.
export class OrderLineItem {
  id;
  variantId;
  quantity;

  constructor(id, variantId, quantity) {
    this.id = id;
    this.variantId = variantId;
    this.quantity = quantity;
  }
}
