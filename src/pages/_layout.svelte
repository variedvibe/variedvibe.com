<script>
  import BrowserHints from "/src/components/Meta/Performance/BrowserHints.svelte";
  import PageMeta from "/src/components/Meta/PageMeta/PageMeta.svelte";
  import PageNavIndicator from "/src/components/PageNavIndicator.svelte";
  import Header from "/src/components/Header/Header.svelte";
  import Footer from "/src/components/Footer/Footer.svelte";
</script>

<BrowserHints />
<PageMeta />

<PageNavIndicator />

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
