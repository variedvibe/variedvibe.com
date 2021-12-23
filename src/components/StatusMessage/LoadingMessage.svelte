<script context="module">
  export const messageLoadingGeneric = "Loading...";
  export const messageLoadingPleaseWait = "Please wait...";
</script>

<script>
  import LoadingSpinner from "./LoadingSpinner.svelte";

  export let message = messageLoadingGeneric;
  export let centered = true;
  export let withSpinner = true;
</script>

<p class="loading-message" class:centered>
  {message}
  {#if withSpinner}
    <LoadingSpinner />
  {/if}
</p>

<style>
  .loading-message {
    font-size: var(--important-font-size);
    line-height: 1em;
  }
  .loading-message.centered {
    text-align: center;
  }
</style>
