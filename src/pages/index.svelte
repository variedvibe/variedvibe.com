<script>
  import {
    getFeaturedProducts,
    getNullProduct,
  } from "../services/Shop/Shop.js";

  import Hero from "../components/Hero/Hero.svelte";
  import ProductOverview from "../components/Product/ProductOverview.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "../components/StatusMessage/StatusMessage.svelte";

  let featuredProducts = getFeaturedProducts();
  let nullProduct = getNullProduct();
</script>

<Hero />

<aside id="main-blurb">It's a VIBE. What's yours?</aside>

<div class="page-width-wrapper">
  <section id="products">
    {#await featuredProducts}
      <ProductOverview product={nullProduct} />
      <ProductOverview product={nullProduct} />
      <ProductOverview product={nullProduct} />
    {:then products}
      {#each products as product}
        <ProductOverview {product} />
      {/each}
    {:catch}
      <StatusMessage message={messageErrorGeneric} />
    {/await}
  </section>
</div>

<style>
  #main-blurb {
    display: block;
    width: 100%;
    margin: 30px auto;
    text-align: center;
    font-family: var(--main-font-title);
    font-size: 1.5em;
    font-style: italic;
  }
  #products {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    /* Use space-between as a fallback if space-evenly isn't available */
    justify-content: space-between;
    justify-content: space-evenly;
  }
</style>
