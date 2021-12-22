<script context="module">
  export const messageLoadingGeneric = "Loading...";
  export const messageLoadingPleaseWait = "Please wait...";
</script>

<script>
  export let message = messageLoadingGeneric;
  export let centered = true;
  export let withSpinner = true;
</script>

<p class="loading-message" class:centered>
  {message}
  {#if withSpinner}
    <span class="loading-spinner" />
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
  .loading-spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    vertical-align: top;
  }
</style>
