<script>
  import { url } from "@roxi/routify";

  export let product;
  export let href = null;

  let linkHref = $url(href ?? `/products/${product.slug}`);
</script>

<a class="product" href={linkHref}>
  <img
    alt={product.images[0]?.altText ?? product.name}
    title={product.name}
    src={product.images[0]?.src}
  />
  {#if product.images[1]}
    <img
      class="alt-image"
      alt={product.images[1].altText ?? product.name}
      title={product.name}
      src={product.images[1].src}
    />
  {/if}
  {product.name}
</a>

<style>
  .product {
    display: block;
    position: relative;
    font-size: 16px;
    margin: 40px 60px;
    text-align: center;
  }
  .product img {
    display: block;
    width: 250px;
    height: 375px;
    object-fit: cover;
    background-color: var(--gray-mid);
    margin-bottom: 10px;
  }
  .product img.alt-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity var(--animation-speed-fast)
      var(--animation-timing-function-natural);
  }
  .product:hover img.alt-image {
    opacity: 1;
  }
</style>
