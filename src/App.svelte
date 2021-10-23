<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  import Serviceworker from "./components/Serviceworker.svelte";

  import _ from "./global.css"; // Global styles
</script>

<Router {routes} />
<Serviceworker />
