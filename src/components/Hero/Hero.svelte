<script>
  const defaultBackgroundColor = "#e0e0e0"; // Hard-coded to match the image
  const defaultImageSrc =
    "/assets/hero-images/reeves-flower-uniform-background.jpg";
  const defaultImageSrcSet = [
    "/assets/hero-images/reeves-flower-uniform-background_250x.jpg 250w",
    "/assets/hero-images/reeves-flower-uniform-background_500x.jpg 500w",
    "/assets/hero-images/reeves-flower-uniform-background_750x.jpg 750w",
    "/assets/hero-images/reeves-flower-uniform-background_1000x.jpg 1000w",
    "/assets/hero-images/reeves-flower-uniform-background_2000x.jpg 2000w",
    "/assets/hero-images/reeves-flower-uniform-background_4000x.jpg 4000w",
  ].join(", ");

  export let backgroundColor = defaultBackgroundColor;
  export let imageSrc = defaultImageSrc;
  export let imageSrcSet = "";
  export let addNoise = true;
  export let addVibeOverlay = true;

  if (!imageSrcSet && imageSrc === defaultImageSrc) {
    imageSrcSet = defaultImageSrcSet;
  }
</script>

<section id="hero" style="--background-color: {backgroundColor}">
  <img alt="hero" srcset={imageSrcSet} src={imageSrc} />
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
    filter: drop-shadow(1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px 1px 0px var(--gray-mid-darker))
      drop-shadow(-1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px -1px 0px var(--gray-mid-darker));
    z-index: 20;
  }
</style>
