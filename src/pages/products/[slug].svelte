<script>
  import ProductDetail from "../../components/Product/ProductDetail.svelte";

  import { getProduct } from "../../services/Shop/Shop.js";

  export let slug;
  let id = Number.parseInt(slug, 10);
  export let product = getProduct(id);
</script>

<div class="page-width-wrapper">
  <div class="product-container">
    {#await product then Product}
      {#if Product}
        <ProductDetail
          id={Product.id}
          name={Product.name}
          description={Product.description}
          images={Product.images}
        />
      {/if}
    {/await}
  </div>
</div>

<style>
  .product-container {
    margin: 40px auto;
  }
</style>
