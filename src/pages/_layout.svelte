<script>
  import Header from "../components/Header/Header.svelte";
</script>

<Header />

<main>
  <slot />
</main>

<footer>
  <div class="page-width-wrapper">Copyright © 2021 Varied Vibe.</div>
</footer>

<style>
  footer {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px 0;
    text-align: center;
    font-size: 14px;
    color: var(--gray-mid-dark);
  }
</style>
