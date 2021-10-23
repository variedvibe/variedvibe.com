<script>
  import ProductOverview from "./ProductOverview.svelte";

  export let products;
</script>

<section id="products">
  {#each products as product}
    <div class="product-container">
      <ProductOverview {product} />
    </div>
  {/each}
</section>

<style>
  #products {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    /* Use space-between as a fallback if space-evenly isn't available */
    justify-content: space-between;
    justify-content: space-evenly;
  }
  .product-container {
    margin: 60px 30px;
    margin-top: 0;
  }
</style>
