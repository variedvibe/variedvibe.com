<script>
  import {
    getFeaturedProducts,
    getNullProduct,
  } from "/src/services/Shop/Shop.ts";

  import ProductGroup from "/src/components/Product/ProductGroup.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  let featuredProducts = getFeaturedProducts();
  let nullProducts = new Array(3).fill(getNullProduct());
</script>

<div id="container" class="page-width-wrapper">
  <h2>Products</h2>

  {#await featuredProducts}
    <ProductGroup products={nullProducts} />
  {:then products}
    <ProductGroup {products} />
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
  #container {
    margin: 0 auto;
    text-align: center;
  }
</style>
