<script>
  import { onDestroy } from "svelte";

  /**
   * Should be an array of objects with {src, altText, title, srcSet}.
   */
  export let images;
  export let current = 0;

  let shown = false;

  export function toggleShow(index) {
    current = index;
    shown = !shown;

    document.body.classList.toggle("modal-open", shown);

    if (shown) {
      window.addEventListener("keydown", keyPressHandler);
    } else {
      window.removeEventListener("keydown", keyPressHandler);
    }
  }

  export function previous() {
    hasPrevious && current--;
  }

  export function next() {
    hasNext && current++;
  }

  function keyPressHandler(ev) {
    switch (ev.key) {
      case "Escape":
        toggleShow();
        break;
      case "ArrowLeft":
        previous();
        break;
      case "ArrowRight":
        next();
        break;
    }
  }

  onDestroy(() => {
    document.body.classList.remove("modal-open");
    window.removeEventListener("keydown", keyPressHandler);
  });

  $: getClass = () => (shown ? "shown" : "hidden");
  $: getImageClass = (index) => (index === current ? "active" : "");
  $: hasPrevious = current > 0;
  $: hasNext = current < images.length - 1;
</script>

<div class="container {getClass()}">
  <div id="close" class="ui-action" on:click={toggleShow}>
    <span class="ui-icon" title="Close">
      <i><u class="visually-hidden">Close</u></i>
    </span>
  </div>
  <div id="image" on:click={toggleShow}>
    {#each images as image, i}
      <img
        class={getImageClass(i)}
        alt={image.altText}
        title={image.title}
        src={image.src}
        srcset={image.srcSet}
        width={image.width}
        height={image.height}
      />
    {/each}
  </div>
  <div
    id="previous"
    class="ui-action navigation {!hasPrevious && 'disabled'}"
    on:click={previous}
  >
    <span class="ui-icon" title="Previous">
      <i><u class="visually-hidden">Previous</u></i>
    </span>
  </div>
  <div
    id="next"
    class="ui-action navigation {!hasNext && 'disabled'}"
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
