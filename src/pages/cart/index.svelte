<script>
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

  async function fetchCheckout() {
    let checkout = $checkoutId
      ? await getCheckout($checkoutId)
      : await createCheckout();

    $checkoutId = checkout.id;

    return checkout;
  }

  let checkout;

  let productIds = $cart.map((cartEntry) => cartEntry.productId);
  let products = [];

  $: productIdMap = new Map(products.map((product) => [product.id, product]));

  async function loadAll() {
    let cartLineItems = $cart.map(
      (cartEntry) => new LineItem(null, cartEntry.variantId, cartEntry.quantity)
    );

    checkout = await fetchCheckout();
    checkout.replaceLineItems(cartLineItems);

    products = await getProductsById(productIds);
  }
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
        {#each $cart as entry}
          <li>
            <CartItem
              cartEntry={entry}
              product={productIdMap.get(entry.productId)}
            />
          </li>
        {/each}
      </ul>
      <div class="cart-summary">
        <dl>
          <dt>Subtotal</dt>
          <dd>{checkout.subtotalPrice.format("en-US") ?? "$--"}</dd>

          <dt>Shipping</dt>
          <dd>$--</dd>

          <dt>Tax</dt>
          <dd>{checkout.totalTaxPrice.format("en-US") ?? "$--"}</dd>
        </dl>
        <dl class="total">
          <dt>Total</dt>
          <dd>{checkout.totalPrice.format("en-US") ?? "$--"}</dd>
        </dl>
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
  .cart-summary,
  .cart-item-list li {
    margin: 2.5em auto;
    padding-top: 2.5em;
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: var(--gray-mid-darker);
  }
  .cart-summary,
  .cart-item-list li,
  .cart-summary dl.total {
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: var(--gray-mid-darker);
  }
  .cart-item-list li:first-child {
    margin-top: 0;
  }
  .cart-item-list li:last-child {
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
  }
</style>
