let allProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "Product 1 description here.",
    images: [""],
  },
  {
    id: 2,
    name: "Product 2",
    description: "Product 2 description here.",
    images: [""],
  },
  {
    id: 3,
    name: "Product 3",
    description: "Product 3 description here.",
    images: [""],
  },
  {
    id: 4,
    name: "Product 4",
    description: "Product 4 description here.",
    images: [""],
  },
  {
    id: 5,
    name: "Product 5",
    description: "Product 5 description here.",
    images: [""],
  },
];

let featuredProducts = allProducts.slice(0, 3);

export async function getAllProducts() {
  return allProducts;
}

export async function getFeaturedProducts() {
  return featuredProducts;
}

export async function getProduct(id) {
  let product = allProducts.find((product) => product.id === id);

  if (!product) {
    throw new Error("unknown product");
  }

  return product;
}
