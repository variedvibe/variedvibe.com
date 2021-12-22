<script context="module">
  export const messageErrorGeneric =
    "😓 Sorry. Something went wrong. Please try again later.";
  export const messageErrorInvalidForm =
    "Invalid entry. Please check your inputs.";
</script>

<script>
  export let message;
  export let centered = true;
</script>

<p class="status-message" class:centered>
  {message}
</p>

<style>
  .status-message {
    font-size: var(--important-font-size);
    line-height: 1em;
  }
  .status-message.centered {
    text-align: center;
  }
</style>
