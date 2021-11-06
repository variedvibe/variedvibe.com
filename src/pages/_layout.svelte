<script>
  import BrowserHints from "/src/components/Meta/Performance/BrowserHints.svelte";
  import PageMeta from "/src/components/Meta/PageMeta/PageMeta.svelte";
  import Header from "/src/components/Header/Header.svelte";
  import SocialLinks from "/src/components/SocialLinks/SocialLinks.svelte";
</script>

<BrowserHints />
<PageMeta />

<Header />

<main>
  <slot />
</main>

<footer>
  <div class="page-width-wrapper">
    <nav id="bottom-social-links">
      <SocialLinks inFooter="true" />
    </nav>
    Copyright © 2021 Varied Vibe.
  </div>
</footer>

<style>
  main {
    flex: 1;
  }
  footer {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px 0;
    text-align: center;
    font-size: var(--small-font-size);
    color: var(--gray-mid-dark);
  }
  #bottom-social-links {
    margin: 10px auto;
  }
</style>
