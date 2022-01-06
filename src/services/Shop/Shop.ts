import Client from "shopify-buy";

import { errorSlugUnknownProduct } from "./errors";
import { Checkout } from "./checkout";
import { Product } from "./product";
import { shopifyProductToProduct } from "./mappings";

const shopifyDomain = (import.meta.env.VITE_SHOPIFY_DOMAIN ??
  import.meta.env.SHOPIFY_DOMAIN) as string;

const featuredProductCollectionHandle =
  (import.meta.env.VITE_SHOPIFY_FEATURED_COLLECTION_HANDLE ??
    import.meta.env.SHOPIFY_FEATURED_COLLECTION_HANDLE) as string;

// TODO: Update when the client is typed.
const shopifyClient: any = Client.buildClient({
  domain: shopifyDomain,
  storefrontAccessToken: (import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN ??
    import.meta.env.SHOPIFY_STOREFRONT_API_TOKEN) as string,
});

export function getBaseUrl(): URL {
  return new URL(`https://${shopifyDomain}/`);
}

export async function getCheckout(id: Stringlike): Promise<Checkout | null> {
  const checkout = await shopifyClient.checkout.fetch(asString(id));

  return checkout ? new Checkout(shopifyClient, checkout.id, checkout) : null;
}

export async function createCheckout(): Promise<Checkout> {
  const checkout = await shopifyClient.checkout.create();

  return new Checkout(shopifyClient, checkout.id, checkout);
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await shopifyClient.product.fetchAll();

  return products?.map(shopifyProductToProduct) ?? [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const collection = await shopifyClient.collection.fetchByHandle(
    featuredProductCollectionHandle,
  );

  return collection?.products.map(shopifyProductToProduct) ?? [];
}

export async function getProductsById(ids: Stringlike[]): Promise<Product[]> {
  // Remove duplicate ids
  ids = [...new Set(ids.map(asString))];

  const products = await shopifyClient.product.fetchMultiple(ids);

  return products?.map(shopifyProductToProduct) ?? [];
}

export async function getProductById(id: Stringlike): Promise<Product> {
  const shopifyProduct = await shopifyClient.product.fetch(asString(id));

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export async function getProductBySlug(slug: Stringlike): Promise<Product> {
  const shopifyProduct = await shopifyClient.product.fetchByHandle(
    asString(slug),
  );

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export function getNullProduct(): Product {
  return new Product("", "", "", "", "");
}

interface Stringable {
  toString(): string;
}
type Stringlike = string | Stringable;

function asString(stringlike: Stringlike): string {
  if (stringlike.toString) {
    return stringlike.toString();
  }

  return stringlike as string;
}
