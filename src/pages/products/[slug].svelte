<script>
  import {
    getProductBySlug,
    errorSlugUnknownProduct,
  } from "/src/services/Shop/Shop.js";
  import { goto } from "@roxi/routify";

  import { pageMeta } from "/src/components/PageMeta/stores.js";
  import ProductDetail from "/src/components/Product/ProductDetail.svelte";
  import StatusMessage, {
    messageLoading,
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

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
    $pageMeta.image = product.images[0]?.src;

    return product;
  }

  export let product = fetchProduct(slug);
</script>

<div id="container" class="page-width-wrapper">
  {#await product}
    <StatusMessage message={messageLoading} />
  {:then Product}
    <ProductDetail product={Product} />
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
  #container {
    margin: 0 auto;
  }
</style>
