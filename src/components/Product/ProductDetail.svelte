<script>
  import Lightbox from "/src/components/Lightbox/Lightbox.svelte";

  export let product;

  let lightboxImages = product.images.map((image) => ({
    src: image.src,
    altText: image.altText,
    title: product.name,
    srcSet: image.srcSet,
  }));

  let lightbox;
</script>

<div class="product">
  <h2 class="mobile-header">{product.name}</h2>
  <div class="media">
    {#each product.images as image, i}
      <img
        alt={image.altText ?? product.name}
        title={product.name}
        src={image.src}
        srcset={image.srcSet}
        width={image.width}
        height={image.height}
        on:click={lightbox.toggleShow(i)}
      />
    {/each}
  </div>
  <div class="details">
    <h2>{product.name}</h2>
    <p>{@html product.descriptionHtml}</p>
  </div>
</div>

<Lightbox images={lightboxImages} bind:this={lightbox} />

<style>
  .product {
    display: flex;
    width: auto;
  }
  .product h2 {
    text-align: center;
    margin-top: 0;
  }
  .mobile-header {
    display: none;
  }
  .media {
    flex: 3;
    line-height: 0;
    text-align: left;
    align-items: start;
    margin-top: -10px;
    margin-left: -10px;
  }
  .media img {
    display: inline-block;
    width: calc(50% - 10px);
    height: auto;
    margin-top: 10px;
    margin-left: 10px;
    object-fit: cover;
    background-color: var(--gray-mid);
    vertical-align: top;
    cursor: pointer;
  }
  .details {
    flex: 2;
    margin-left: 20px;
  }
  .details :global(ul) {
    padding-inline-start: 25px;
  }
  @media (max-width: 1050px) {
    .media {
      flex: 2;
    }
    .details {
      flex: 2;
    }
  }
  @media (max-width: 600px) {
    .product {
      flex-direction: column;
      align-items: center;
    }
    .mobile-header {
      display: unset;
    }
    .details {
      margin: 0 10px;
    }
    .details h2 {
      display: none;
    }
    .media {
      align-items: center;
      text-align: center;
      margin-top: -5px;
      margin-left: -5px;
    }
    .media img {
      width: calc(50% - 5px);
      margin-top: 5px;
      margin-left: 5px;
    }
  }
</style>
