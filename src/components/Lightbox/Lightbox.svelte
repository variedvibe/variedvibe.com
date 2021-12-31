<script>
  import debounce from "lodash.debounce";
  import { onDestroy } from "svelte";

  import LoadingSpinner from "/src/components/StatusMessage/LoadingSpinner.svelte";

  /**
   * Should be an array of objects with {src, altText, title, srcSet}.
   */
  export let images;
  export let current = 0;

  let shown = false;
  let imageElements = [];

  export function toggleShow(show, index = 0) {
    shown = show ?? !shown;
    current = index;

    document.body.classList.toggle("modal-open", shown);
  }

  export function previous() {
    hasPrevious && current--;
  }

  export function next() {
    hasNext && current++;
  }

  function keyPressHandler(event) {
    switch (event.key) {
      case "Escape":
        toggleShow(false);
        break;
      case "ArrowLeft":
        previous();
        break;
      case "ArrowRight":
        next();
        break;
    }
  }

  function triggerImageElementReactivity() {
    // Loading checks depend on the native "complete" read-only property.
    // We can't check this value reactively, so we reassign the elements array
    // in `on:load` to trigger a reactive check of the complete property.
    imageElements = imageElements;
  }
  const triggerImageElementReactivityDebounced = debounce(
    triggerImageElementReactivity,
    250
  );

  onDestroy(() => {
    document.body.classList.remove("modal-open");
  });

  $: hasPrevious = current > 0;
  $: hasNext = current < images.length - 1;
</script>

<svelte:window
  on:keydown={keyPressHandler}
  on:resize={triggerImageElementReactivityDebounced}
/>

<div class="container" class:hidden={!shown}>
  <div id="image" on:click={() => toggleShow(false)}>
    {#each images as image, i}
      <img
        class:active={current === i}
        class:loading={!imageElements[i]?.complete}
        alt={image.altText}
        title={image.title}
        src={image.src}
        srcset={image.srcSet}
        sizes="100vw"
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        bind:this={imageElements[i]}
        on:load={triggerImageElementReactivity}
      />
    {/each}
    <div id="loading">
      <LoadingSpinner />
    </div>
  </div>
  <div id="close" class="ui-action" on:click={() => toggleShow(false)}>
    <span class="ui-icon" title="Close">
      <i><u class="visually-hidden">Close</u></i>
    </span>
  </div>
  <div
    id="previous"
    class="ui-action navigation"
    class:disabled={!hasPrevious}
    on:click={previous}
  >
    <span class="ui-icon" title="Previous">
      <i><u class="visually-hidden">Previous</u></i>
    </span>
  </div>
  <div
    id="next"
    class="ui-action navigation"
    class:disabled={!hasNext}
    on:click={next}
  >
    <span class="ui-icon" title="Next">
      <i><u class="visually-hidden">Next</u></i>
    </span>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    max-height: 100dvh;
    background-color: var(--black);
  }
  .container.hidden {
    display: none;
  }
  #image {
    flex: 1;
    max-width: 100%;
    max-height: 100%;
  }
  img {
    display: none;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  img.active {
    display: block;
  }
  #loading {
    display: none;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: var(--important-font-size);
  }
  img.active.loading ~ #loading {
    display: flex;
  }
  .ui-action {
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .ui-action::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 1.5em;
    height: 1.5em;
    background-color: rgba(64, 64, 64, 0.4);
    border: 1px solid transparent;
    border-radius: 100px;
  }
  .ui-action:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .ui-action .ui-icon {
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  #close {
    position: absolute;
    z-index: 1010;
    top: 0;
    right: 0;
  }
  #close .ui-icon {
    background-image: url("/assets/ui-icons/close-line.svg");
    filter: invert(1);
  }
  .navigation {
    position: absolute;
    z-index: 1005;
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
  .navigation.disabled {
    display: none;
  }
  .navigation#previous {
    left: 0;
  }
  .navigation#previous .ui-icon {
    background-image: url("/assets/ui-icons/angle-left-arrow-line.svg");
    filter: invert(1);
  }
  .navigation#next {
    right: 0;
  }
  .navigation#next .ui-icon {
    background-image: url("/assets/ui-icons/angle-right-arrow-line.svg");
    filter: invert(1);
  }

  /* Touch-only devices get larger padding, to provide larger touch targets. */
  @media (hover: none) {
    #close {
      padding-left: 18px;
      padding-bottom: 18px;
    }
    .navigation#previous {
      padding-right: 20%;
    }
    .navigation#next {
      padding-left: 20%;
    }

    /* Reset normal hover effects, so mobile doesn't try and show them */
    .ui-action:hover {
      background-color: unset;
    }
  }
</style>
