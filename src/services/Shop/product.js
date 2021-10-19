export class Product {
  id;
  slug;
  name;
  description;
  descriptionHtml;
  images = [];

  constructor(id, slug, name, description, descriptionHtml, images) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.descriptionHtml = descriptionHtml;
    this.images = images;
  }
}

export class ProductImage {
  id;
  src;
  altText;
  srcSet;

  constructor(id, src, altText, srcSet) {
    this.id = id;
    this.src = src;
    this.altText = altText;
    this.srcSet = srcSet;
  }
}
