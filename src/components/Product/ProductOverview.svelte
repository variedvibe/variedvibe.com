<script>
  import { url } from "@roxi/routify";

  export let product;
  export let href = null;

  let linkHref = $url(href ?? `/products/${product.slug}`);
</script>

<a class="product" href={linkHref}>
  <img alt={product.name} title={product.name} src={product.images[0].src} />
  {product.name}
</a>

<style>
  .product {
    display: block;
    font-size: 16px;
    margin: 40px 60px;
    text-align: center;
  }
  .product img {
    display: block;
    width: 200px;
    height: 300px;
    background-color: var(--gray-mid);
    margin-bottom: 10px;
    object-fit: cover;
  }
</style>
