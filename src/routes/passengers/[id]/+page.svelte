<script>
  export let data;
  const { passenger, flightMap } = data;
</script>

<h2 class="mb-4">Passenger Details</h2>

<ul class="list-group">
  {#if passenger.photo_url}
    <img
      src={passenger.photo_url}
      alt="Foto von {passenger.first_name}"
      class="img-thumbnail mb-3"
      width="150"
    />
  {:else}
    <div class="alert alert-secondary">Kein Bild vorhanden.</div>
  {/if}
  <li class="list-group-item">
    <strong>Name:</strong>
    {passenger.first_name}
    {passenger.last_name}
  </li>
  <li class="list-group-item">
    <strong>Passport Number:</strong>
    {passenger.passport_number}
  </li>
  <li class="list-group-item"><strong>Seat:</strong> {passenger.seat}</li>
  <li class="list-group-item">
    <strong>Check-In:</strong>
    {passenger.checked_in ? "✅" : "❌"}
  </li>
  <li class="list-group-item">
    <strong>Flights:</strong>
    {#each passenger.flight_numbers as fn}
      {#if flightMap.has(fn)}
        <a
          href={`/flights/${flightMap.get(fn)}`}
          class="badge bg-primary me-1 text-decoration-none text-white"
        >
          #{fn}
        </a>
      {:else}
        <span class="badge bg-secondary me-1">#{fn}</span>
      {/if}
    {/each}
  </li>
</ul>
