<script>
  import { url } from "@roxi/routify";

  import SocialLinks from "/src/components/SocialLinks/SocialLinks.svelte";
</script>

<footer>
  <div class="page-width-wrapper">
    <nav id="bottom-social-links">
      <SocialLinks inFooter="true" />
    </nav>
    <nav id="bottom-legal-links">
      <ul>
        <li><a href={$url("/sales-policies")}>Sales and Refunds</a></li>
      </ul>
    </nav>
    <span>Copyright © 2021 Varied Vibe.</span>
  </div>
</footer>

<style>
  footer {
    --color: var(--gray-mid-dark);

    display: block;
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px 0;
    text-align: center;
    font-size: var(--small-font-size);
    color: var(--color);
  }

  footer a:link,
  footer a:visited {
    color: var(--color);
  }
  footer a:hover {
    color: var(--gray-mid);
  }
  @media (hover: none) {
    /* Reset normal hover effects, so mobile doesn't try and show them */
    footer a:hover {
      color: var(--color);
    }
  }
  footer a:active {
    color: var(--gray-mid-darker);
  }

  #bottom-social-links {
    margin: 10px auto;
  }
  #bottom-legal-links {
    margin: 10px auto;
  }
  #bottom-legal-links ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 1;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  #bottom-legal-links li {
    display: block;
    padding: 0;
    margin: 0 10px;
    text-align: center;
  }
  #bottom-legal-links li:first-child {
    margin-left: 0;
  }
  #bottom-legal-links li:last-child {
    margin-right: 0;
  }
</style>
