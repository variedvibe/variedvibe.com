<script>
  import { url } from "@roxi/routify";
  import { createEventDispatcher } from "svelte";
  import { onMount, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();

  export let product;
  export let variant;

  let productImage = product.getImageForSummary();

  function close() {
    dispatch("close");
  }

  function bodyClickHandler(event) {
    const clickedOutside = document
      .querySelector(".overlay-backdrop")
      .contains(event.target);

    clickedOutside && close();
  }

  function keyPressHandler(event) {
    switch (event.key) {
      case "Escape":
        close();
        break;
    }
  }

  onMount(() => {
    document.body.classList.add("modal-open");
  });
  onDestroy(() => {
    document.body.classList.remove("modal-open");
  });
</script>

<svelte:window on:keydown={keyPressHandler} />
<svelte:body on:click={bodyClickHandler} />

<div class="overlay-backdrop" />
<div class="container">
  <h3>Item Added To Cart!</h3>

  <div class="product hr-border-top hr-border-bottom">
    {#if productImage}
      <img
        class="product-image"
        alt={productImage.altText ?? product.name}
        title={product.name}
        src={productImage.src}
        srcset={productImage.srcSet}
        sizes="180px"
        width={productImage.width}
        height={productImage.height}
      />
    {/if}

    <div class="details">
      <span class="product-name">{product.name}</span>
      <div class="secondary-details">
        <span class="variant-name">{variant.name}</span>
      </div>
    </div>
  </div>

  <div class="actions">
    <button on:click={close}>Keep Shopping</button>
    <a class="link-button" href={$url("/cart")} title="Go To Cart">Go To Cart</a
    >
  </div>
</div>

<style>
  .overlay-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .container {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: fit-content;
    height: fit-content;
    max-width: 100vw;
    max-height: 100vh;
    max-height: 100dvh;
    margin: auto;
    padding: var(--page-horizontal-padding);
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--black);
    border-radius: var(--normal-border-radius);
    filter: var(--normal-drop-shadow);
  }
  h3 {
    margin: 0 auto;
    text-align: center;
  }
  .product {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 1em;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1em auto;
    padding: 1em 0;
  }
  .product-image,
  .details {
    flex: 1;
  }
  .product-image {
    display: block;
    width: 180px;
    height: 180px;
    object-fit: cover;
    background-color: var(--gray-mid);
  }
  .details {
    margin: 0 auto;
  }
  .product-name {
    font-size: 1.5em;
  }
  .actions {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    align-items: center;
  }
  .actions button,
  .actions .link-button {
    margin: 0 5px;
  }
  .actions button:first-child,
  .actions .link-button:first-child {
    margin-left: 0;
  }
  .actions button:last-child,
  .actions .link-button:last-child {
    margin-right: 0;
  }

  @media (max-width: 500px) {
    .product {
      grid-auto-flow: row;
      grid-auto-columns: unset;
      text-align: center;
    }
  }
</style>
