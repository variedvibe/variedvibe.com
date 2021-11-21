<script>
  import { url } from "@roxi/routify";
  import { cartQuantity } from "/src/services/Shop/stores.js";
</script>

<ul class="nav-icons">
  <li>
    <a class="ui-action shopping-cart" title="Coming soon..." href>
      <i><u class="visually-hidden">Shopping Cart</u></i>

      <span class="ui-icon" />
      <span class="ui-icon-badge" class:hidden={$cartQuantity < 1}
        >{$cartQuantity}</span
      >
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

  .ui-action {
    display: block;
    position: relative;
  }
  .ui-icon {
    filter: invert(100%);
    transition: filter var(--animation-speed-normal)
      var(--animation-timing-function-natural);
  }
  .ui-icon:hover {
    filter: invert(100%) brightness(47.5%);
  }
  @media (hover: none) {
    /* Reset normal hover effects, so mobile doesn't try and show them */
    .ui-icon:hover {
      filter: invert(100%);
    }
  }

  .ui-action.contact-us {
    background-image: url("/assets/ui-icons/email.svg");
  }

  .ui-action.shopping-cart .ui-icon {
    background-image: url("/assets/ui-icons/shopping-bag.svg");
    filter: invert(0.5);
  }
  .ui-icon-badge {
    background-color: var(--white);
    color: var(--black);
  }
</style>
