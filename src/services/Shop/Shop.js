import Client from "shopify-buy";

import { Checkout } from "./checkout.js";
import {
  Product,
  ProductImage,
  ProductOption,
  ProductSelectedOption,
  ProductVariant,
} from "./product.js";
import { Price } from "./price.js";

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

/**
 * srcSetImageSizes is a map of image sizes to their intrinsic widths, intended
 * to be used with the `img.srcset` attribute. The image sizes should be
 * compatible with the Shopify Image API.
 *
 * See: https://shopify.dev/api/liquid/filters/url-filters#size-parameters
 */
const srcSetImageSizes = {
  "250x250": "250w",
  "500x500": "500w",
  "750x750": "750w",
  "1000x1000": "1000w",
  "2000x2000": "2000w",
  "4000x4000": "4000w",
};

export const errorSlugUnknownProduct = "ERR_UNKNOWN_PRODUCT";

export function getBaseUrl() {
  return `https://${shopifyDomain}/`;
}

export async function getCheckout(id) {
  let checkout = await shopifyClient.checkout.fetch(id);

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
  ids = [...new Set(ids)];

  let products = await shopifyClient.product.fetchMultiple(ids);

  return products?.map(shopifyProductToProduct) ?? [];
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
  return new Product("", "", "", "", "", [], [], []);
}

function shopifyProductToProduct(shopifyProduct) {
  let product = new Product(
    shopifyProduct.id,
    shopifyProduct.handle,
    shopifyProduct.title,
    shopifyProduct.description,
    shopifyProduct.descriptionHtml,
    shopifyProduct.images.map(shopifyProductImageToProductImage),
    shopifyProduct.options.map(shopifyProductOptionToProductOption),
    shopifyProduct.variants.map(shopifyProductVariantToProductVariant),
    shopifyProduct.availableForSale
  );

  return product;
}

function shopifyProductImageToProductImage(shopifyProductImage) {
  return new ProductImage(
    shopifyProductImage.id,
    shopifyProductImage.src,
    shopifyProductImage.width,
    shopifyProductImage.height,
    shopifyProductImage.altText,
    shopifyImageSrcToSrcSet(shopifyProductImage.src)
  );
}

function shopifyImageSrcToSrcSet(shopifyImageSrc) {
  let srcSetArgs = [];

  let srcURL = new URL(shopifyImageSrc);
  let [filePath, extension, ...rest] = srcURL.pathname.split(".");

  // If there were more `.` separators...
  if (rest.length > 0) {
    // Add the non-real extension back to the file path, and then grab the real
    // extension from the rest.
    filePath = `${filePath}.${extension}`;
    extension = rest.pop();

    filePath = filePath + rest.join(".");
  }

  for (const size in srcSetImageSizes) {
    let argURL = new URL(shopifyImageSrc);
    argURL.pathname = `${filePath}_${size}.${extension}`;

    let arg = `${argURL.toString()} ${srcSetImageSizes[size]}`;

    srcSetArgs.push(arg);
  }

  return srcSetArgs.join(", ");
}

function shopifyProductOptionToProductOption(shopifyProductOption) {
  return new ProductOption(
    shopifyProductOption.id,
    shopifyProductOption.name,
    shopifyProductOption.values.map((v) => v.value)
  );
}

function shopifyProductSelectedOptionToProductSelectedOption(
  shopifyProductSelectedOption
) {
  return new ProductSelectedOption(
    shopifyProductSelectedOption.name,
    shopifyProductSelectedOption.value
  );
}

function shopifyProductVariantToProductVariant(shopifyProductVariant) {
  return new ProductVariant(
    shopifyProductVariant.id,
    shopifyProductVariant.title,
    shopifyProductVariant.image
      ? shopifyProductImageToProductImage(shopifyProductVariant.image)
      : null,
    new Price(
      shopifyProductVariant.priceV2.amount,
      shopifyProductVariant.priceV2.currencyCode
    ),
    shopifyProductVariant.selectedOptions.map(
      shopifyProductSelectedOptionToProductSelectedOption
    ),
    shopifyProductVariant.available
  );
}
