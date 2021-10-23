<script>
  export let inFooter = false;

  let getClass = () => (inFooter ? "in-footer" : "");
</script>

<ul class={getClass()}>
  <li>
    <a
      class="social-icon icon-instagram"
      title="Instagram - Varied Vibe."
      target="_blank"
      rel="noopener"
      href="https://www.instagram.com/variedvibe/"
    >
      <i><u class="visually-hidden">Instagram - Varied Vibe.</u></i>
    </a>
  </li>
  <li>
    <a
      class="social-icon icon-twitter"
      title="Twitter - Varied Vibe."
      target="_blank"
      rel="noopener"
      href="https://twitter.com/VariedVibe"
    >
      <i><u class="visually-hidden">Twitter - Varied Vibe.</u></i>
    </a>
  </li>
  <li>
    <a
      class="social-icon icon-facebook"
      title="Facebook - Varied Vibe."
      target="_blank"
      rel="noopener"
      href="https://www.facebook.com/VariedVibe/"
    >
      <i><u class="visually-hidden">Facebook - Varied Vibe.</u></i>
    </a>
  </li>
  <li>
    <a
      class="social-icon icon-github"
      title="GitHub - Varied Vibe."
      target="_blank"
      rel="noopener"
      href="https://github.com/variedvibe"
    >
      <i><u class="visually-hidden">GitHub - Varied Vibe.</u></i>
    </a>
  </li>
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    flex: 1;
    display: inline-block;
    padding: 0;
    margin: 0 5px;
  }
  .in-footer li {
    margin: 0 8px;
  }
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }

  a.social-icon {
    display: block;
    width: 20px;
    height: 20px;
    text-decoration: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: invert(100%) brightness(100%);
    transition: filter var(--animation-speed-normal)
      var(--animation-timing-function-natural);
  }
  .in-footer a.social-icon {
    filter: invert(100%) brightness(33.33%);
  }
  a.social-icon:hover {
    filter: invert(100%) brightness(47.5%);
  }
  @media (hover: none) {
    /* Reset normal hover effects, so mobile doesn't try and show them */
    a.social-icon:hover {
      filter: invert(100%) brightness(33.33%);
    }
  }

  a.social-icon.icon-instagram {
    background-image: url("/assets/social-icons/instagram.svg");
  }
  a.social-icon.icon-twitter {
    background-image: url("/assets/social-icons/twitter.svg");
  }
  a.social-icon.icon-facebook {
    background-image: url("/assets/social-icons/facebook.svg");
  }
  a.social-icon.icon-github {
    background-image: url("/assets/social-icons/github.svg");
  }
</style>
