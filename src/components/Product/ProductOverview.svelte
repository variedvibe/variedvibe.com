<script>
  import { url } from "@roxi/routify";

  export let id;
  export let name;
  export let href = null;
  export let images = [];

  let linkHref = $url(href ?? (id && `/products/${id}`));
</script>

<a class="product" href={linkHref}>
  <img alt={name} title={name} src={images[0]} />
  {name}
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
  }
</style>
