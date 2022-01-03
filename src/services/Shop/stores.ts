import { derived, writable } from "svelte/store";
import { CartEntry } from "./cart";

const eventListenerKeyStorage = "storage";

const localStorageKeyCheckoutId = "vv:checkout-id";
const localStorageKeyCart = "vv:cart";

export const checkoutId = (() => {
  const stored: string | null = localStorage.getItem(localStorageKeyCheckoutId);

  const { subscribe, set } = writable(stored, (set): (() => void) => {
    const storageEventHandler = (event: StorageEvent): void => {
      if (event.key === localStorageKeyCheckoutId) {
        set(event.newValue);
      }
    };

    window.addEventListener(eventListenerKeyStorage, storageEventHandler);

    return () =>
      window.removeEventListener(eventListenerKeyStorage, storageEventHandler);
  });

  subscribe((id: string | null): void =>
    id
      ? localStorage.setItem(localStorageKeyCheckoutId, id)
      : localStorage.removeItem(localStorageKeyCheckoutId)
  );

  return {
    subscribe,
    set,

    clear: (): void => set(null),
  };
})();

export const cart = (() => {
  const stored = fetchStoredCart();

  const { subscribe, set, update } = writable(
    stored ?? [],
    (set): (() => void) => {
      const storageEventHandler = (event: StorageEvent): void => {
        if (event.key === localStorageKeyCart) {
          const stored = fetchStoredCart(event.newValue);

          if (stored) {
            set(stored);
          }
        }
      };

      window.addEventListener(eventListenerKeyStorage, storageEventHandler);

      return () =>
        window.removeEventListener(
          eventListenerKeyStorage,
          storageEventHandler,
        );
    },
  );

  subscribe((entries: CartEntry[]): void =>
    localStorage.setItem(localStorageKeyCart, JSON.stringify(entries))
  );

  return {
    subscribe,
    set,

    add: (cartEntry: CartEntry): void =>
      update((entries: CartEntry[]): CartEntry[] => {
        const existing = entries.find((existing) =>
          existing.isSameProductVariant(cartEntry)
        );

        if (existing) {
          existing.addQuantity(cartEntry.quantity);

          return entries;
        }

        return [...entries, cartEntry];
      }),

    remove: (cartEntry: CartEntry): void =>
      update((entries: CartEntry[]): CartEntry[] => {
        const idxEntryToRemove = entries.findIndex((existing) =>
          existing.isSameProductVariant(cartEntry)
        );

        if (idxEntryToRemove > -1) {
          entries.splice(idxEntryToRemove, 1);
        }

        return entries;
      }),

    clear: (): void => set([]),
  };
})();

export const cartQuantity = derived(
  cart,
  ($cart) => $cart.reduce((prev, cur) => prev + cur.quantity, 0),
);

function fetchStoredCart(rawStored?: string | null): CartEntry[] | null {
  rawStored = rawStored ?? localStorage.getItem(localStorageKeyCart);

  if (!rawStored) {
    return null;
  }

  const parsed = JSON.parse(rawStored);

  if (Array.isArray(parsed)) {
    const partial = parsed as Readonly<Partial<CartEntry>>[];

    return partial.map((storedEntry) => {
      const cartEntry = new CartEntry(
        storedEntry.productId ?? "",
        storedEntry.productSlug ?? "",
        storedEntry.variantId ?? "",
        storedEntry.quantity ?? 0,
      );

      return Object.assign(cartEntry, storedEntry);
    });
  }

  return null;
}
