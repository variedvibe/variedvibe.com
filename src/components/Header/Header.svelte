<script>
  import { url, layout } from "@roxi/routify";

  import Navigation from "./Navigation.svelte";
  import NavIcons from "./NavIcons.svelte";

  export let home = {
    path: $url("/"),
    title: "Home",
  };
  export let children = $layout.children;
  export let navItems = [home, ...children];
</script>

<header>
  <div class="page-width-wrapper">
    <h1 id="main-logo">
      <a href={$url("/")} title="Go Home"
        ><i><u class="visually-hidden">Varied Vibe.</u></i></a
      >
    </h1>

    <nav id="top-site-nav" role="navigation">
      <Navigation maxDepth="1" items={navItems} />
    </nav>

    <nav id="top-nav-icons" role="navigation">
      <NavIcons />
    </nav>
  </div>
</header>

<style>
  header {
    --header-height: 60px;
    --ui-icon-size: 22px;
    --nav-item-margin: 10px;

    display: flex;
    width: 100%;
    height: var(--header-height);
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--main-bg-color);
  }
  @media (max-width: 350px) {
    header {
      --ui-icon-size: 18px;
      --nav-item-margin: 8px;
    }
  }
  @media (max-width: 600px) {
    header {
      --header-height: 50px;
    }
  }
  @media (max-height: 500px) {
    header {
      position: unset;
    }
  }
  header .page-width-wrapper {
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  #main-logo {
    flex: 1;
    order: 0;
    display: block;
    align-self: center;
    height: 100%;
    padding: 0;
    margin: 0;
    background-image: url("/assets/logo-horizontal.svg");
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
  }
  #main-logo a {
    display: block;
    width: 100%;
    height: 100%;
  }
  nav#top-site-nav {
    flex: 2;
    order: 1;
    display: inline-flex;
    flex-direction: row;
    padding: 0;
    align-self: center;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 800px) {
    nav#top-site-nav {
      flex: 1.5;
      justify-content: flex-end;
    }
  }
  nav#top-nav-icons {
    flex: 1;
    order: 2;
    display: inline-flex;
    flex-direction: row;
    padding: 0;
    align-self: center;
    align-items: center;
    justify-content: flex-end;
  }
  @media (max-width: 800px) {
    nav#top-site-nav {
      flex: 0;
      order: 2;
    }
    nav#top-nav-icons {
      order: 1;
    }
  }
</style>
