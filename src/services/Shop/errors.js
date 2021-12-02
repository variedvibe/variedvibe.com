export const ErrorTypes = Object.freeze({
  UnknownProduct: "Unknown product",
  RateLimit: "Rate limit",

  Unknown: undefined,
});

export const errorSlugUnknownProduct = "ERR_UNKNOWN_PRODUCT";

export function getErrorType(error) {
  const message = getErrorMessage(error);

  switch (true) {
    case message?.startsWith("Too many requests"):
      return ErrorTypes.RateLimit;
    case message === errorSlugUnknownProduct:
      return ErrorTypes.UnknownProduct;

    default:
      return ErrorTypes.Unknown;
  }
}

export function isTemporary(error) {
  switch (getErrorType(error)) {
    case ErrorTypes.RateLimit:
      return true;

    default:
      return false;
  }
}

// getErrorMessage extracts the message from an error
function getErrorMessage(error) {
  let message;

  try {
    // Messages might be JSON
    //
    // See https://github.com/Shopify/js-buy-sdk/issues/795
    message = JSON.parse(error?.message ?? null);
  } catch (e) {
    message = error?.message;
  }

  // If the message is an array (could be from JSON...)
  if (Array.isArray(message)) {
    // Join the messages together as one long string
    message = message.map((entry) => entry?.message ?? entry).join(" ; ");
  }

  return message;
}
