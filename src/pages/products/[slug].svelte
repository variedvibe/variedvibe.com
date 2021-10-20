<script>
  import {
    getProductBySlug,
    errorSlugUnknownProduct,
  } from "../../services/Shop/Shop.js";
  import { goto } from "@roxi/routify";

  import { pageMeta } from "../../components/PageMeta/stores.js";
  import ProductDetail from "../../components/Product/ProductDetail.svelte";
  import StatusMessage, {
    messageLoading,
    messageErrorGeneric,
  } from "../../components/StatusMessage/StatusMessage.svelte";

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
      <StatusMessage message={messageLoading} />
    {:then Product}
      <ProductDetail product={Product} />
    {:catch}
      <StatusMessage message={messageErrorGeneric} />
    {/await}
  </div>
</div>

<style>
  .product-container {
    margin: 0 auto;
  }
</style>
