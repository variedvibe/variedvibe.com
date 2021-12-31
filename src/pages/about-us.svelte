<script>
  import Hero from "/src/components/Hero/Hero.svelte";
</script>

<!-- routify:options title="About Us" -->
<!-- routify:options index=1000 -->

<Hero />

<div class="container page-width-wrapper">
  <div class="content-width-wrapper">
    <section class="main">
      <h2>About Us</h2>

      <p>
        Founded in Denver, Colorado, in 2021, three friends came up with the
        idea to create something fresh and new just for you.
      </p>
      <p />
      <p>
        Inspired by the natural world, modern events, and literally whatever one
        asshole said to the other over a glass of bourbon, we decided that this
        brand needed to come to life.
      </p>
      <p>
        So, here we are, with our first season of apparel, and many more to
        come. We hope you vibe with us, and stay tuned.
      </p>
    </section>
    <hr />
    <section>
      <h3>Special Thanks</h3>

      <p>
        Varied Vibe. wouldn't exist today without the help of our friends and
        parners. With that said, we'd like to give a special thanks to the
        following people.
      </p>

      <ul class="thanks-list">
        <li>
          <a
            class="content-link"
            title="Instagram - Aurora Adams"
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/fatesphoto/"
            >Aurora Adams; <em>model photography</em></a
          >
        </li>
        <li>Our various models; <em>friends and partners in style</em></li>
        <li>Denver; <em>the life and inspiration</em></li>
      </ul>
    </section>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content-width-wrapper {
    max-width: var(--max-central-content-width);
    margin: 0 var(--content-horizontal-margin);
  }
  h2,
  h3 {
    text-align: center;
  }
  section p {
    text-align: justify;
  }
  .main p {
    font-size: var(--important-font-size);
  }
</style>
