<script>
  import { url } from "@roxi/routify";

  export let product;
  export let href = null;

  export let imageWidth = 250;
  export let imageHeight = 375;

  let isDisabled = !product.id && !product.slug;
  let isEmpty = isDisabled && !product.name && product.images?.length == 0;
  let linkHref = !isDisabled
    ? $url(href ?? `/products/${product.gid.id}/${product.slug}`)
    : null;

  let imageMain = product.getImageForPresentation();
  let imageAlternative = product.getImageForSummary(false);
</script>

<a
  class="product"
  class:disabled={isDisabled}
  class:loading={isEmpty}
  href={linkHref}
  style="--image-width: {imageWidth}px; --image-height: {imageHeight}px;"
>
  <div class="image-container" class:loading-placeholder={isEmpty}>
    {#if imageMain}
      <img
        alt={imageMain.altText ?? product.name}
        title={product.name}
        src={imageMain.src}
        srcset={imageMain.srcSet}
        sizes="{imageHeight}px"
        width={imageWidth ?? imageMain.width}
        height={imageHeight ?? imageMain.height}
      />
    {/if}
    {#if imageAlternative}
      <img
        class="alt-image"
        alt={imageAlternative.altText ?? product.name}
        title={product.name}
        src={imageAlternative.src}
        srcset={imageAlternative.srcSet}
        sizes="{imageHeight}px"
        width={imageWidth ?? imageAlternative.width}
        height={imageHeight ?? imageAlternative.height}
      />
    {/if}
  </div>
  <p>{isEmpty ? "..." : product.name}</p>
</a>

<style>
  .product {
    display: block;
    text-align: center;
  }
  .product .image-container {
    display: block;
    position: relative;
    width: var(--image-width);
    height: var(--image-height);
    background-color: var(--gray-mid);
    margin-bottom: 15px;
  }
  .product img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
      animation-delay: 2.25s;
      animation-timing-function: var(--animation-timing-function-natural);
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
