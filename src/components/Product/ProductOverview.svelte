<script>
  import { url } from "@roxi/routify";

  export let product;
  export let href = null;

  let isDisabled = !product.id && !product.slug;
  let linkHref = !isDisabled ? $url(href ?? `/products/${product.slug}`) : "";
</script>

<a class="product {isDisabled && 'disabled'}" href={linkHref}>
  <img
    alt={product.images[0]?.altText ?? product.name}
    title={product.name}
    src={product.images[0]?.src}
    srcset={product.images[0]?.srcSet}
  />
  {#if product.images[1]}
    <img
      class="alt-image"
      alt={product.images[1].altText ?? product.name}
      title={product.name}
      src={product.images[1].src}
      srcset={product.images[1].srcSet}
    />
  {/if}
  <p>{product.name}</p>
</a>

<style>
  .product {
    display: block;
    position: relative;
    font-size: 16px;
    margin: 60px 30px;
    margin-top: 0;
    text-align: center;
  }
  .product.disabled {
    pointer-events: none;
  }
  .product img {
    display: block;
    width: 250px;
    height: 375px;
    object-fit: cover;
    background-color: var(--gray-mid);
    margin-bottom: 15px;
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
  .product p {
    margin: 0 auto;
    font-family: var(--main-font-title);
  }

  /* Touch-only devices can't really "hover". So fallback to an automatic
   * animation that transitions between the primary and alternate images. */
  @media (hover: none) {
    @keyframes opacity {
      0%,
      45% {
        opacity: 0;
      }
      55%,
      100% {
        opacity: 1;
      }
    }

    .product img.alt-image {
      animation: opacity 5s;
      animation-timing-function: var(--animation-timing-function-natural);
      animation-delay: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
    }

    /* Reset normal hover effects, so mobile doesn't try and show them */
    .product:hover img.alt-image {
      opacity: unset;
    }
  }
</style>
