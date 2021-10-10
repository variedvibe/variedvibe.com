<script>
  import { url, layout } from "@roxi/routify";

  import Navigation from "./Navigation.svelte";
  import SocialLinks from "../SocialLinks/SocialLinks.svelte";

  export let home = {
    path: $url("/"),
    title: "Home",
  };
  export let children = $layout.children;
  export let navItems = [home, ...children];
</script>

<header>
  <div class="page-width-wrapper">
    <a href={$url("/")} id="main-logo"><!-- logo --></a>

    <nav id="top-site-nav">
      <Navigation maxDepth="1" items={navItems} />
    </nav>

    <nav id="top-social-links">
      <SocialLinks />
    </nav>
  </div>
</header>

<style>
  header {
    display: flex;
    width: 100%;
    padding: 2px 0;
    position: sticky;
    top: 0;
    background: var(--main-bg-color);
  }
  @media (max-height: 500px) {
    header {
      position: unset;
    }
  }
  header .page-width-wrapper {
    display: flex;
    width: 100%;
  }
  #main-logo {
    flex: 1;
    display: inline-block;
    align-self: center;
    height: 80px;
    background-image: url("/assets/Varied Vibe - Logo - Horizontal (Optimized).svg");
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
  }
  @media (max-width: 600px) {
    #main-logo {
      height: 50px;
    }
  }
  @media (max-height: 500px) {
    #main-logo {
      height: 60px;
    }
  }
  nav#top-site-nav {
    flex: 2;
    display: inline-flex;
    flex-direction: row;
    padding: 0;
    margin: 10px auto;
    align-self: center;
    justify-self: center;
    justify-content: center;
  }
  @media (max-width: 500px) {
    nav#top-site-nav {
      flex: 1.5;
      justify-content: end;
    }
  }
  nav#top-social-links {
    flex: 1;
    display: inline-flex;
    flex-direction: row;
    padding: 0;
    margin: 10px auto;
    margin-right: 0;
    font-size: 0;
    line-height: 0;
    align-self: center;
    justify-self: center;
    justify-content: flex-end;
  }
  @media (max-width: 500px) {
    nav#top-social-links {
      display: none;
    }
  }
</style>
