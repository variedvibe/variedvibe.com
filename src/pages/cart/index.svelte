<script>
  import debounce from "lodash.debounce";
  import { slide } from "svelte/transition";
  import { url } from "@roxi/routify";

  import {
    getCheckout,
    createCheckout,
    getProductsById,
  } from "/src/services/Shop/Shop.js";
  import { checkoutId, cart, cartQuantity } from "/src/services/Shop/stores.js";
  import { LineItem } from "/src/services/Shop/checkout.js";

  import CartItem from "/src/components/Cart/CartItem.svelte";
  import StatusMessage, {
    messageLoading,
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  const debounceTimeout = 1000;

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
    (cartEntry) => new LineItem(null, cartEntry.variantId, cartEntry.quantity)
  );

  let syncCheckoutWithCart = async (cartLineItems) => {
    if (checkout) {
      checkout = await checkout.replaceLineItems(cartLineItems);
    }

    checkoutLoading = false;
  };
  let syncCheckoutWithCartDebounced = debounce(
    syncCheckoutWithCart,
    debounceTimeout
  );

  let loadProducts = async (productIds) => {
    if (productIds.length > 0) {
      products = await getProductsById(productIds);
    }
  };
  let loadProductsDebounced = debounce(loadProducts, debounceTimeout);

  $: syncCheckoutWithCartDebounced(cartLineItems), (checkoutLoading = true);
  $: loadProductsDebounced(productIds);

  let loadAll = async () => {
    [checkout, $checkoutId] = await fetchCheckout($checkoutId);

    await Promise.all([
      syncCheckoutWithCart(cartLineItems),
      loadProducts(productIds),
    ]);
  };
</script>

<div id="container" class="page-width-wrapper">
  {#await loadAll()}
    <StatusMessage message={messageLoading} />
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
              <div class="cart-item-container">
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
            <dd>{checkout.subtotalPrice.format("en-US") ?? "$--"}</dd>

            <dt>Shipping</dt>
            <dd class="price-note">Calculated in next steps</dd>

            <dt>Taxes (estimated)</dt>
            <dd>{checkout.totalTaxPrice.format("en-US") ?? "$--"}</dd>
          </dl>
          <dl class="total">
            <dt>Total</dt>
            <dd>{checkout.totalPrice.format("en-US") ?? "$--"}</dd>
          </dl>
        </div>
        <div class="cart-actions">
          <button id="cart-checkout" title="Coming Soon..." disabled
            >Check Out</button
          >
          <!--
        <a
          id="cart-checkout"
          class="link-button"
          href={checkout.webUrl}
          title="Coming Soon...">Check Out</a
        >
        -->
        </div>
        {#if checkoutLoading}
          <div class="cart-summary-actions-loading">Loading...</div>
        {/if}
      </div>
    {:else}
      <h2>Your cart is empty.</h2>
      <p>Maybe check out some products.</p>
      <a class="link-button" href={$url("/products")}>Continue Shopping</a>
    {/if}
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
  #container {
    --border-width: 2px;

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
  .cart-item-list,
  .cart-summary {
    display: block;
    padding: 0;
  }
  .cart-item-list {
    list-style-type: none;
    margin-top: 4em;
  }
  .cart-item-list li {
    display: block;
  }
  .cart-summary-actions-container {
    position: relative;
  }
  .cart-summary,
  .cart-item-list li .cart-item-container {
    margin: 2.5em auto;
    padding-top: 2.5em;
    border-top-style: solid;
    border-top-width: var(--border-width);
    border-top-color: var(--gray-mid-darker);
  }
  .cart-summary,
  .cart-item-list li .cart-item-container,
  .cart-summary dl.total {
    border-top-style: solid;
    border-top-width: var(--border-width);
    border-top-color: var(--gray-mid-darker);
  }
  .cart-item-list li:first-child .cart-item-container {
    margin-top: 0;
  }
  .cart-item-list li:last-child .cart-item-container {
    margin-bottom: 0;
  }
  .cart-summary dl {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 50%;
    margin: 0;
    margin-left: auto;
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
  .cart-actions {
    margin-top: 2.5em;
    margin-left: auto;
    width: 50%;
    text-align: right;
  }
  .cart-actions button,
  .cart-actions .link-button {
    min-width: calc(50% - 8px);
    margin: 0 5px;
  }
  .cart-actions button:first-child,
  .cart-actions .link-button:first-child {
    margin-left: 0;
  }
  .cart-actions button:last-child,
  .cart-actions .link-button:last-child {
    margin-right: 0;
  }
  .cart-summary-actions-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    position: absolute;
    top: var(--border-width);
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  p {
    font-size: var(--important-font-size);
  }
  .link-button {
    margin: 20px auto;
  }

  @media (max-width: 500px) {
    .cart-summary dl {
      width: auto;
      margin: 0;
    }
    .cart-actions {
      width: auto;
      text-align: center;
    }
    .cart-actions button,
    .cart-actions .link-button {
      min-width: 50%;
      margin: 0;
    }
  }
</style>
