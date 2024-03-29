<script context="module">
  export const baseUrl = new URL(
    import.meta.env.VITE_BASE_URL ??
      import.meta.env.BASE_URL ??
      "https://variedvibe.com/"
  );

  export const mainTitle = "Varied Vibe.";
  export const mainTagline = "It's a VIBE. What's yours?";
  export const mainDescription =
    "Denver apparel co. It's a VIBE. What's yours?";

  export const defaultType = "website";
  export const defaultImageSrc = new URL(
    "/assets/logo-horizontal.svg",
    baseUrl
  ).toString();
</script>

<script>
  import { page, url, metatags } from "@roxi/routify";
  import { pageMeta } from "./stores.js";

  // Give optional props `null` default values
  export let title = null;
  export let description = null;
  export let type = null;
  export let canonicalUrl = null;
  export let image = null;

  // Set default values for our store, reactively.
  //
  // We use `$page.meta.title` here, because it's the explicitly set value,
  // while `$page.title` is automatically set based on folders/directories...
  // which is ugly and not intentional.
  //
  // Also, we use `||` instead of `??`, as the default might be an empty string.
  $: $pageMeta.title =
    title || $page.meta.title || $page.parent.meta.title || mainTagline;
  $: $pageMeta.description =
    description || $page.meta.description || $page.parent.meta.description;
  $: $pageMeta.url =
    canonicalUrl || $page.meta.url || $page.parent.meta.url || $page.path;
  $: $pageMeta.type =
    type || $page.meta.image || $page.parent.meta.image || defaultType;
  $: $pageMeta.image =
    image || $page.meta.image || $page.parent.meta.image || defaultImageSrc;

  // Normalize some values
  $: $pageMeta.title = $pageMeta.title
    ? `${mainTitle} - ${$pageMeta.title}`
    : mainTitle;
  $: $pageMeta.description = $pageMeta.description ?? mainDescription;
  $: $pageMeta.url = !$pageMeta.url?.match(/\/_fallback$/) // Check fallback/404
    ? new URL($url($pageMeta.url), baseUrl).toString()
    : baseUrl.toString(); // Revert to the base URL for fallback/404 errors

  // Set the meta tags that the routify helper understands
  $: metatags.title = $pageMeta.title;
  $: metatags.description = $pageMeta.description;
  $: metatags.url = $pageMeta.url;
  $: metatags.type = $pageMeta.type;
  $: metatags.image = $pageMeta.image ?? "";
</script>

<svelte:head>
  <!-- Set the other metatags that the routify helpers can't -->
  {#if $pageMeta.url}
    <link rel="canonical" href={$pageMeta.url} />
  {/if}
</svelte:head>
