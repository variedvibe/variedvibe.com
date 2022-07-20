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
  ].join(", ");
  const altImages = {
    "/assets/hero-images/three-graces-tee-uniform-background-crop.jpg": [
      "/assets/hero-images/three-graces-tee-uniform-background-crop_250x.jpg 250w",
      "/assets/hero-images/three-graces-tee-uniform-background-crop_500x.jpg 500w",
      "/assets/hero-images/three-graces-tee-uniform-background-crop_750x.jpg 750w",
      "/assets/hero-images/three-graces-tee-uniform-background-crop_1000x.jpg 1000w",
    ].join(", "),
    /*"/assets/hero-images/reeves-flower-uniform-background.jpg": [*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_250x.jpg 250w",*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_500x.jpg 500w",*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_750x.jpg 750w",*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_1000x.jpg 1000w",*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_2000x.jpg 2000w",*/
    /*  "/assets/hero-images/reeves-flower-uniform-background_4000x.jpg 4000w",*/
    /*].join(", "),*/
  };

  export let backgroundColor = defaultBackgroundColor;
  export let height = defaultHeight;
  export let imageSrc = defaultImageSrc;
  export let imageSrcSet = "";
  export let useAltImages = true;
  export let imageDisplaySeconds = 4.5;
  export let imageFadeSeconds = 0.5;
  export let addNoise = true;
  export let addVibeOverlay = false;
  export let addLogoOverlay = true;

  const totalImageCount = 1 + Object.keys(altImages).length; // Main + Alt images
  const animationDuration =
    (imageDisplaySeconds + imageFadeSeconds) * totalImageCount;
  const animationDelay = imageDisplaySeconds + imageFadeSeconds;

  // Calculate the keyframe percentages for the animation.
  /*const animationKeyframePercentages = [*/
  /*  (imageDisplaySeconds / animationDuration) * 100,*/
  /*  ((imageDisplaySeconds + imageFadeSeconds) / animationDuration) * 100,*/
  /*  100 - (imageFadeSeconds / animationDuration) * 100,*/
  /*];*/
  /*console.log(animationKeyframePercentages);*/

  if (!imageSrcSet && imageSrc === defaultImageSrc) {
    imageSrcSet = defaultImageSrcSet;
  }
</script>

<section
  id="hero"
  style="--background-color: {backgroundColor}; --height: min({height}px, var(--max-hero-height)); --animation-duration: {animationDuration}s;"
>
  <img
    class:main-image={useAltImages}
    alt="hero"
    src={imageSrc}
    srcset={imageSrcSet}
    sizes="max(100vw, min({height}px, var(--max-hero-height)))"
    {height}
  />
  {#if useAltImages}
    {#each Object.entries(altImages) as [src, srcSet], i}
      <img
        class="alt-image"
        alt="hero"
        {src}
        srcset={srcSet}
        sizes="max(100vw, min({height}px, var(--max-hero-height)))"
        {height}
        data-alt-image-number={i + 1}
        style="animation-delay: {(i + 1) * animationDelay}s"
      />
    {/each}
  {/if}
  {#if addNoise}
    <div id="noise-filter" class="overlay" />
  {/if}
  {#if addVibeOverlay}
    <div id="vibe-overlay" class="overlay" />
  {/if}
  {#if addLogoOverlay}
    <div id="logo-overlay" class="overlay">
      <div class="page-width-wrapper">
        <img alt="Varied Vibe. Mark" src="/assets/mark-black.svg" width="100" />
      </div>
    </div>
  {/if}
</section>

<style>
  /* These percentages unfortunately need to be hard-coded for timing... */
  @keyframes opacity {
    0%,
    45% {
      opacity: 1;
    }
    50%,
    95% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

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
  #hero img.main-image,
  #hero img.alt-image {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: 0;
    animation: opacity var(--animation-duration);
    animation-delay: 0s;
    animation-timing-function: var(--animation-timing-function-natural);
    animation-iteration-count: infinite;
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
    backdrop-filter: contrast(0.85);
    -webkit-backdrop-filter: contrast(0.85);
    z-index: 20;
  }
  #logo-overlay img {
    filter: drop-shadow(1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px 1px 0px var(--gray-mid-darker))
      drop-shadow(-1px 0px 0px var(--gray-mid-darker))
      drop-shadow(0px -1px 0px var(--gray-mid-darker));
  }
</style>
