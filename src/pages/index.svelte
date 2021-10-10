<script>
  import { getFeaturedProducts } from "../services/Shop/Shop.js";

  import Hero from "../components/Hero/Hero.svelte";
  import ProductOverview from "../components/Product/ProductOverview.svelte";

  export let featuredProducts = getFeaturedProducts();
</script>

<Hero />

<aside id="main-blurb">Something something something should be here...</aside>

<div class="page-width-wrapper">
  {#await featuredProducts then products}
    <section id="products">
      {#each products as { id, name, images }}
        <ProductOverview {id} {name} {images} />
      {/each}
    </section>
  {/await}
</div>

<style>
  #main-blurb {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;
    text-align: center;
  }
  #products {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
