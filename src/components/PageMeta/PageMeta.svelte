<script>
  import { page, url, metatags } from "@roxi/routify";
  import { pageMeta } from "./stores.js";

  const mainTitle = "Varied Vibe.";
  const mainTagline = "It's a VIBE. What's yours?";
  const mainDescription = "Denver apparel co. It's a VIBE. What's yours?";
  const defaultType = "website";

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
  $: $pageMeta.type = type || defaultType;
  $: $pageMeta.url = canonicalUrl || $url($page.path);
  $: $pageMeta.image = image;

  // Set the meta tags
  $: metatags.title = $pageMeta.title
    ? `${mainTitle} - ${$pageMeta.title}`
    : mainTitle;
  $: metatags.description = $pageMeta.description ?? mainDescription;
  $: metatags.type = $pageMeta.type;
  $: metatags.url = $pageMeta.url;
  $: metatags.image = $pageMeta.image ?? "";
</script>
