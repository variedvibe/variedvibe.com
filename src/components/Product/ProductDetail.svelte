<script>
  import { url } from "@roxi/routify";

  import Lightbox from "/src/components/Lightbox/Lightbox.svelte";
  import {
    messageErrorGeneric,
    messageErrorInvalidForm,
  } from "/src/components/StatusMessage/StatusMessage.svelte";
  import { ProductSelectedOption } from "/src/services/Shop/product.js";
  import { CartEntry } from "/src/services/Shop/cart.js";
  import { cart } from "/src/services/Shop/stores.js";

  const errorSlugInvalidForm = "ERR_INVALID_FORM";
  const FormStatuses = Object.freeze({
    AddedToCart: 1,
    ItemUnavailable: 2,

    Unknown: undefined,
  });

  export let product;

  let lightboxImages = product.images.map((image) => ({
    src: image.src,
    altText: image.altText,
    title: product.name,
    srcSet: image.srcSet,
  }));

  let lightbox;

  let selectedOptions = product.options.map(
    (option) => new ProductSelectedOption(option.name, null)
  );

  let selectedVariant = product.variants[0];

  let formStatus;

  function changeOption(event) {
    const selected = new ProductSelectedOption(
      event.target.name,
      event.target.value || null
    );

    const selectedIndex = selectedOptions.findIndex(
      (option) => option.name === selected.name
    );

    selectedOptions[selectedIndex] = selected;
    selectedVariant = product.getVariantForSelectedOptions(selectedOptions);

    if (!selectedVariant.isAvailable) {
      formStatus = FormStatuses.ItemUnavailable;
    }
  }

  function invalid(event) {
    event.target.classList.add("error");
    formStatus = new Error(errorSlugInvalidForm);
  }

  function formInput() {
    formStatus = null;
  }

  function submit(event) {
    event.preventDefault();

    const form = event.target;

    for (const element of form.elements) {
      element.classList.remove("error");
    }

    const quantity = form.elements.quantity.valueAsNumber;

    cart.add(
      new CartEntry(product.id, product.slug, selectedVariant.id, quantity)
    );

    formStatus = FormStatuses.AddedToCart;
    form.reset();
  }
</script>

<div class="product">
  <h2 class="mobile-header">{product.name}</h2>
  <div class="media">
    {#each product.images as image, i}
      <img
        alt={image.altText ?? product.name}
        title={product.name}
        src={image.src}
        srcset={image.srcSet}
        sizes="(min-width: 600px) 25vw, 50vw"
        width={image.width}
        height={image.height}
        on:click={lightbox.toggleShow(i, true)}
      />
    {/each}
  </div>
  <div class="details">
    <h2>{product.name}</h2>
    <p>{@html product.descriptionHtml}</p>
    <hr />
    <div class="shop-sheet">
      <dl>
        <dt>Price</dt>
        <dd class="strong">
          {selectedVariant.price.format("en-US") ?? "$--"}
        </dd>
      </dl>
      <form
        method="POST"
        on:submit={submit}
        on:invalid|capture={invalid}
        on:input={formInput}
      >
        {#each product.options as option}
          <span class="form-element product-option">
            <label class="visually-hidden" for={option.name}
              >{option.name}</label
            >
            <select
              name={option.name}
              on:change={changeOption}
              autocomplete="off"
              required
            >
              <!-- Placeholder value -->
              <option value="" hidden selected>{option.name}</option>

              {#each option.values as value}
                <option {value}>{value}</option>
              {/each}
            </select>
          </span>
        {/each}
        <span class="form-element product-quantity">
          <label class="visually-hidden" for="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            autocomplete="off"
            min="1"
            max="100"
            value="1"
            required
          />
        </span>
        <span class="form-element add-to-cart">
          <label class="visually-hidden" for="submit">Add To Cart</label>
          <input
            type="submit"
            id="submit"
            name="submit"
            value={selectedVariant.isAvailable ? "Add To Cart" : "Unavailable"}
            title="Coming Soon..."
            disabled={true || !selectedVariant.isAvailable}
          />
        </span>
        <span
          class="form-status status-message"
          class:error={formStatus instanceof Error}
        >
          {#if formStatus instanceof Error}
            {#if formStatus.message == errorSlugInvalidForm}
              {messageErrorInvalidForm}
            {:else}
              {messageErrorGeneric}
            {/if}
          {:else if formStatus === FormStatuses.AddedToCart}
            Item added to <a class="content-link" href={$url("/cart")}>cart</a>!
          {:else if formStatus === FormStatuses.ItemUnavailable}
            Sorry, but this item is currently unavailable. 😞
          {:else}
            <!-- TODO: Remove when no longer "coming soon" -->
            <em>Online orders coming soon...</em>
          {/if}
        </span>
      </form>
    </div>
  </div>
</div>

<Lightbox images={lightboxImages} bind:this={lightbox} />

<style>
  .product {
    display: flex;
    width: auto;
  }
  .product h2 {
    text-align: center;
    margin-top: 0;
  }
  .mobile-header {
    display: none;
  }
  .media {
    flex: 3;
    line-height: 0;
    text-align: left;
    align-items: start;
    margin-top: -10px;
    margin-left: -10px;
  }
  .media img {
    display: inline-block;
    width: calc(50% - 10px);
    height: auto;
    margin-top: 10px;
    margin-left: 10px;
    object-fit: cover;
    background-color: var(--gray-mid);
    vertical-align: top;
    cursor: pointer;
  }
  .details {
    flex: 2;
    margin-left: 20px;
  }
  .details :global(ul) {
    padding-inline-start: 25px;
  }
  .shop-sheet {
    margin: 0 10%;
  }
  dl {
    font-size: 1.1em;
  }
  dd.strong {
    font-size: 1.2em;
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  form .form-element {
    margin: 5px 0;
  }
  form .product-option,
  form select {
    width: 100%;
  }
  form .add-to-cart {
    flex: 1;
    margin-left: 10px;
  }
  form .add-to-cart input[type="submit"] {
    width: 100%;
  }
  .form-status {
    flex: 1 1 100%;
    margin-top: 10px;
    text-align: center;
  }
  @media (max-width: 1050px) {
    .media {
      flex: 2;
    }
    .details {
      flex: 2;
    }
  }
  @media (max-width: 800px) {
    .shop-sheet {
      margin: 0;
    }
  }
  @media (max-width: 600px) {
    .product {
      flex-direction: column;
      align-items: center;
    }
    .mobile-header {
      display: unset;
    }
    .details {
      margin: 0 10px;
    }
    .details h2 {
      display: none;
    }
    .media {
      align-items: center;
      text-align: center;
      margin-top: -5px;
      margin-left: -5px;
    }
    .media img {
      width: calc(50% - 5px);
      margin-top: 5px;
      margin-left: 5px;
    }
  }
</style>
