export class Product {
  id;
  slug;
  name;
  description;
  images = [];

  constructor(id, slug, name, description, images) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.images = images;
  }
}

export class ProductImage {
  id;
  src;
  altText;

  constructor(id, src, altText) {
    this.id = id;
    this.src = src;
    this.altText = altText;
  }
}
