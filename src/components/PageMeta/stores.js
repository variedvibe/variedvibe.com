import { writable } from "svelte/store";

//export const pageMeta = (initialData) => writable({ ...initialData });
export const pageMeta = writable({
  title: null,
  description: null,
  type: null,
  url: null,
  image: null,
});
