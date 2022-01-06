import type { Price } from "./price";
import { Gid } from "./gid";

export class Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  descriptionHtml: string;
  images: ProductImage[] = [];
  options: ProductOption[] = [];
  variants: ProductVariant[] = [];
  isForSale = false;

  constructor(
    id: string,
    slug: string,
    name: string,
    description: string,
    descriptionHtml: string,
    images = [],
    options = [],
    variants = [],
    isForSale = false,
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

  get gid(): Gid {
    return Gid.parse(atob(this.id));
  }

  getImageForPresentation(): ProductImage | null {
    // The first image should be the image used for main "presentational"
    // purposes. It's usually a photo of the product on a model or other
    // "presented" manner. This image is less about showing the details of the
    // product itself, and more about showing it off via a "look".
    return this.images[0] ?? null;
  }

  getImageForSummary(fallback = true): ProductImage | null {
    // The second image should be the image used for a "summary" view purposes.
    // This image is usually a photo of the product in its entirety, intended to
    // show the whole product, but not necessarily via a "look" or in close
    // detail.
    let image = this.images[1];

    if (!image && fallback) {
      image = this.images[0];
    }

    return image ?? null;
  }

  getOptionForId(optionId: string): ProductOption | undefined {
    return this.options.find((option) => option.id === optionId);
  }

  getVariantForId(variantId: string): ProductVariant | undefined {
    return this.variants.find((variant) => variant.id === variantId);
  }

  getVariantForSelectedOptions(
    selectedOptions: ProductSelectedOption[],
  ): ProductVariant | undefined {
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

  isAvailableForSale(): boolean {
    return (
      this.isForSale && this.variants.some((variant) => variant.isAvailable)
    );
  }
}

export class ProductImage {
  id: string;
  src: string;
  width: number;
  height: number;
  altText: string;
  srcSet: string;

  constructor(
    id: string,
    src: string,
    width: number,
    height: number,
    altText: string,
    srcSet: string,
  ) {
    this.id = id;
    this.src = src;
    this.width = width;
    this.height = height;
    this.altText = altText;
    this.srcSet = srcSet;
  }

  get gid(): Gid {
    return Gid.parse(atob(this.id));
  }
}

export class ProductOption {
  id: string;
  name: string;
  values: string[] = [];

  constructor(
    id: string,
    name: string,
    values = [],
  ) {
    this.id = id;
    this.name = name;
    this.values = values;
  }

  get gid(): Gid {
    return Gid.parse(atob(this.id));
  }
}

export class ProductSelectedOption {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  isEqual(other: this): boolean {
    return this.name === other.name && this.value === other.value;
  }
}

export class ProductVariant {
  id: string;
  name: string;
  image: ProductImage | null;
  price: Price;
  selectedOptions: ProductSelectedOption[] = [];
  isAvailable = false;

  constructor(
    id: string,
    name: string,
    image: ProductImage | null,
    price: Price,
    selectedOptions = [],
    isAvailable = false,
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.selectedOptions = selectedOptions;
    this.isAvailable = isAvailable;
  }

  get gid(): Gid {
    return Gid.parse(atob(this.id));
  }
}
