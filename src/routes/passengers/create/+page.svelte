<script>
  // Hole 'form' aus den übergebenen Props
  let { form } = $props();

  // Zustandsvariablen für die Formularfelder mit initialen Werten aus `form`
  let first_name = $state(form?.values?.first_name ?? '');
  let last_name = $state(form?.values?.last_name ?? '');
  let passport_number = $state(form?.values?.passport_number ?? '');
  let seat = $state(form?.values?.seat ?? '');
  let flight_number = $state(form?.values?.flight_number ?? '');
  let checked_in = $state(form?.values?.checked_in ?? false);
  let photo_url = $state(form?.values?.photo_url ?? '');

  // Zustandsvariablen für den Status der Formularübermittlung
  let submitted = $state(false);
  let newPassengerId = $state(null);

  // Beobachte Änderungen an `form` und reagiere, wenn der Status 'success' ist
  $effect(() => {
    if (form?.status === 'success' && !submitted) {
      // Formularfelder zurücksetzen
      first_name = '';
      last_name = '';
      passport_number = '';
      seat = '';
      flight_number = '';
      checked_in = false;
      photo_url = '';
      submitted = true; // Markiere, dass es zurückgesetzt wurde
      newPassengerId = form.newId;
    } else if (form?.status !== 'success') {
      // Wenn der Formularstatus nicht 'success' ist (z.B. Fehler oder initial),
      // setze 'submitted' und newPassengerId zurück, damit ein erneuter Erfolg wieder registriert wird.
      submitted = false;
      newPassengerId = null;
    }
  });
</script>

<h2>Create new Passenger</h2>

{#if form?.error}
  <div class="alert alert-danger">{form.error}</div>
{/if}

<form method="POST" class="mb-4 needs-validation" novalidate>
  <div class="mb-3">
    <label class="form-label">First Name *</label>
    <input class="form-control" name="first_name" bind:value={first_name} required />
    {#if form?.errors?.first_name}
      <div class="text-danger small">{form.errors.first_name}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label">Last Name *</label>
    <input class="form-control" name="last_name" bind:value={last_name} required />
    {#if form?.errors?.last_name}
      <div class="text-danger small">{form.errors.last_name}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label">Passport Number *</label>
    <input class="form-control" name="passport_number" bind:value={passport_number} required />
    {#if form?.errors?.passport_number}
      <div class="text-danger small">{form.errors.passport_number}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label">Seat Number *</label>
    <input class="form-control" name="seat" bind:value={seat} required />
    {#if form?.errors?.seat}
      <div class="text-danger small">{form.errors.seat}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label">Flight Number *</label>
    <input
      class="form-control"
      name="flight_number"
      bind:value={flight_number}
      required
      pattern="\\d+"
      title="Please insert a valid Flight Number (Only Numbers allowed!)"
    />
    {#if form?.errors?.flight_number}
      <div class="text-danger small">{form.errors.flight_number}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label">Picture-URL (optional)</label>
    <input class="form-control" name="photo_url" bind:value={photo_url} />
  </div>

  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" name="checked_in" bind:checked={checked_in} />
    <label class="form-check-label">Checked-In</label>
  </div>

  <button type="submit" class="btn btn-primary">Create the new Passenger</button>
</form>

{#if form?.status === 'success'}
  <div class="alert alert-success mt-3">
    ✅ Passenger was created successfully
    {#if newPassengerId}
      <div class="mt-2">
        <a href={`/passengers/${newPassengerId}`} class="btn btn-outline-success btn-sm">
          Get redirected to the created Passenger..
        </a>
      </div>
    {/if}
  </div>
{/if}