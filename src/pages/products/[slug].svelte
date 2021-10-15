<script>
  import { getProductBySlug } from "../../services/Shop/Shop.js";

  import { pageMeta } from "../../components/PageMeta/stores.js";
  import ProductDetail from "../../components/Product/ProductDetail.svelte";

  export let slug;

  async function fetchProduct(slug) {
    let product = await getProductBySlug(slug);

    $pageMeta.title = product.name;
    $pageMeta.description = product.description;
    $pageMeta.image = product.images[0];

    return product;
  }

  export let product = fetchProduct(slug);
</script>

<div class="page-width-wrapper">
  <div class="product-container">
    {#await product}
      Loading...
    {:then Product}
      <ProductDetail product={Product} />
    {:catch}
      Something went wrong.
    {/await}
  </div>
</div>

<style>
  .product-container {
    margin: 40px auto;
  }
</style>
