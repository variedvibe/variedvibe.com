<script>
  import Lightbox from "../Lightbox/Lightbox.svelte";

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
  <h1 class="mobile-header">{product.name}</h1>
  <div class="media">
    {#each product.images as image, i}
      <img
        alt={image.altText ?? product.name}
        title={product.name}
        src={image.src}
        srcset={image.srcSet}
        on:click={lightbox.toggleShow(i)}
      />
    {/each}
  </div>
  <div class="details">
    <h1>{product.name}</h1>
    <p>{@html product.descriptionHtml}</p>
  </div>
</div>

<Lightbox images={lightboxImages} bind:this={lightbox} />

<style>
  .product {
    display: flex;
    width: auto;
    font-size: 16px;
  }
  .product h1 {
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
  }
  .media img {
    display: inline-block;
    width: calc(50% - 10px);
    height: auto;
    margin: 5px;
    object-fit: cover;
    background-color: var(--gray-mid);
    vertical-align: top;
    cursor: pointer;
  }
  .details {
    flex: 2;
    margin: 0px 20px;
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
      margin: 0px 10px;
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
    .details h1 {
      display: none;
    }
    .media {
      align-items: center;
      text-align: center;
    }
    .media img {
      width: calc(50% - 5px);
      margin: 2.5px;
    }
  }
</style>
