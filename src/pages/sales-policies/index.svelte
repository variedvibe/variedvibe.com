<script>
  import { url } from "@roxi/routify";
</script>

<div class="container page-width-wrapper">
  <div class="content-width-wrapper">
    <section class="main">
      <h2>Sales and Return Policies</h2>
    </section>
    <section>
      <h3 id="return-policy">Our Return Policy</h3>
      <p>
        Your business is important to us! We want you to be more than happy and
        satisfied with your order and your product.
      </p>
      <ul>
        <li>
          If you’re not satisfied with your order, you can return or exchange
          any item(s) within <strong>30 days</strong> of its purchase date. Items
          that have been washed, worn, or used may not be returned.
        </li>
        <li>
          If for any reason you receive a defective or damaged product, Varied
          Vibe. will refund the total order purchase amount, including return
          shipping cost.
        </li>
        <li>
          Please <a class="content-link" href={$url("/contact-us")}>contact</a>
          customer service at
          <a class="content-link" href="mailto:contact@variedvibe.com"
            >contact@variedvibe.com</a
          > for all returns.
        </li>
        <li>
          Once approved for a return, then your refund will be processed, and a
          credit will be automatically applied to your credit card or original
          method of payment. Please allow for a period of up to 14 business days
          for us to process the refund.
        </li>
      </ul>
    </section>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2,
  h3 {
    text-align: center;
  }
  section p {
    text-align: justify;
  }
</style>
