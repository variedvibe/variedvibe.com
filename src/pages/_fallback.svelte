<script>
  import { url } from "@roxi/routify";

  import Hero from "/src/components/Hero/Hero.svelte";
</script>

<Hero />

<div class="container">
  <h2>Hmmm... You seem lost.</h2>
  <p>Let's try bringing you back home.</p>
  <a class="link-button" href={$url("/")}>Go Home</a>
</div>

<style>
  .container {
    margin: 20px 0px;
    text-align: center;
  }
  p {
    font-size: var(--important-font-size);
  }
  .link-button {
    margin: 20px auto;
  }
</style>
