import { errorSlugInvalidGid } from "./errors";

const gidProtocol = "gid:";

const shopifyGidNamespace = "shopify";
enum ShopifyGidType {
  Product = "Product",
  ProductImage = "ProductImage",
  ProductOption = "ProductOption",
  ProductVariant = "ProductVariant",
  Checkout = "Checkout",
  CheckoutLineItem = "CheckoutLineItem",
}
type ShopifyGidTypeString = keyof typeof ShopifyGidType;

export class Gid {
  namespace: string;
  type: ShopifyGidTypeString;
  id: string;
  params?: URLSearchParams;

  constructor(
    namespace: string,
    type: ShopifyGidTypeString,
    id: string,
    params?: URLSearchParams,
  ) {
    this.namespace = namespace;
    this.type = type;
    this.id = id;
    this.params = params;
  }

  // Parse a GID string
  //
  // Gid strings look like the following:
  //  gid://namespace/type/hexstringhere?param=value
  static parse(str: string): Gid {
    let gidUrl: URL;

    try {
      gidUrl = new URL(str);
    } catch (_e) {
      throw new Error(errorSlugInvalidGid);
    }

    // Get the parts of the GID by splitting at each path separator, while
    // removing empty parts.
    const gidParts = gidUrl.pathname.split("/").filter(Boolean);

    // The namespace should technically be the "host" of the URL. However, not
    // all browsers/clients will parse the URL the same way, so we'll fallback
    // to the first part of the pathname.
    const gidNamespace = gidUrl.host || gidParts.shift();

    if (
      gidUrl.protocol !== gidProtocol ||
      !gidNamespace ||
      gidParts.length < 2
    ) {
      throw new Error(errorSlugInvalidGid);
    }

    return new this(
      gidNamespace,
      gidParts[0]! as ShopifyGidTypeString,
      gidParts[1]!,
      gidUrl.searchParams,
    );
  }

  toString(): string {
    const gidUrl = new URL(
      `${gidProtocol}//${this.namespace}/${this.type}/${this.id}`,
    );

    if (this.params) {
      gidUrl.search = this.params.toString();
    }

    return gidUrl.toString();
  }
}

export function shopifyProductGid(id: string, params?: URLSearchParams): Gid {
  return new Gid(shopifyGidNamespace, ShopifyGidType.Product, id, params);
}
