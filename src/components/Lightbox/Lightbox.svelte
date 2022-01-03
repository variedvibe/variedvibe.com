<script>
  import debounce from "lodash.debounce";
  import { onMount, onDestroy } from "svelte";

  import LoadingSpinner from "/src/components/StatusMessage/LoadingSpinner.svelte";

  /**
   * Should be an array of objects with {src, altText, title, srcSet}.
   */
  export let images;
  export let current = 0;

  let shown = false;
  let imageElements = [];
  let isScrolling = false;

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

  // Create a scroll handler that returns a scoped timeout.
  //
  // We use a timeout to determine when the scrolling has stopped after a
  // certain amount of time, similar to a debounce. We have to do this since
  // there's no such `scrollStopped` event.
  function createScrollHandler() {
    let scrollTimeout;

    return () => {
      isScrolling = true;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };
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

  function scrollImageIntoView(imageIndex) {
    if (!shown || isScrolling) {
      return;
    }

    const element = imageElements[imageIndex];
    const elementBounds = element.getBoundingClientRect();

    // If the element isn't already in full view
    if (elementBounds.x !== 0) {
      element.scrollIntoView();
    }

    // If the element doesn't have a width, than the element hasn't been shown
    // yet...
    //
    // (this can happen with a race between reactivity of this function being
    // called and the element triggering a non-hidden view, while the browser
    // is also racing to paint the element into view)
    if (elementBounds.width === 0) {
      // Wait for the next animation frame (repaint) and try again
      requestAnimationFrame(() => scrollImageIntoView(imageIndex));
    }
  }

  onMount(() => {
    // After mounting, setup an intersection observer.
    // We wait until after mounting because otherwise the elements wouldn't have
    // been created yet, since scripts run before the rest of the component is
    // executed.
    const observerCallback = (entries) => {
      if (!isScrolling) {
        return;
      }

      // Find the intersecting entry
      for (const entry of entries) {
        if (entry.isIntersecting) {
          let imageElementIndex = imageElements.findIndex(
            (element) => element === entry.target
          );

          // If we found an element matching the intersecting entry
          if (imageElementIndex > -1) {
            current = imageElementIndex;
            return;
          }
        }
      }
    };

    const observerOptions = {
      root: document.querySelector("#image-scroller"),
      rootMargin: "0px",
      threshold: 0.5, // 50% showing
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    for (const element of imageElements) {
      observer.observe(element);
    }
  });

  onDestroy(() => {
    document.body.classList.remove("modal-open");
  });

  $: hasPrevious = current > 0;
  $: hasNext = current < images.length - 1;
  $: shown && !isScrolling && scrollImageIntoView(current);
</script>

<!--
When the viewport is resized it can trigger a new image to be loaded,
due to srcset/sizes and responsive image handling.

We listens to resize events to handle new images loading in by triggering
reactivity which allows the image element `.complete` reactive listeners to
properly update.

(We use a debounced version because `resize` events can fire rapidly)
-->
<svelte:window
  on:keydown={keyPressHandler}
  on:resize={triggerImageElementReactivityDebounced}
/>

<div class="container" class:hidden={!shown}>
  <div
    id="image-scroller"
    on:click={() => toggleShow(false)}
    on:scroll={createScrollHandler()}
  >
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
    overscroll-behavior: contain;
  }
  .container.hidden {
    display: none;
  }
  #image-scroller {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    overflow-x: auto;
    overflow-x: overlay;
    overscroll-behavior-x: contain;
    scroll-behavior: auto;
    scroll-snap-type: x mandatory;
    touch-action: manipulation; /* Improve response to touch */

    /* Disable scrollbar visibility */
    -ms-overflow-style: none; /* IE/Edge */
    scrollbar-width: none; /* Firefox */
  }
  /* Hide scrollbar for Webkit/Blink */
  #image-scroller::-webkit-scrollbar {
    display: none;
    height: 0;
    opacity: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    flex: 1 0 100%;
    touch-action: manipulation; /* Improve response to touch */
    scroll-snap-align: center;
    scroll-snap-stop: always;
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
    touch-action: manipulation; /* Improve response to touch */
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
      padding-right: 12%;
    }
    .navigation#next {
      padding-left: 12%;
    }

    /* Reset normal hover effects, so mobile doesn't try and show them */
    .ui-action:hover {
      background-color: unset;
    }
  }
</style>
