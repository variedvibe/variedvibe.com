export enum ErrorType {
  UnknownProduct = "Unknown product",
  InvalidGid = "Invalid GID",
  RateLimit = "Rate limit",
}

export const errorSlugUnknownProduct = "ERR_UNKNOWN_PRODUCT";
export const errorSlugInvalidGid = "ERR_INVALID_GID";

export function getErrorType(error: Error): ErrorType | undefined {
  const message = getErrorMessage(error);

  switch (true) {
    case message?.startsWith("Too many requests"):
      return ErrorType.RateLimit;
    case message === errorSlugUnknownProduct:
      return ErrorType.UnknownProduct;

    case message === errorSlugInvalidGid:
      return ErrorType.InvalidGid;

    default:
      return undefined;
  }
}

export function isTemporary(error: Error): boolean {
  switch (getErrorType(error)) {
    case ErrorType.RateLimit:
      return true;

    default:
      return false;
  }
}

// getErrorMessage extracts the message from an error
function getErrorMessage(error: Error): string {
  let message;

  try {
    // Messages might be JSON
    //
    // See https://github.com/Shopify/js-buy-sdk/issues/795
    message = JSON.parse(error.message ?? null);
  } catch (_e) {
    message = error.message;
  }

  // If the message is an array (could be from JSON...)
  if (Array.isArray(message)) {
    // Join the messages together as one long string
    message = message.map((entry) => entry.message ?? entry).join(" ; ");
  }

  return message;
}
