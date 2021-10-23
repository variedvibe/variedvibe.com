<script context="module">
  export const messageErrorGeneric =
    "😓 Sorry. Something went wrong. Please try again later.";
  export const messageLoading = "Loading...";
</script>

<script>
  export let message;
</script>

<p class="status-message">
  {message}
</p>

<style>
  .status-message {
    font-size: var(--important-font-size);
    text-align: center;
  }
</style>
