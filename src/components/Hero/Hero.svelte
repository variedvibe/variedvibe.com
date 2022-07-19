<script>
  const defaultBackgroundColor = "#e8e9ed"; // Hard-coded to match the image
  const defaultHeight = 420;
  const defaultImageSrc =
    "/assets/hero-images/pops-tee-uniform-background-crop.jpg";
  const defaultImageSrcSet = [
    "/assets/hero-images/pops-tee-uniform-background-crop_250x.jpg 250w",
    "/assets/hero-images/pops-tee-uniform-background-crop_500x.jpg 500w",
    "/assets/hero-images/pops-tee-uniform-background-crop_750x.jpg 750w",
    "/assets/hero-images/pops-tee-uniform-background-crop_1000x.jpg 1000w",
    /*"/assets/hero-images/pops-tee-uniform-background-crop_2000x.jpg 2000w",*/
    /*"/assets/hero-images/pops-tee-uniform-background-crop_4000x.jpg 4000w",*/
  ].join(", ");

  export let backgroundColor = defaultBackgroundColor;
  export let height = defaultHeight;
  export let imageSrc = defaultImageSrc;
  export let imageSrcSet = "";
  export let addNoise = true;
  export let addVibeOverlay = false;
  export let addLogoOverlay = true;

  if (!imageSrcSet && imageSrc === defaultImageSrc) {
    imageSrcSet = defaultImageSrcSet;
  }
</script>

<section
  id="hero"
  style="--background-color: {backgroundColor}; --height: min({height}px, var(--max-hero-height));"
>
  <img
    alt="hero"
    src={imageSrc}
    srcset={imageSrcSet}
    sizes="max(100vw, min({height}px, var(--max-hero-height)))"
    {height}
  />
  {#if addNoise}
    <div id="noise-filter" class="overlay" />
  {/if}
  {#if addVibeOverlay}
    <div id="vibe-overlay" class="overlay" />
  {/if}
  {#if addLogoOverlay}
    <div id="logo-overlay" class="overlay" />
  {/if}
</section>

<style>
  #hero {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;
    height: var(--height);
    max-height: var(--max-hero-height);
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
    object-fit: contain;
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
    -webkit-backdrop-filter: contrast(0.85);
    filter: drop-shadow(1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px 1px 0px var(--gray-mid-darker))
      drop-shadow(-1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px -1px 0px var(--gray-mid-darker));
    z-index: 20;
  }
  #logo-overlay {
    background-image: url("/assets/mark-black.svg");
    background-repeat: no-repeat;
    background-position: 20px 10px;
    background-size: 100px;
    backdrop-filter: contrast(0.85);
    -webkit-backdrop-filter: contrast(0.85);
    filter: drop-shadow(1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px 1px 0px var(--gray-mid-darker))
      drop-shadow(-1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px -1px 0px var(--gray-mid-darker));
    z-index: 20;
  }
</style>
