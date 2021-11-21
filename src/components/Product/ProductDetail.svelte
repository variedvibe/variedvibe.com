<script>
  import Lightbox from "/src/components/Lightbox/Lightbox.svelte";
  import { ProductSelectedOption } from "/src/services/Shop/product.js";
  import { CartEntry, cart } from "/src/services/Shop/stores.js";

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

  let selectedVariant;

  $: displayVariant = selectedVariant ?? product.variants[0];

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
  }

  function invalid(event) {
    event.target.classList.add("error");
  }

  function submit(event) {
    event.preventDefault();

    const form = event.target;

    const quantity = form.elements.quantity.valueAsNumber;

    cart.add(new CartEntry(selectedVariant.id, quantity));
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
        width={image.width}
        height={image.height}
        on:click={lightbox.toggleShow(i)}
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
          {displayVariant.price.format("en-US") ?? "$--"}
        </dd>
      </dl>
      <form on:submit={submit} on:invalid|capture={invalid}>
        {#each product.options as option}
          <span class="form-element product-option">
            <label class="visually-hidden" for={option.name}
              >{option.name}</label
            >
            <select name={option.name} on:change={changeOption} required>
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
            value="Add To Cart"
            title="Coming Soon..."
            disabled
          />
        </span>
        <span class="coming-soon">Online orders coming soon...</span>
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
    margin-left: 20px;
  }
  form .add-to-cart input[type="submit"] {
    width: 100%;
  }
  .coming-soon {
    flex: 1 1 100%;
    margin-top: 10px;
    text-align: center;
    font-style: italic;
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
