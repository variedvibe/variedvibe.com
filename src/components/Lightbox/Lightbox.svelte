<script>
  /**
   * Should be an array of objects with {src, altText, title}.
   */
  export let images;
  export let current = 0;

  let shown = false;
  let lastScrollPositionTop = 0;
  let lastScrollPositionLeft = 0;

  export function toggleShow(index) {
    current = index;
    shown = !shown;

    document.body.classList.toggle("modal-open", shown);

    if (!shown) {
      window.scrollTo(lastScrollPositionLeft, lastScrollPositionTop);
    } else {
      lastScrollPositionTop = document.documentElement.scrollTop;
      lastScrollPositionLeft = document.documentElement.scrollLeft;
      window.scrollTo(0, 0);
    }
  }

  $: getClass = () => (shown ? "shown" : "hidden");
  $: getImageClass = (index) => (index === current ? "active" : "");
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
</style>
