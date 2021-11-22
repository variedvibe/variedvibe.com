<script>
  import { url } from "@roxi/routify";

  export let cartEntry;
  export let product;

  let variant = product.variants.find(
    (variant) => variant.id === cartEntry.variantId
  );
  let productLinkHref = $url(`/products/${product.slug}`);
</script>

<div class="container">
  <a class="product-image-link" href={productLinkHref}>
    <img
      alt={product.images[0]?.altText ?? product.name}
      title={product.name}
      src={product.images[0]?.src}
      srcset={product.images[0]?.srcSet}
      width={product.images[0]?.width}
      height={product.images[0]?.height}
    />
  </a>
  <div class="details">
    <a class="product-text-link" href={productLinkHref}>{product.name}</a>
    <div class="secondary-details">
      <span class="variant-name">{variant.name}</span>
    </div>
  </div>
  <div class="price-actions">
    {variant.price.format("en-US") ?? "$--"}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .product-image-link {
    flex: 0;
  }
  .product-image-link img {
    display: block;
    width: 150px;
    height: 225px;
    object-fit: cover;
    background-color: var(--gray-mid);
  }
  .details {
    flex: 2;
    margin-left: 2em;
    text-align: left;
  }
  .secondary-details {
    display: block;
    color: var(--secondary-fg-color);
  }
  .product-text-link {
    display: inline-block;
    font-size: 1.5em;
  }
  .price-actions {
    flex: 1;
    font-size: 1.5em;
    text-align: right;
  }

  @media (max-width: 500px) {
    .container {
      flex-direction: column;
    }
    .details {
      margin: 1em auto;
      text-align: center;
    }
    .price-actions {
      text-align: center;
    }
  }
</style>
