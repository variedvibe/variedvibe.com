<script>
  import {
    getFeaturedProducts,
    getNullProduct,
  } from "/src/services/Shop/Shop.js";

  import Hero from "/src/components/Hero/Hero.svelte";
  import ProductGroup from "/src/components/Product/ProductGroup.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  let featuredProducts = getFeaturedProducts();
  let nullProducts = new Array(3).fill(getNullProduct());
</script>

<Hero />

<aside id="main-blurb">It's a VIBE. What's yours?</aside>

<div class="page-width-wrapper">
  {#await featuredProducts}
    <ProductGroup products={nullProducts} />
  {:then products}
    <ProductGroup {products} />
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
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
</style>
