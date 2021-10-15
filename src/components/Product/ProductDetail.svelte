<script>
  export let product;
</script>

<div class="product">
  <div class="media">
    <img alt={product.name} title={product.name} src={product.images[0].src} />
  </div>
  <div class="details">
    <h1>{product.name}</h1>
    <p>{product.description}</p>
  </div>
</div>

<style>
  .product {
    display: flex;
    width: auto;
    font-size: 16px;
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
    width: 200px;
    height: 300px;
    background-color: var(--gray-mid);
    object-fit: cover;
  }
  .details {
    flex: 4;
  }
</style>
