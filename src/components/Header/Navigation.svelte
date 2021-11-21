<!--
   Navigation component
   Props:
     children=${layout.children} (optional) array of nodes
     maxDepth=Infinite (optional) depth of descendent tree
     explode="all"|"selected"|false (optional) explode descendents
   Example1:
     <Navigation />
   Example2:
     <Navigation maxDepth=2 children={$layout.children} />
-->
<script>
  import { url, isActive, layout, afterPageLoad } from "@roxi/routify";

  export let items = $layout.children;
  export let maxDepth = Infinity;
  export let _depth = 0;
  export let explode = "selected"; // "selected", "all" or false

  _depth++;
  $: getClass = (path) => ($isActive(path) ? "active" : "");
  $: shouldExplode = (path) =>
    (explode === "selected" && $isActive(path)) || explode === "all";

  let menuShown = false;

  export function toggleMenu(show) {
    menuShown = show ?? menuShown;

    document.body.classList.toggle("modal-open", menuShown);

    if (menuShown) {
      window.addEventListener("keydown", keyPressHandler);
    } else {
      window.removeEventListener("keydown", keyPressHandler);
    }
  }

  $: menuShown, toggleMenu();
  $: getMenuShownClass = () => (menuShown ? "menu-shown" : "");

  // Close the menu after loading the page
  $afterPageLoad(() => {
    toggleMenu(false);
  });

  function keyPressHandler(ev) {
    switch (ev.key) {
      case "Escape":
        toggleMenu(false);
        break;
    }
  }
</script>

<div class="container {getMenuShownClass()}">
  <input
    class="nav-menu-toggle ui-action"
    name="nav-menu-toggle"
    type="checkbox"
    bind:checked={menuShown}
  />
  <label class="nav-menu-toggle ui-action" for="nav-menu-toggle">
    <span class="ui-icon" title="Toggle Menu">
      <i><u class="visually-hidden">Toggle Menu</u></i>
    </span>
  </label>

  <div class="nav-menu">
    <ul>
      {#each items as { path, title, children }}
        <li data-nav-depth={_depth}>
          <!-- we use $url to resolve the path  -->
          <a href={$url(path)} class="{getClass(path)}}">{title}</a>

          <!-- parse nested children here -->
          {#if items && _depth < maxDepth && shouldExplode(path)}
            <svelte:self items={children} {maxDepth} {_depth} />
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  input.nav-menu-toggle {
    position: absolute;
    display: block;
    width: var(--ui-icon-size);
    height: var(--ui-icon-size);
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 10;
    -webkit-touch-callout: none;
  }
  label.nav-menu-toggle {
    position: relative;
    display: block;
    width: var(--ui-icon-size);
    height: var(--ui-icon-size);
  }
  @media (min-width: 801px) {
    input.nav-menu-toggle {
      display: none;
    }
    label.nav-menu-toggle {
      display: none;
    }
  }

  .nav-menu-toggle .ui-icon {
    width: 100%;
    height: 100%;
    background-image: url("/assets/ui-icons/hamburger-menu.svg");
    filter: invert(1);
  }
  .menu-shown .nav-menu-toggle .ui-icon {
    background-image: url("/assets/ui-icons/close-line.svg");
    filter: invert(1);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.1em;
    line-height: 1;
  }
  li {
    display: inline-block;
    padding: 0;
    margin: 0 8px;
    vertical-align: middle;
  }
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
  @media (max-width: 800px) {
    .nav-menu {
      position: absolute;
      z-index: 50;
      width: 100vw;
      height: 0;
      top: var(--header-height);
      left: 0;
      visibility: hidden;
      overflow-y: auto;
      background-color: var(--main-bg-color);
      transition-property: height, visibility;
      transition-duration: var(--animation-speed-fast);
      transition-timing-function: var(--animation-timing-function-natural);
    }
    input[name="nav-menu-toggle"]:checked ~ .nav-menu {
      height: calc(100vh - var(--header-height));
      visibility: visible;
    }
    ul {
      font-size: 1.4em;
    }
    li,
    li:first-child,
    li:last-child {
      display: block;
      width: 80%;
      text-align: center;
      margin: 15px auto;
      padding-bottom: 15px;
      border: none;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: var(--gray-mid-darker);
    }
    li:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
    li a {
      display: inline-block;
    }
  }

  a,
  a:link,
  a:visited {
    color: var(--white);
  }
  a:hover {
    color: var(--gray-mid);
  }
  @media (hover: none) {
    /* Reset normal hover effects, so mobile doesn't try and show them */
    a:hover {
      color: var(--white);
    }
  }
  a:active {
    color: var(--gray-dark);
  }
</style>
