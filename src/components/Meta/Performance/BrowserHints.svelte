<script>
  import { getBaseUrl as getShopBaseUrl } from "/src/services/Shop/Shop.ts";

  const missionCriticalBaseURLs = [
    getShopBaseUrl().toString(),
    "https://cdn.shopify.com/",
  ];

  const commonThirdPartyBaseURLs = [
    "https://www.googletagmanager.com/",
    "https://www.google-analytics.com/",
  ];
</script>

<svelte:head>
  <!-- https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch -->
  {#each missionCriticalBaseURLs as baseUrl}
    <link rel="preconnect" href={baseUrl} crossorigin />
    <link rel="dns-prefetch" href={baseUrl} />
  {/each}

  {#each commonThirdPartyBaseURLs as baseUrl}
    <link rel="dns-prefetch" href={baseUrl} />
  {/each}
</svelte:head>
