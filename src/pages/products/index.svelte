<script>
  import { getAllProducts } from "../../services/Shop/Shop.js";

  import ProductOverview from "../../components/Product/ProductOverview.svelte";

  export let allProducts = getAllProducts();
</script>

<div class="page-width-wrapper">
  {#await allProducts then products}
    <section id="products">
      {#each products as { id, name, images }}
        <ProductOverview {id} {name} {images} />
      {/each}
    </section>
  {/await}
</div>

<style>
  #products {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
