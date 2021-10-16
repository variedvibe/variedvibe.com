<script>
  export let product;
</script>

<div class="product">
  <div class="media">
    <img
      alt={product.images[0]?.altText ?? product.name}
      title={product.name}
      src={product.images[0]?.src}
    />
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
  }
  @media (max-width: 500px) {
    .product {
      flex-direction: column;
      align-items: center;
    }
  }
  .media {
    flex: 1;
  }
  .media img {
    display: block;
    width: 250px;
    height: 375px;
    object-fit: cover;
    background-color: var(--gray-mid);
  }
  .details {
    flex: 4;
    margin: 0px 20px;
  }
</style>
