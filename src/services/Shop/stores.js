import { writable, derived } from "svelte/store";

export class CartEntry {
  variantId;
  quantity;

  constructor(variantId, quantity) {
    this.variantId = variantId;
    this.quantity = quantity;
  }
}

export const cart = (() => {
  let { subscribe, set, update } = writable([]); // CartEntry[]

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
  };
})();

export const cartQuantity = derived(cart, ($cart) =>
  $cart.reduce((prev, cur) => prev + cur.quantity, 0)
);
