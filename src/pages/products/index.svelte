<script>
  import {
    getFeaturedProducts,
    getNullProduct,
  } from "../../services/Shop/Shop.js";

  import ProductGroup from "../../components/Product/ProductGroup.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "../../components/StatusMessage/StatusMessage.svelte";

  let featuredProducts = getFeaturedProducts();
  let nullProducts = new Array(3).fill(getNullProduct());
</script>

<div id="container" class="page-width-wrapper">
  <h1>Products</h1>

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
