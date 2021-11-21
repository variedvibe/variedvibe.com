<script>
  import Hero from "/src/components/Hero/Hero.svelte";
  import StatusMessage, {
    messageErrorGeneric,
    messageErrorInvalidForm,
  } from "/src/components/StatusMessage/StatusMessage.svelte";

  const formActionURL =
    import.meta.env.VITE_CONTACT_FORM_ACTION_URL ??
    import.meta.env.CONTACT_FORM_ACTION_URL;

  const errorSlugInvalidForm = "ERR_INVALID_FORM";

  let sending = false;
  let sendSuccess = false;
  let formError = null;

  function invalid(event) {
    event.target.classList.add("error");
    formError = new Error(errorSlugInvalidForm);
  }

  function formInput() {
    formError = null;
  }

  async function submit(event) {
    event.preventDefault();

    const form = event.target;

    sending = true;
    sendSuccess = false;
    formError = null;

    for (const element of form.elements) {
      element.classList.remove("error");
    }

    let response;

    try {
      response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error(
          `Form submit failed with '${response.status}: ${response.statusText}'`
        );
      }
    } catch (e) {
      formError = e;

      throw e;
    } finally {
      sending = false;
    }

    sendSuccess = response.ok;
  }
</script>

<Hero />

<div class="container page-width-wrapper">
  <section class="main">
    <h2>Contact Us</h2>

    <p>
      Have a question? An idea? Need support? Send us a message and we'll get
      back to you as soon as we can.
    </p>
    <p />
  </section>
  <hr />
  <section>
    {#if !sendSuccess}
      <form
        action={formActionURL}
        method="POST"
        on:submit={submit}
        on:invalid|capture={invalid}
        on:input={formInput}
      >
        <span class="form-element full-width topic">
          <label class="visually-hidden" for="topic">Topic</label>
          <input
            type="text"
            id="topic"
            name="subject"
            placeholder="Topic"
            list="topic-suggestions"
            required
          />

          <datalist id="topic-suggestions">
            <option value="Just Saying Hi" />
            <option value="I Need Help" />
            <option value="Product Support" />
            <option value="Web Support" />
          </datalist>
        </span>
        <span class="form-element full-width email">
          <label class="visually-hidden" for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </span>
        <span class="form-element name first-name">
          <label class="visually-hidden" for="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first_name"
            placeholder="First Name"
            required
          />
        </span>
        <span class="form-element name last-name">
          <label class="visually-hidden" for="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last_name"
            placeholder="Last Name"
            required
          />
        </span>
        <span class="form-element full-width message">
          <label class="visually-hidden" for="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows="10"
            minlength="25"
            required
          />
        </span>

        <span class="form-status status-message" class:error={formError}>
          {#if formError}
            {#if formError.message == errorSlugInvalidForm}
              {messageErrorInvalidForm}
            {:else}
              {messageErrorGeneric}
            {/if}
          {/if}
        </span>

        <span class="form-element submit">
          <label class="visually-hidden" for="submit">Send Message</label>
          <input
            type="submit"
            id="submit"
            name="submit"
            value={sending ? "Please Wait" : "Send Message"}
            disabled={sending}
          />
        </span>
      </form>
    {:else}
      <StatusMessage
        message="Message sent successfully! We'll get back to you
ASAP."
      />
    {/if}
  </section>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  section,
  hr {
    max-width: 500px;
    margin: 0 5%;
  }
  hr {
    width: 90%;
    margin: 25px 5%;
  }
  section p {
    text-align: justify;
  }
  .main p {
    font-size: var(--important-font-size);
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
  }
  form .form-element,
  form .form-status {
    margin: 5px 0;
  }
  form .full-width,
  .full-width input,
  .full-width textarea {
    width: 100%;
  }
  form .name {
    flex: 1;
  }
  form .name.first-name {
    margin-right: 10px;
  }
  form .name.last-name {
    margin-left: 10px;
  }
  form .name input {
    width: 100%;
  }
  form .message textarea {
    min-height: 5em;
  }
  form .submit {
    margin-left: auto;
    margin-right: 0;
  }
  form .form-status {
    flex: 1;
    display: block;
    margin-right: 10px;
    padding: 2px 0;
    text-align: left;
  }
</style>
