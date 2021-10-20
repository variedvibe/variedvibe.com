<script>
  import {
    getProductBySlug,
    errorSlugUnknownProduct,
  } from "../../services/Shop/Shop.js";
  import { goto } from "@roxi/routify";

  import { pageMeta } from "../../components/PageMeta/stores.js";
  import ProductDetail from "../../components/Product/ProductDetail.svelte";

  export let slug;

  async function fetchProduct(slug) {
    let product;

    try {
      product = await getProductBySlug(slug);
    } catch (e) {
      if (e.message === errorSlugUnknownProduct) {
        $goto("/404", null, true, false);
        return;
      }

      throw e;
    }

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
      <p class="status-message">Loading...</p>
    {:then Product}
      <ProductDetail product={Product} />
    {:catch}
      <p class="status-message">
        😓 Sorry. Something went wrong. Please try again later.
      </p>
    {/await}
  </div>
</div>

<style>
  .product-container {
    margin: 0 auto;
  }
  .status-message {
    font-size: var(--important-font-size);
    text-align: center;
  }
</style>
