<script>
  import { isChangingPage, beforeUrlChange } from "@roxi/routify";

  // The time interval, in milliseconds, to use to simulate load updates.
  const loadSimulationIntervalTime = 200;

  // TODO: Remove in favor of just using `$isChangingPage` once issue
  // https://github.com/roxiness/routify/issues/421 is fixed.
  $: isLoading = $isChangingPage;
  $beforeUrlChange(() => (isLoading = true));

  let percentageLoaded = 0;

  let loadSimulationInterval;

  $: {
    if (isLoading && !loadSimulationInterval) {
      percentageLoaded = 0;

      loadSimulationInterval = setInterval(() => {
        // Update the percent loaded, but stop at 99% so we don't show a 100%
        // when we're not actually fully loaded.
        if (percentageLoaded < 99) {
          percentageLoaded++;
        }
      }, loadSimulationIntervalTime);
    } else if (!isLoading) {
      if (loadSimulationInterval) {
        // Stop simulating loading
        clearInterval(loadSimulationInterval);
        loadSimulationInterval = null;
      }

      percentageLoaded = 100;
    }
  }
</script>

<progress
  id="page-nav-indicator"
  class:hidden={!isLoading}
  max="100"
  value={percentageLoaded}
  style="--load-simulation-interval-time: {loadSimulationIntervalTime}ms"
/>

<style>
  progress {
    --progress-value-transition: width var(--load-simulation-interval-time) ease;

    -webkit-appearance: none;
    appearance: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    display: block;
    width: 100%;
    height: 2px;
    margin: 0;
    padding: 0;
    border: none;
    color: var(--accent-color-1-normal);
    accent-color: currentColor;
    transition: opacity var(--animation-speed-normal)
      var(--animation-timing-function-natural);
  }
  progress,
  progress::-webkit-progress-bar {
    background-color: transparent;
  }
  progress::-webkit-progress-value {
    background-color: currentColor;
    transition: var(--progress-value-transition);
  }
  progress::-moz-progress-bar {
    background-color: currentColor;
    transition: var(--progress-value-transition);
  }
  .hidden {
    opacity: 0;
  }
</style>
