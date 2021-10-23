<script>
  import { url } from "@roxi/routify";

  import Hero from "../components/Hero/Hero.svelte";
</script>

<Hero />

<div class="container">
  <h2>Hmmm... You seem lost.</h2>
  <p>
    Let's try bringing you back <a class="go-home" href={$url("/")}>home</a>.
  </p>
</div>

<style>
  .container {
    margin: 20px 0px;
    text-align: center;
  }
  p {
    font-size: var(--important-font-size);
  }
  .go-home {
    font-weight: bold;
  }
</style>
