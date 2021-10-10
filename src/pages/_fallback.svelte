<script>
  import { url } from "@roxi/routify";

  import Hero from "../components/Hero/Hero.svelte";
</script>

<Hero />

<div class="container">
  <h1>Hmmm... You seem lost.</h1>
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
    font-size: 1.2em;
  }
  .go-home {
    font-weight: bold;
  }
</style>
