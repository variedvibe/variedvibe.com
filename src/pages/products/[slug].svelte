<script>
  import { getProduct } from "../../services/Shop/Shop.js";

  import { pageMeta } from "../../components/PageMeta/stores.js";
  import ProductDetail from "../../components/Product/ProductDetail.svelte";

  export let slug;
  let id = Number.parseInt(slug, 10);

  async function fetchProduct(id) {
    let product = await getProduct(id);

    $pageMeta.title = product.name;
    $pageMeta.description = product.description;
    $pageMeta.image = product.images[0];

    return product;
  }

  export let product = fetchProduct(id);
</script>

<div class="page-width-wrapper">
  <div class="product-container">
    {#await product}
      Loading...
    {:then Product}
      <ProductDetail
        id={Product.id}
        name={Product.name}
        description={Product.description}
        images={Product.images}
      />
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
