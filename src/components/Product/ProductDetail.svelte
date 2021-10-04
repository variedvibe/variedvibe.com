<script>
  //import { url } from '@roxi/routify'

  //export let id;
  export let name;
  export let description;
  export let images = [];
</script>

<div class="product">
  <div class="media">
    <img alt={name} title={name} src={images[0]} />
  </div>
  <div class="details">
    <h1>{name}</h1>
    <p>{description}</p>
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
  }
  .details {
    flex: 4;
  }
</style>
