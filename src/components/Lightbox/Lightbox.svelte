<script>
  import { onDestroy } from "svelte";

  /**
   * Should be an array of objects with {src, altText, title}.
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
  <span id="close" class="text-icon" on:click={toggleShow}>X</span>
  <div id="image" on:click={toggleShow}>
    {#each images as image, i}
      <img
        class={getImageClass(i)}
        alt={image.altText}
        title={image.title}
        src={image.src}
      />
    {/each}
  </div>
  <span
    id="previous"
    class="text-icon navigation {!hasPrevious && 'disabled'}"
    on:click={previous}>&lt;</span
  >
  <span
    id="next"
    class="text-icon navigation {!hasNext && 'disabled'}"
    on:click={next}>&gt;</span
  >
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
  .text-icon {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    font-family: ui-monospace, monospace, ui-sans-serif, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 0 1px var(--black);
    color: var(--white);
  }
  .text-icon:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 600px) {
    .text-icon {
      padding: 5px;
    }
  }
  #close {
    position: absolute;
    z-index: 1010;
    top: 0;
    right: 0;
    width: 1em;
    height: 1em;
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
    width: 1em;
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 20px;
  }
  .navigation.disabled {
    display: none;
  }
  .navigation#previous {
    left: 0;
  }
  .navigation#next {
    right: 0;
  }

  /* Touch-only devices get larger padding, to provide larger touch targets. */
  @media (hover: none) {
    #close {
      padding-left: 15px;
      padding-bottom: 15px;
    }
    .navigation#previous {
      padding-right: 20%;
    }
    .navigation#next {
      padding-left: 20%;
    }
  }
</style>
