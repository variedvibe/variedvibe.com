<script>
  import Hero from "../../components/Hero/Hero.svelte";
</script>

<Hero />

<div class="page-width-wrapper">
  <div class="container">
    <h1>About Us</h1>

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
  </div>
</div>

<style>
  .container {
    margin: 20px 0px;
    text-align: center;
  }
  p {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 5%;
    font-size: var(--important-font-size);
    text-align: justify;
  }
</style>
