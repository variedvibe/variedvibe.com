import Client from "shopify-buy";

import { Product, ProductImage } from "./product.js";

const featuredProductCollectionHandle = import.meta.env
  .VITE_SHOPIFY_FEATURED_COLLECTION_HANDLE;

const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
});

export const errorSlugUnknownProduct = "ERR_UNKNOWN_PRODUCT";

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

export async function getProductById(id) {
  let shopifyProduct = await shopifyClient.product.fetch(id);

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export async function getProductBySlug(slug) {
  let shopifyProduct = await shopifyClient.product.fetchByHandle(slug);

  if (!shopifyProduct) {
    throw new Error(errorSlugUnknownProduct);
  }

  return shopifyProductToProduct(shopifyProduct);
}

export function getNullProduct() {
  return new Product("", "", "", "", "", []);
}

function shopifyProductToProduct(shopifyProduct) {
  let product = new Product(
    shopifyProduct.id,
    shopifyProduct.handle,
    shopifyProduct.title,
    shopifyProduct.description,
    shopifyProduct.descriptionHtml,
    shopifyProduct.images.map(shopifyProductImageToProductImage)
  );

  return product;
}

function shopifyProductImageToProductImage(shopifyProductImage) {
  return new ProductImage(
    shopifyProductImage.id,
    shopifyProductImage.src,
    shopifyProductImage.altText
  );
}
