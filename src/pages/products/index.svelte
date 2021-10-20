<script>
  import { getAllProducts, getNullProduct } from "../../services/Shop/Shop.js";

  import ProductOverview from "../../components/Product/ProductOverview.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "../../components/StatusMessage/StatusMessage.svelte";

  let allProducts = getAllProducts();
  let nullProduct = getNullProduct();
</script>

<div class="page-width-wrapper">
  <section id="products">
    {#await allProducts}
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
  #products {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    /* Use space-between as a fallback if space-evenly isn't available */
    justify-content: space-between;
    justify-content: space-evenly;
  }
</style>
