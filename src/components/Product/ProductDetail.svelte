<script>
  export let product;
</script>

<div class="product">
  <h1 class="mobile-header">{product.name}</h1>
  <div class="media">
    {#each product.images as image}
      <img
        alt={image.altText ?? product.name}
        title={product.name}
        src={image.src}
      />
    {/each}
  </div>
  <div class="details">
    <h1>{product.name}</h1>
    <p>{@html product.descriptionHtml}</p>
  </div>
</div>

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
    max-width: 375px;
    max-height: 375px;
    margin: 5px;
    object-fit: cover;
    background-color: var(--gray-mid);
    vertical-align: top;
  }
  .details {
    flex: 2;
    margin: 0px 20px;
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
      /* Below should override, but this is if `calc()` fails (old browsers) */
      max-width: 100%;
      max-width: calc(100% - 2.5px);
      margin: 2.5px;
    }
  }
</style>
