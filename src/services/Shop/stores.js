import { writable, derived } from "svelte/store";
import { CartEntry } from "./cart.js";

const eventListenerKeyStorage = "storage";

const localStorageKeyCheckoutId = "vv:checkout-id";
const localStorageKeyCart = "vv:cart";

export const checkoutId = (() => {
  let stored = localStorage.getItem(localStorageKeyCheckoutId); // string

  let { subscribe, set } = writable(stored, (set) => {
    const storageEventHandler = (event) => {
      if (event.key === localStorageKeyCheckoutId) {
        set(event.newValue);
      }
    };

    window.addEventListener(eventListenerKeyStorage, storageEventHandler);

    return () =>
      window.removeEventListener(eventListenerKeyStorage, storageEventHandler);
  });

  subscribe((id) =>
    id
      ? localStorage.setItem(localStorageKeyCheckoutId, id)
      : localStorage.removeItem(localStorageKeyCheckoutId)
  );

  return {
    subscribe,
    set,

    clear: () => set(null),
  };
})();

export const cart = (() => {
  let stored = fetchStoredCart(); // CartEntry[]

  let { subscribe, set, update } = writable(stored ?? [], (set) => {
    const storageEventHandler = (event) => {
      if (event.key === localStorageKeyCart) {
        set(fetchStoredCart(event.newValue));
      }
    };

    window.addEventListener(eventListenerKeyStorage, storageEventHandler);

    return () =>
      window.removeEventListener(eventListenerKeyStorage, storageEventHandler);
  });

  subscribe((entries) =>
    localStorage.setItem(localStorageKeyCart, JSON.stringify(entries))
  );

  return {
    subscribe,
    set,

    add: (cartEntry) =>
      update((entries) => {
        let existing = entries.find((existing) =>
          existing.isSameProductVariant(cartEntry)
        );

        if (existing) {
          existing.addQuantity(cartEntry.quantity);

          return entries;
        }

        return [...entries, cartEntry];
      }),

    remove: (cartEntry) =>
      update((entries) => {
        let idxEntryToRemove = entries.findIndex((existing) =>
          existing.isSameProductVariant(cartEntry)
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

function fetchStoredCart(rawStored) {
  let stored = JSON.parse(
    rawStored ?? localStorage.getItem(localStorageKeyCart)
  );

  if (stored) {
    stored = stored.map((storedEntry) =>
      Object.assign(new CartEntry(), storedEntry)
    );
  }

  return stored;
}
