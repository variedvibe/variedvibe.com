<script>
  import { goto, url, params, redirect } from "@roxi/routify";

  import { getProductById, getProductBySlug } from "/src/services/Shop/Shop.js";
  import { shopifyProductGid } from "/src/services/Shop/gid.js";
  import { ErrorTypes, getErrorType } from "/src/services/Shop/errors.js";

  import { pageMeta } from "/src/components/Meta/PageMeta/stores.js";
  import ProductDetail from "/src/components/Product/ProductDetail.svelte";
  import LoadingMessage from "/src/components/StatusMessage/LoadingMessage.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  export let id;

  let productFetcher;
  let productFetcherParam;

  // Use numeric IDs, but support "slug" IDs for backwards compatibility.
  //
  // (We used to link to product slugs directly, but those are more likely to
  // change than the numeric IDs, so its more apt to break links. Still, we
  // don't want to break old links, so we support both.)
  if (id.match(/^[0-9]+$/)) {
    productFetcher = getProductById;
    productFetcherParam = shopifyProductGid(id);
  } else {
    productFetcher = getProductBySlug;
    productFetcherParam = id;
  }

  async function fetchProduct() {
    let product;

    try {
      product = await productFetcher(productFetcherParam);
    } catch (e) {
      if (getErrorType(e) === ErrorTypes.UnknownProduct) {
        $goto("/404", null, true, false);
        return;
      }

      throw e;
    }

    const canonicalUrlPath = $url(`./${product.gid.id}/${product.slug}`);

    // If the URL id or slug doesn't match the product, redirect so that we are
    // always displaying the canonical product URL.
    if (id !== product.gid.id || $params.slug !== product.slug) {
      $redirect(canonicalUrlPath);
      return;
    }

    $pageMeta.title = product.name;
    $pageMeta.description = product.description;
    $pageMeta.url = canonicalUrlPath;
    $pageMeta.image = product.images[0]?.src;

    return product;
  }

  export let product = fetchProduct();
</script>

<!-- routify:options title="Product" -->

<div id="container" class="page-width-wrapper">
  {#await product}
    <LoadingMessage />
  {:then Product}
    {#if Product}
      <ProductDetail product={Product} />
    {/if}
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
  #container {
    margin: 0 auto;
  }
</style>
