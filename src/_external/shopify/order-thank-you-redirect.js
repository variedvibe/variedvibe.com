/**
 * Order "Thank You" redirect
 *
 * This script is intended to be included on the thank you page of Shopify's
 * checkout process.
 *
 * The easiest way to include this is to go to the Shopify admin page, then
 * "Settings", then "Checkout", then "Additional Scripts", and then pasting this
 * code snippet into a `<script>` tag.
 *
 * NOTE:
 *  - This script WILL NOT WORK if the VV_APP_BASE_URL isn't defined.
 *  - The VV_APP_BASE_URL should be the base URL of the application/web-app that
 *  is intended to be redirected to, such as `https://variedvibe.com/`.
 */
function orderThankYouRedirect() {
  const APP_BASE_URL = window.VV_APP_BASE_URL ?? window.VV_BASE_URL;

  // Only execute if we have a useful base URL and the global Shopify
  if (APP_BASE_URL && window.Shopify) {
    const shopifyCheckout = window.Shopify?.Checkout;
    const checkoutToken = shopifyCheckout?.token;

    const isOnThankYouStep =
      (shopifyCheckout?.step ?? shopifyCheckout?.page) === "thank_you";

    if (isOnThankYouStep) {
      const redirectTo = new URL(
        "/external-flows/order-complete",
        APP_BASE_URL
      );
      redirectTo.searchParams.set("checkout-token", checkoutToken);

      // Redirect to our own custom "Thank You" page
      window.location = redirectTo.toString();
    }
  }
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", orderThankYouRedirect);
} else {
  // `DOMContentLoaded` has already fired
  orderThankYouRedirect();
}
