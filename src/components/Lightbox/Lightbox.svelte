<script>
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
  }

  $: getClass = () => (shown ? "shown" : "hidden");
  $: getImageClass = (index) => (index === current ? "active" : "");
  $: hasPrevious = current > 0;
  $: hasNext = current < images.length - 1;
</script>

<div class="container {getClass()}">
  <span id="close" on:click={toggleShow}>X</span>
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
    class="navigation {!hasPrevious && 'disabled'}"
    on:click={() => current--}>&lt;</span
  >
  <span
    id="next"
    class="navigation {!hasNext && 'disabled'}"
    on:click={() => current++}>&gt;</span
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
  #close {
    display: flex;
    position: absolute;
    z-index: 1010;
    top: 0;
    right: 0;
    width: 1em;
    height: 1em;
    padding: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: monospace;
    font-size: 14px;
    font-weight: bold;
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
    display: flex;
    position: absolute;
    z-index: 1005;
    width: 1em;
    height: 100%;
    padding: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: monospace;
    font-size: 14px;
    font-weight: bold;
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
</style>
