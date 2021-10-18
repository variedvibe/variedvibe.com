<script>
  import { getAllProducts, getNullProduct } from "../../services/Shop/Shop.js";

  import ProductOverview from "../../components/Product/ProductOverview.svelte";

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
      <p class="status-message">
        😓 Sorry. Something went wrong. Please try again later.
      </p>
    {/await}
  </section>
</div>

<style>
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
