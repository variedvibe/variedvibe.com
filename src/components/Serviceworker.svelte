<script>
  /**
   * This file handles serviceworker registration
   * For configuring the serviceworker, refer to sw.js
   */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      if (import.meta.env.DEV) {
        console.debug("In dev mode. Skipping service worker registration.");
        return;
      }

      import("workbox-window").then(async ({ Workbox }) => {
        const wb = new Workbox("/sw.generated.js");
        await wb.register();

        // Reload the page if the PWA has been updated. Change strategy if needed.
        wb.addEventListener("redundant", () => {
          location.reload();
          console.log("updated app");
        });
      });
    });
  }
</script>
