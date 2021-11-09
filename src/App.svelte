<script>
  import { Router } from "@roxi/routify";
  import { routes } from "/.routify/routes";

  import { GoogleAnalytics } from "@beyonk/svelte-google-analytics";

  import Serviceworker from "/src/components/Serviceworker.svelte";

  import "./global.css"; // Global styles

  const googleAnalyticsId = "G-9TWM0P60LB";
</script>

<Router {routes} />
<GoogleAnalytics properties={[googleAnalyticsId]} />
<Serviceworker />
