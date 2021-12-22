<!-- routify:options title="" -->
<script>
  import LoadingMessage, {
    messageLoadingPleaseWait,
  } from "/src/components/StatusMessage/LoadingMessage.svelte";
</script>

<!-- routify:options index=false -->

<div class="page-width-wrapper">
  <div class="loading">
    <h2>Processing</h2>
    <LoadingMessage message={messageLoadingPleaseWait} />
  </div>

  <slot />
</div>

<style>
  .loading {
    margin: 0;
    margin-top: 2em;
    padding: 0;
    text-align: center;
  }
</style>
