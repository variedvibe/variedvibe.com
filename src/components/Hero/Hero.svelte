<script>
  const defaultBackgroundColor = "#e0e0e0"; // Hard-coded to match the image
  const defaultImageSrc =
    "/assets/hero-images/Varied Vibe Shoot - Reeves Flower - Uniform Background.jpg";

  export let backgroundColor = defaultBackgroundColor;
  export let imageSrc = defaultImageSrc;
  export let addNoise = true;
  export let addVibeOverlay = true;
</script>

<section id="hero" style="--background-color: {backgroundColor}">
  <img alt="hero" src={imageSrc} />
  {#if addNoise}
    <div id="noise-filter" class="overlay" />
  {/if}
  {#if addVibeOverlay}
    <div id="vibe-overlay" class="overlay" />
  {/if}
</section>

<style>
  #hero {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;
    height: 320px;
    align-content: center;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    overflow: hidden;
  }
  #hero img {
    position: relative;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  #noise-filter {
    background-image: url("/assets/filters/noise.png");
    background-repeat: repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.2;
  }
  #vibe-overlay {
    background-image: url("/assets/vibe-black-text.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    backdrop-filter: contrast(0.85);
    filter: drop-shadow(0px 0px 5px var(--gray-mid-darker));
    z-index: 20;
  }
</style>
