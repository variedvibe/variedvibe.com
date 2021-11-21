<script>
  import { url } from "@roxi/routify";
</script>

<ul class="nav-icons">
  <li>
    <a class="ui-action ui-icon shopping-cart" title="Coming soon..." href>
      <i><u class="visually-hidden">Shopping Cart</u></i>
    </a>
  </li>
  <li>
    <a
      class="ui-action ui-icon contact-us"
      title="Contact Us"
      href={$url("/contact-us")}
    >
      <i><u class="visually-hidden">Contact Us</u></i>
    </a>
  </li>
</ul>

<style>
  ul.nav-icons {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 1;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  li {
    flex: 1;
    display: block;
    padding: 0;
    margin: 0 8px;
    text-align: center;
  }
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
  @media (max-width: 800px) {
    li:last-child {
      margin-right: 16px;
    }
  }
  .ui-icon.shopping-cart {
    background-image: url("/assets/ui-icons/shopping-bag.svg");
    filter: invert(0.5);
  }
  .ui-icon.contact-us {
    background-image: url("/assets/ui-icons/email.svg");
    filter: invert(1);
  }
</style>
