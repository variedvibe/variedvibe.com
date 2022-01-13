<script>
  import { url } from "@roxi/routify";

  import { cart } from "/src/services/Shop/stores.ts";

  export let cartEntry;
  export let product;

  let productImage = product.getImageForSummary();
  let variant = product.getVariantForId(cartEntry.variantId);
  let productLinkHref = $url(`/products/${product.gid.id}/${product.slug}`);

  function ensureValidQuantityInput(event) {
    const parsed = parseInt(event.target.value, 10);

    if (!Number.isInteger(parsed) || parsed < 1) {
      event.target.value = 1;
    }
  }

  function remove() {
    cart.remove(cartEntry);
  }
</script>

<div class="container">
  {#if productImage}
    <a class="product-image-link" href={productLinkHref}>
      <img
        alt={productImage.altText ?? product.name}
        title={product.name}
        src={productImage.src}
        srcset={productImage.srcSet}
        sizes="180px"
        width={productImage.width}
        height={productImage.height}
      />
    </a>
  {/if}
  <div class="details">
    <a class="product-text-link" href={productLinkHref}>{product.name}</a>
    <div class="secondary-details">
      <span class="variant-name">{variant.name}</span>
    </div>
  </div>
  <div class="price-actions">
    <div class="price-actions-main">
      {#if variant.isAvailable}
        <span class="price">{variant.price.format("en-US") ?? "$--"}</span>
        <span class="price-multiplier">
          x
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            autocomplete="off"
            min="1"
            max="100"
            on:input={ensureValidQuantityInput}
            bind:value={cartEntry.quantity}
            required
          />
        </span>
      {:else}
        <span class="variant-error">Unavailable</span>
      {/if}
    </div>
    <div class="price-actions-footer">
      <button on:click={remove}>Remove</button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: stretch;
    line-height: 1;
  }
  .product-image-link {
    flex: 0;
  }
  .product-image-link img {
    display: block;
    width: 180px;
    height: 180px;
    object-fit: cover;
    background-color: var(--gray-mid);
  }
  .details {
    flex: 2;
    margin-left: 2em;
    text-align: left;
  }
  .secondary-details {
    display: block;
    line-height: 2;
    color: var(--secondary-fg-color);
  }
  .product-text-link {
    display: inline-block;
    font-size: 1.5em;
    font-weight: bold;
  }
  .price-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
    text-align: right;
  }
  .price-actions-footer {
    margin-top: 2em;
  }
  .price,
  .variant-error {
    display: block;
    font-size: 1.5em;
    font-weight: bold;
  }
  .price-multiplier {
    display: block;
    margin: 10px 0;
    margin-bottom: 0;
    margin-left: auto;
  }
  input[type="number"] {
    width: 3.2em;
    margin-left: 0.25em;
    padding: 0.2em;
  }
  .variant-error {
    color: var(--error-fg-color);
  }
  .price-actions-footer button {
    min-width: 5em;
    font-size: 0.8em;
  }

  @media (max-width: 500px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
    .details {
      margin: 1em auto;
      text-align: center;
    }
    .price-actions {
      align-items: center;
      text-align: center;
    }
    .price,
    .price-multiplier {
      display: inline-block;
      vertical-align: middle;
    }
    .price-multiplier {
      margin-top: 0;
      margin-left: 10px;
    }
    input[type="number"] {
      margin-left: 0.1em;
    }
    .price-actions-footer {
      margin-top: 1.5em;
    }
  }
</style>
