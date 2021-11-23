export class Product {
  id;
  slug;
  name;
  description;
  descriptionHtml;
  images = [];
  options = [];
  variants = [];
  isForSale = false;

  constructor(
    id,
    slug,
    name,
    description,
    descriptionHtml,
    images,
    options,
    variants,
    isForSale
  ) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.descriptionHtml = descriptionHtml;
    this.images = images;
    this.options = options;
    this.variants = variants;
    this.isForSale = isForSale;
  }

  getVariantForSelectedOptions(selectedOptions) {
    return this.variants.find((variant) => {
      return (
        variant.selectedOptions.every((option) =>
          selectedOptions.some((other) => option.isEqual(other))
        ) &&
        selectedOptions.every((option) =>
          variant.selectedOptions.some((other) => option.isEqual(other))
        )
      );
    });
  }

  isAvailableForSale() {
    return (
      this.isForSale && this.variants.some((variant) => variant.isAvailable)
    );
  }
}

export class ProductImage {
  id;
  src;
  width;
  height;
  altText;
  srcSet;

  constructor(id, src, width, height, altText, srcSet) {
    this.id = id;
    this.src = src;
    this.width = width;
    this.height = height;
    this.altText = altText;
    this.srcSet = srcSet;
  }
}

export class ProductOption {
  id;
  name;
  values = [];

  constructor(id, name, values) {
    this.id = id;
    this.name = name;
    this.values = values;
  }
}

export class ProductSelectedOption {
  name;
  value;

  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  valueOf() {
    return { name: this.name, value: this.value };
  }

  isEqual(other) {
    return this.name === other.name && this.value === other.value;
  }
}

export class ProductVariant {
  id;
  name;
  image;
  price;
  selectedOptions = [];
  isAvailable = false;

  constructor(id, name, image, price, selectedOptions, isAvailable) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.selectedOptions = selectedOptions;
    this.isAvailable = isAvailable;
  }
}
