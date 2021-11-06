<script>
  import Hero from "/src/components/Hero/Hero.svelte";
</script>

<Hero />

<div class="container page-width-wrapper">
  <section class="main">
    <h2>About Us</h2>

    <p>
      Founded in Denver, Colorado, in 2021, three friends came up with the idea
      to create something fresh and new just for you.
    </p>
    <p />
    <p>
      Inspired by the natural world, modern events, and literally whatever one
      asshole said to the other over a glass of bourbon, we decided that this
      brand needed to come to life.
    </p>
    <p>
      So, here we are, with our first season of apparel, and many more to come.
      We hope you vibe with us, and stay tuned.
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
          title="Instagram - Aurora Photo"
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/auroraprophoto/"
          >Aurora Adams; <em>Model Photography</em></a
        >
      </li>
      <li>Our various models; <em>friends and partners in style</em></li>
      <li>Denver; <em>the life and inspiration</em></li>
    </ul>
  </section>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  section,
  hr {
    max-width: 500px;
    margin: 0 5%;
  }
  hr {
    width: 90%;
    margin: 25px 5%;
  }
  section p {
    text-align: justify;
  }
  .main p {
    font-size: var(--important-font-size);
  }
  .thanks-list {
    text-align: left;
  }
  .thanks-list a {
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-color: var(--gray-mid);
    text-underline-offset: 0.1em;
  }
  .thanks-list em {
    color: var(--gray-mid);
  }
</style>
