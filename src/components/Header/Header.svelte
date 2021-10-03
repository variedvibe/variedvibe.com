<script>
  import Navigation from "./Navigation.svelte";
  import { url, layout } from "@roxi/routify";

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
      <!--<ul>-->
      <!--<li><a href={$url('/')}>Home</a></li>-->
      <!--<li><a href="/about-us">About Us</a></li>-->
      <!--</ul>-->
      <Navigation maxDepth="1" items={navItems} />
    </nav>

    <nav id="top-social-links">
      <ul class="social-links">
        <li>
          <a
            class="social-icon icon-instagram"
            title="Instagram - Varied Vibe."
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/variedvibe/"><!-- icon --></a
          >
        </li>
        <li>
          <a
            class="social-icon icon-twitter"
            title="Twitter - Varied Vibe."
            target="_blank"
            rel="noopener"
            href="https://twitter.com/VariedVibe"><!-- icon --></a
          >
        </li>
        <li>
          <a
            class="social-icon icon-facebook"
            title="Facebook - Varied Vibe."
            target="_blank"
            rel="noopener"
            href="https://www.facebook.com/VariedVibe/"><!-- icon --></a
          >
        </li>
        <li>
          <a
            class="social-icon icon-github"
            title="GitHub - Varied Vibe."
            target="_blank"
            rel="noopener"
            href="https://github.com/variedvibe"><!-- icon --></a
          >
        </li>
      </ul>
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
  nav#top-site-nav {
    flex: 2;
    display: inline-flex;
    flex-direction: row;
    padding: 0;
    margin: 10px auto;
    font-size: 20px;
    line-height: 0;
    align-self: center;
    justify-self: center;
    justify-content: center;
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
  nav#top-social-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav#top-social-links li {
    flex: 1;
    display: inline-block;
    padding: 0;
    margin: 0 5px;
  }
  nav#top-social-links a.social-icon {
    width: 20px;
    height: 20px;
  }

  a.social-icon {
    display: block;
    text-decoration: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: invert(100%) brightness(100%);
  }
  a.social-icon.icon-instagram {
    background-image: url("/assets/social-icons/instagram.svg");
  }
  a.social-icon.icon-twitter {
    background-image: url("/assets/social-icons/twitter.svg");
  }
  a.social-icon.icon-facebook {
    background-image: url("/assets/social-icons/facebook.svg");
  }
  a.social-icon.icon-github {
    background-image: url("/assets/social-icons/github.svg");
  }
</style>
