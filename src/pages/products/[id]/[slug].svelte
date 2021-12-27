<script>
  import { params, goto } from "@roxi/routify";

  const id = $params.id;

  // We use this page as a sort of "alias" URL. Basically a "pretty" URL similar
  // to Amazon product URLs and StackOverflow question URLs.
  //
  // We show this "slug" at the end for human-reading, but don't depend on it as
  // they're more prone to change than product IDs, so we actually show the
  // product ID page here.
  //
  // Use `goto` to show the product ID page, passing in the params so that the
  // product ID page has access to the slug, without an actual redirect.
  $goto(`../${id}`, $params, true, true);
</script>
