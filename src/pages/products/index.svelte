<script>
  import { getAllProducts, getNullProduct } from "../../services/Shop/Shop.js";

  import ProductGroup from "../../components/Product/ProductGroup.svelte";
  import StatusMessage, {
    messageErrorGeneric,
  } from "../../components/StatusMessage/StatusMessage.svelte";

  let allProducts = getAllProducts();
  let nullProducts = new Array(3).fill(getNullProduct());
</script>

<div class="page-width-wrapper">
  {#await allProducts}
    <ProductGroup products={nullProducts} />
  {:then products}
    <ProductGroup {products} />
  {:catch}
    <StatusMessage message={messageErrorGeneric} />
  {/await}
</div>

<style>
</style>
