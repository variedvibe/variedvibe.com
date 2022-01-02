<script>
  import debounce from "lodash.debounce";
  import retry from "async-retry";
  import { slide } from "svelte/transition";
  import { url } from "@roxi/routify";

  import {
    getCheckout,
    createCheckout,
    getProductsById,
  } from "/src/services/Shop/Shop.js";
  import { isTemporary } from "/src/services/Shop/errors.js";
  import { checkoutId, cart, cartQuantity } from "/src/services/Shop/stores.js";
  import { CheckoutLineItem } from "/src/services/Shop/checkout.js";

  import CartItem from "/src/components/Cart/CartItem.svelte";
  import LoadingMessage from "/src/components/StatusMessage/LoadingMessage.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  const debounceTimeout = 1000; // milliseconds
  const retryOptions = {
    retries: 3,
    factor: 2,
    minTimeout: debounceTimeout,
    randomize: true,
  };

  async function fetchCheckout(checkoutId) {
    let checkout = checkoutId
      ? await getCheckout(checkoutId)
      : await createCheckout();

    return [checkout, checkout.id];
  }

  let checkout;
  let checkoutLoading = true;
  let products = [];

  $: productIds = $cart.map((cartEntry) => cartEntry.productId);
  $: productIdMap = new Map(products.map((product) => [product.id, product]));
  $: cartLineItems = $cart.map(
    (cartEntry) =>
      new CheckoutLineItem(null, cartEntry.variantId, cartEntry.quantity)
  );
  $: allEntriesAvailable = $cart.every(
    (cartEntry) =>
      productIdMap
        .get(cartEntry.productId)
        ?.getVariantForId(cartEntry.variantId).isAvailable
  );
  $: isValidCart = $cartQuantity > 0 && allEntriesAvailable;

  let syncCheckoutWithCart = async (cartLineItems) => {
    if (checkout) {
      await retry(async (bail) => {
        try {
          checkout = await checkout.replaceLineItems(cartLineItems);
        } catch (e) {
          if (!isTemporary(e)) {
            bail(e);
            return;
          }
        }
      }, retryOptions);

      checkoutLoading = false;
    }
  };
  let syncCheckoutWithCartDebounced = debounce(
    syncCheckoutWithCart,
    debounceTimeout
  );

  let loadProducts = async (productIds) => {
    if (productIds.length > 0) {
      await retry(async (bail) => {
        try {
          products = await getProductsById(productIds);
        } catch (e) {
          if (!isTemporary(e)) {
            bail(e);
            return;
          }
        }
      }, retryOptions);
    }
  };
  let loadProductsDebounced = debounce(loadProducts, debounceTimeout);

  $: (checkoutLoading = true), syncCheckoutWithCartDebounced(cartLineItems);
  $: loadProductsDebounced(productIds);

  let loadAll = async () => {
    [checkout, $checkoutId] = await fetchCheckout($checkoutId);

    // If the checkout has already been completed
    if (checkout.isCompleted()) {
      // Create a new checkout
      checkout = await createCheckout();
      $checkoutId = checkout.id;

      // Clear the existing cart
      //
      // NOTE: Do this after creating the new checkout, so that we don't cause a
      // reactive setting of cart items for the previous/completed checkout.
      cart.clear();
    }

    await Promise.all([
      syncCheckoutWithCart(cartLineItems),
      loadProducts(productIds),
    ]);
  };
</script>

<!-- routify:options title="Cart" -->
<!-- routify:options index=false -->

<svelte:head>
  <!-- Tell search engines not to index this page -->
  <meta name="robots" content="noindex" />
</svelte:head>

<div id="container" class="page-width-wrapper">
  {#await loadAll()}
    <LoadingMessage />
  {:then}
    {#if $cartQuantity > 0}
      <h2>
        You have <span class="heading-quantity">{$cartQuantity}</span> items<wbr
        /> in your cart.
      </h2>
      <ul class="cart-item-list">
        {#each $cart as entry (entry.productId + entry.variantId)}
          <li out:slide|local>
            {#if productIdMap.has(entry.productId)}
              <div
                class="cart-item-container"
                class:unavailable={!productIdMap
                  .get(entry.productId)
                  ?.getVariantForId(entry.variantId).isAvailable}
              >
                <CartItem
                  bind:cartEntry={entry}
                  product={productIdMap.get(entry.productId)}
                />
              </div>
            {/if}
          </li>
        {/each}
      </ul>
      <div class="cart-summary-actions-container">
        <div class="cart-summary">
          <dl>
            <dt>Subtotal</dt>
            {#if isValidCart}
              <dd>{checkout.subtotalPrice.format("en-US") ?? "$--"}</dd>
            {:else}
              <dd class="price-note error">Invalid cart</dd>
            {/if}

            <dt>Shipping</dt>
            <dd class="price-note">Calculated in next steps</dd>

            <dt>Taxes (estimated)</dt>
            <dd class="price-note">Calculated in next steps</dd>
            <!-- <dd>{checkout.totalTaxPrice.format("en-US") ?? "$--"}</dd> -->
          </dl>
          <dl class="total">
            <dt>Total</dt>
            {#if isValidCart}
              <dd>{checkout.totalPrice.format("en-US") ?? "$--"}</dd>
            {:else}
              <dd class="price-note error">Invalid cart</dd>
            {/if}
          </dl>
        </div>
        {#if !allEntriesAvailable}
          <p class="cart-notes error">
            Some items in your cart are unavailable.
          </p>
        {/if}
        <div class="cart-actions">
          <a
            id="cart-checkout"
            class="link-button primary"
            class:disabled={!isValidCart}
            aria-disabled={!isValidCart || null}
            href={isValidCart ? checkout.webUrl : null}
            title="Proceed to Check Out">Check Out</a
          >
        </div>
        {#if checkoutLoading}
          <div class="cart-summary-actions-loading overlay-backdrop">
            <LoadingMessage />
          </div>
        {/if}
      </div>
    {:else}
      <h2>Your cart is empty.</h2>
      <p class="important">Maybe check out some products.</p>
      <a class="link-button" href={$url("/products")}>Continue Shopping</a>
    {/if}
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
  #container {
    --item-vertical-spacing: 2em;

    margin: 0 auto;
    text-align: center;
  }
  h2 {
    font-size: 1.8em;
  }
  .heading-quantity {
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-color: var(--gray-mid);
    text-underline-offset: 0.1em;
  }
  .cart-item-list {
    display: block;
    list-style-type: none;
    margin-top: 4em;
    margin-bottom: 0;
    padding: 0;
  }
  .cart-item-list li {
    display: block;
  }
  .cart-item-list li .cart-item-container {
    padding: var(--item-vertical-spacing) 0;
  }
  .cart-item-list li .cart-item-container,
  .cart-summary-actions-container,
  .cart-summary dl.total {
    border-top-style: var(--hr-border-style);
    border-top-width: var(--hr-border-width);
    border-top-color: var(--hr-border-color);
  }
  .cart-summary-actions-container {
    position: relative;
    padding: 0;
    padding-top: var(--item-vertical-spacing);
  }
  .cart-summary,
  .cart-notes,
  .cart-actions,
  .cart-summary-actions-loading {
    width: 50%;
    margin-left: auto;
  }
  .cart-summary dl {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 0;
    font-size: 1.2em;
    line-height: 1.4;
  }
  .cart-summary dl.total {
    margin-top: 0.5em;
    padding-top: 0.5em;
    font-size: 1.5em;
    font-weight: bold;
  }
  .cart-summary dd.price-note {
    font-size: var(--small-font-size);
    color: var(--secondary-fg-color);
  }
  .cart-summary dd.price-note.error {
    color: var(--error-fg-color);
  }
  .cart-notes {
    margin-top: var(--item-vertical-spacing);
    margin-bottom: 0;
  }
  .cart-notes.error {
    color: var(--error-fg-color);
  }
  .cart-actions {
    margin-top: var(--item-vertical-spacing);
    text-align: right;
  }
  .cart-actions .link-button {
    min-width: calc(50% - 8px);
    margin: 0 5px;
  }
  .cart-actions .link-button:first-child {
    margin-left: 0;
  }
  .cart-actions .link-button:last-child {
    margin-right: 0;
  }
  .cart-summary-actions-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: var(--hr-border-width);
    bottom: 0;
    right: 0;
  }
  p.important {
    font-size: var(--important-font-size);
  }
  .link-button {
    margin: 20px auto;
  }

  @media (max-width: 500px) {
    .cart-item-list {
      margin-top: 3em;
    }
    .cart-summary,
    .cart-notes,
    .cart-actions {
      width: auto;
      text-align: center;
    }
    .cart-actions .link-button {
      min-width: 50%;
      margin: 0;
    }
    .cart-summary-actions-loading {
      width: 100%;
    }
  }
</style>
