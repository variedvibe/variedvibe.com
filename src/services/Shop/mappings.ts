import {
  Product,
  ProductImage,
  ProductOption,
  ProductSelectedOption,
  ProductVariant,
} from "./product";
import { Price } from "./price";
import { Order, OrderLineItem } from "./order";

/**
 * srcSetImageSizes is a map of image sizes to their intrinsic widths, intended
 * to be used with the `img.srcset` attribute. The image sizes should be
 * compatible with the Shopify Image API.
 *
 * See: https://shopify.dev/api/liquid/filters/url-filters#size-parameters
 */
const srcSetImageSizes: Record<string, string> = {
  "250x250": "250w",
  "500x500": "500w",
  "750x750": "750w",
  "1000x1000": "1000w",
  "2000x2000": "2000w",
  "4000x4000": "4000w",
};

// TODO: Type parameters when the client library adds types.
export function shopifyProductToProduct(shopifyProduct: any): Product {
  const product = new Product(
    shopifyProduct.id,
    shopifyProduct.handle,
    shopifyProduct.title,
    shopifyProduct.description,
    shopifyProduct.descriptionHtml,
    shopifyProduct.images.map(shopifyProductImageToProductImage),
    shopifyProduct.options.map(shopifyProductOptionToProductOption),
    shopifyProduct.variants.map(shopifyProductVariantToProductVariant),
    shopifyProduct.availableForSale,
  );

  return product;
}

// TODO: Type parameters when the client library adds types.
export function shopifyProductImageToProductImage(
  shopifyProductImage: any,
): ProductImage {
  return new ProductImage(
    shopifyProductImage.id,
    shopifyProductImage.src,
    shopifyProductImage.width,
    shopifyProductImage.height,
    shopifyProductImage.altText,
    shopifyImageSrcToSrcSet(shopifyProductImage.src),
  );
}

// TODO: Type parameters when the client library adds types.
export function shopifyImageSrcToSrcSet(shopifyImageSrc: any): string {
  const srcSetArgs = [];

  const srcURL = new URL(shopifyImageSrc);
  let [filePath, extension, ...rest] = srcURL.pathname.split(".");

  // If there were more `.` separators...
  if (rest.length > 0) {
    // Add the non-real extension back to the file path, and then grab the real
    // extension from the rest.
    filePath = `${filePath}.${extension}`;
    if (rest.length > 0) {
      extension = rest.pop()!;
    }

    filePath = filePath + rest.join(".");
  }

  for (const size in srcSetImageSizes) {
    const argURL = new URL(shopifyImageSrc);
    argURL.pathname = `${filePath}_${size}.${extension}`;

    const arg = `${argURL.toString()} ${srcSetImageSizes[size]}`;

    srcSetArgs.push(arg);
  }

  return srcSetArgs.join(", ");
}

// TODO: Type parameters when the client library adds types.
export function shopifyProductOptionToProductOption(
  shopifyProductOption: any,
): ProductOption {
  return new ProductOption(
    shopifyProductOption.id,
    shopifyProductOption.name,
    shopifyProductOption.values.map((v: { value: string }) => v.value),
  );
}

// TODO: Type parameters when the client library adds types.
export function shopifyProductSelectedOptionToProductSelectedOption(
  shopifyProductSelectedOption: any,
): ProductSelectedOption {
  return new ProductSelectedOption(
    shopifyProductSelectedOption.name,
    shopifyProductSelectedOption.value,
  );
}

// TODO: Type parameters when the client library adds types.
export function shopifyProductVariantToProductVariant(
  shopifyProductVariant: any,
): ProductVariant {
  return new ProductVariant(
    shopifyProductVariant.id,
    shopifyProductVariant.title,
    shopifyProductVariant.image
      ? shopifyProductImageToProductImage(shopifyProductVariant.image)
      : null,
    shopifyPriceToPrice(shopifyProductVariant.priceV2),
    shopifyProductVariant.selectedOptions.map(
      shopifyProductSelectedOptionToProductSelectedOption,
    ),
    shopifyProductVariant.available,
  );
}

// TODO: Type parameters when the client library adds types.
export function shopifyPriceToPrice(shopifyPrice: any): Price {
  return new Price(shopifyPrice.amount, shopifyPrice.currencyCode);
}

// TODO: Type parameters when the client library adds types.
export function shopifyOrderToOrder(
  shopifyOrder: any,
  shopifyOrderStatusUrl: string,
): Order {
  shopifyOrderStatusUrl = shopifyOrderStatusUrl ?? shopifyOrder.statusUrl;

  return new Order(
    shopifyOrder.id,
    shopifyOrder.orderNumber,
    shopifyOrder.lineItems.map(shopifyOrderLineItemToOrderLineItem),
    shopifyOrderStatusUrl ? new URL(shopifyOrderStatusUrl) : null,
    shopifyOrder.customerUrl ? new URL(shopifyOrder.customerUrl) : null,
    shopifyOrder.subtotalPriceV2
      ? shopifyPriceToPrice(shopifyOrder.subtotalPriceV2)
      : null,
    shopifyOrder.totalRefundedV2
      ? shopifyPriceToPrice(shopifyOrder.totalRefundedV2)
      : null,
    shopifyOrder.totalShippingPriceV2
      ? shopifyPriceToPrice(shopifyOrder.totalShippingPriceV2)
      : null,
    shopifyOrder.totalTaxV2
      ? shopifyPriceToPrice(shopifyOrder.totalTaxV2)
      : null,
    shopifyOrder.totalPriceV2
      ? shopifyPriceToPrice(shopifyOrder.totalPriceV2)
      : null,
    shopifyOrder.processedAt ? new Date(shopifyOrder.processedAt) : null,
  );
}

// TODO: Type parameters when the client library adds types.
export function shopifyOrderLineItemToOrderLineItem(
  shopifyLineItem: any,
): OrderLineItem {
  return new OrderLineItem(
    shopifyLineItem.variableValues.id,
    shopifyLineItem.variant.id,
    shopifyLineItem.quantity,
  );
}
