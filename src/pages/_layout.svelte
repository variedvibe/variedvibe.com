<script>
  import BrowserHints from "/src/components/Meta/Performance/BrowserHints.svelte";
  import PageMeta from "/src/components/Meta/PageMeta/PageMeta.svelte";
  import Header from "/src/components/Header/Header.svelte";
  import Footer from "/src/components/Footer/Footer.svelte";
</script>

<BrowserHints />
<PageMeta />

<Header />

<main>
  <slot />
</main>

<Footer />

<style>
  main {
    flex: 1;
  }
</style>
