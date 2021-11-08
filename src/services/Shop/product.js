export class Product {
  id;
  slug;
  name;
  description;
  descriptionHtml;
  images = [];
  options = [];
  variants = [];

  constructor(
    id,
    slug,
    name,
    description,
    descriptionHtml,
    images,
    options,
    variants
  ) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.descriptionHtml = descriptionHtml;
    this.images = images;
    this.options = options;
    this.variants = variants;
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

export class ProductPrice {
  amount;
  currencyCode;

  constructor(amount, currencyCode) {
    this.amount = amount;
    this.currencyCode = currencyCode;
  }
}

export class ProductSelectedOption {
  name;
  value;

  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

export class ProductVariant {
  id;
  name;
  image;
  price;
  selectedOptions = [];

  constructor(id, name, image, price, selectedOptions) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.selectedOptions = selectedOptions;
  }
}
