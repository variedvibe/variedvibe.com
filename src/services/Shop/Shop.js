import Client from "shopify-buy";

import { errorSlugUnknownProduct } from "./errors.js";
import { Checkout } from "./checkout.js";
import { Product } from "./product.js";
import { shopifyProductToProduct } from "./mappings.js";

const shopifyDomain =
  import.meta.env.VITE_SHOPIFY_DOMAIN ?? import.meta.env.SHOPIFY_DOMAIN;

const featuredProductCollectionHandle =
  import.meta.env.VITE_SHOPIFY_FEATURED_COLLECTION_HANDLE ??
  import.meta.env.SHOPIFY_FEATURED_COLLECTION_HANDLE;

const shopifyClient = Client.buildClient({
  domain: shopifyDomain,
  storefrontAccessToken:
    import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN ??
    import.meta.env.SHOPIFY_STOREFRONT_API_TOKEN,
});

export function getBaseUrl() {
  return `https://${shopifyDomain}/`;
}

export async function getCheckout(id) {
  let checkout = await shopifyClient.checkout.fetch(asString(id));

  return checkout ? new Checkout(shopifyClient, checkout.id, checkout) : null;
}

export async function createCheckout() {
  let checkout = await shopifyClient.checkout.create();

  return new Checkout(shopifyClient, checkout.id, checkout);
}

export async function getAllProducts() {
  let products = await shopifyClient.product.fetchAll();

  return products?.map(shopifyProductToProduct) ?? [];
}

export async function getFeaturedProducts() {
  let collection = await shopifyClient.collection.fetchByHandle(
    featuredProductCollectionHandle
  );

  return collection?.products.map(shopifyProductToProduct) ?? [];
}

export async function getProductsById(ids) {
  // Remove duplicate ids
  ids = [...new Set(ids.map(asString))];

  let products = await shopifyClient.product.fetchMultiple(ids);

  return products?.map(shopifyProductToProduct) ?? [];
}

export async function getProductById(id) {
  let shopifyProduct = await shopifyClient.product.fetch(asString(id));

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export async function getProductBySlug(slug) {
  let shopifyProduct = await shopifyClient.product.fetchByHandle(
    asString(slug)
  );

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export function getNullProduct() {
  return new Product("", "", "", "", "", [], [], []);
}

function asString(stringable) {
  if (stringable.toString) {
    return stringable.toString();
  }

  return stringable;
}
