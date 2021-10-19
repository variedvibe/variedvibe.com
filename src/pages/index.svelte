<script>
  import {
    getFeaturedProducts,
    getNullProduct,
  } from "../services/Shop/Shop.js";

  import Hero from "../components/Hero/Hero.svelte";
  import ProductOverview from "../components/Product/ProductOverview.svelte";

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
      <p class="status-message">
        😓 Sorry. Something went wrong. Please try again later.
      </p>
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
    justify-content: center;
  }
  .status-message {
    flex: 0 0 100%;
    font-size: 1.2em;
    text-align: center;
  }
</style>
