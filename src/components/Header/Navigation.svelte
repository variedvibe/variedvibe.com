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
  import { url, isActive, layout } from "@roxi/routify";

  export let items = $layout.children;
  export let maxDepth = Infinity;
  export let _depth = 0;
  export let explode = "selected"; // "selected", "all" or false

  _depth++;
  $: getClass = (path) => ($isActive(path) ? "active" : "");
  $: shouldExplode = (path) =>
    (explode === "selected" && $isActive(path)) || explode === "all";
</script>

<ul>
  {#each items as { path, title, children }}
    <li data-nav-depth={_depth}>
      <!-- we use $url to resolve the path  -->
      <a href={$url(path)} class={getClass(path)}>{title}</a>

      <!-- parse nested children here -->
      {#if items && _depth < maxDepth && shouldExplode(path)}
        <svelte:self items={children} {maxDepth} {_depth} />
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 20px;
    line-height: 0;
  }
  li {
    flex: 1;
    display: inline-block;
    padding: 0;
    margin: 0 10px;
  }
  @media (max-width: 300px) {
    ul {
      font-size: 12px;
    }
    li {
      margin: 0 5px;
    }
  }
  @media (max-width: 400px) and (min-width: 301px) {
    ul {
      font-size: 14px;
    }
    li {
      margin: 0 5px;
    }
  }
  @media (max-width: 600px) and (min-width: 401px) {
    ul {
      font-size: 16px;
    }
    li {
      margin: 0 5px;
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