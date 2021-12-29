import { errorSlugInvalidGid } from "./errors.js";

const gidProtocol = "gid:";

const shopifyGidNamespace = "shopify";
const shopifyGidTypes = Object.freeze({
  Product: "Product",
  ProductImage: "ProductImage",
  ProductOption: "ProductOption",
  ProductVariant: "ProductVariant",
  Checkout: "Checkout",
  CheckoutLineItem: "CheckoutLineItem",

  Unknown: undefined,
});

export class Gid {
  namespace;
  type;
  id;
  params;

  constructor(namespace, type, id, params) {
    this.namespace = namespace;
    this.type = type;
    this.id = id;
    this.params = params;
  }

  // Parse a GID string
  //
  // Gid strings look like the following:
  //  gid://namespace/type/hexstringhere?param=value
  static parse(str) {
    let gidUrl;

    try {
      gidUrl = new URL(str);
    } catch (e) {
      throw new Error(errorSlugInvalidGid);
    }

    // Get the parts of the GID by splitting at each path separator, while
    // removing empty parts.
    let gidParts = gidUrl.pathname.split("/").filter(Boolean);

    // The namespace should technically be the "host" of the URL. However, not
    // all browsers/clients will parse the URL the same way, so we'll fallback
    // to the first part of the pathname.
    let gidNamespace = gidUrl.host || gidParts.shift();

    if (
      gidUrl.protocol !== gidProtocol ||
      !gidNamespace ||
      gidParts.length < 2
    ) {
      throw new Error(errorSlugInvalidGid);
    }

    return new this(
      gidNamespace,
      gidParts[0],
      gidParts[1],
      gidUrl.searchParams
    );
  }

  toString() {
    let gidUrl = new URL(
      `${gidProtocol}//${this.namespace}/${this.type}/${this.id}`
    );

    if (this.params) {
      gidUrl.search = this.params;
    }

    return gidUrl.toString();
  }
}

export function shopifyProductGid(id, params) {
  return new Gid(shopifyGidNamespace, shopifyGidTypes.Product, id, params);
}
