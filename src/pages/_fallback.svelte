<script>
  import { url, route, leftover } from "@roxi/routify";

  import Hero from "/src/components/Hero/Hero.svelte";

  const errorPagePath = "error-404";

  // If we got here without a previous route, and the "leftover" in our fallback
  // URL isn't of the error page URL, redirect outside of our router to trigger
  // a server-delivered 404 status code.
  if (!$route.last && $leftover !== errorPagePath) {
    window.location.replace("/" + errorPagePath);
  }
</script>

<svelte:head>
  <!-- Tell search engines not to index this error page -->
  <meta name="robots" content="noindex" />
</svelte:head>

<Hero />

<div class="container">
  <h2>Hmmm... You seem lost.</h2>
  <p>Let's try bringing you back home.</p>
  <a class="link-button primary" href={$url("/")}>Go Home</a>
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
