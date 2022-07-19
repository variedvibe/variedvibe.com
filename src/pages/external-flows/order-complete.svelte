<script>
  import { params, redirect } from "@roxi/routify";

  import { Gid } from "/src/services/Shop/gid.ts";
  import { checkoutId, cart } from "/src/services/Shop/stores.ts";
  import { getCheckout } from "/src/services/Shop/Shop.ts";

  (async () => {
    const checkoutToken = $params["checkout-token"];
    let checkoutGid;

    try {
      checkoutGid = Gid.parse($checkoutId);
    } catch (e) {
      // Do nothing... leave undefined and we'll handle later
    }

    // Handle a lack of required data and unexpected values.
    if (!checkoutToken || !checkoutGid || checkoutGid.id !== checkoutToken) {
      $redirect("/");

      // Stop executing any further
      return;
    }

    // If we got here, than the order is complete for the stored checkout.
    const checkoutFetch = getCheckout($checkoutId);

    checkoutId.clear();
    cart.clear();

    let checkout;

    try {
      checkout = await checkoutFetch;
    } catch (e) {
      // Do nothing... Leave undefined
    }

    const redirectUrl = checkout?.order?.statusUrl?.toString();

    if (redirectUrl) {
      // We must use the `window.location` API, rather than our router, to
      // redirect outside of our origin.
      window.location.replace(redirectUrl);
    } else {
      $redirect("/");
    }
  })();
</script>
