import { writable, derived } from "svelte/store";

const localStorageKeyCart = "vv-cart";

export class CartEntry {
  variantId;
  quantity;

  constructor(variantId, quantity) {
    this.variantId = variantId;
    this.quantity = quantity;
  }
}

export const cart = (() => {
  let stored = JSON.parse(localStorage.getItem(localStorageKeyCart));

  let { subscribe, set, update } = writable(stored ?? []); // CartEntry[]

  subscribe((entries) =>
    localStorage.setItem(localStorageKeyCart, JSON.stringify(entries))
  );

  return {
    subscribe,
    add: (cartEntry) => update((entries) => [...entries, cartEntry]),
    remove: (cartEntry) =>
      update((entries) => {
        let idxEntryToRemove = entries.findIndex(
          (existing) => existing.variantId === cartEntry.variantId
        );

        entries.splice(idxEntryToRemove, 1);

        return entries;
      }),
    clear: () => set([]),
  };
})();

export const cartQuantity = derived(cart, ($cart) =>
  $cart.reduce((prev, cur) => prev + cur.quantity, 0)
);
