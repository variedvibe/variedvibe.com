<!-- routify:options index=false -->
<!-- routify:options title="" -->

<div class="page-width-wrapper">
  <div class="loading">
    <h2>Processing</h2>
    <p>Please wait... <span class="load-spinner" /></p>
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
  .loading p {
    line-height: 1em;
    font-size: var(--important-font-size);
  }
  .load-spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    vertical-align: top;
  }
</style>
