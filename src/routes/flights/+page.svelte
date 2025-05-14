<!-- src/routes/flights/+page.svelte -->
<script>
  // pull in the props object
  let { data } = $props();

  // then destructure your flights array
  const { flights } = data;
</script>

<p><i>Daten geladen aus airportDB → flights</i></p>

<div class="mb-3">
  <a href="/flights/new" class="btn btn-primary">Add New Flight</a>
</div>

<div class="row gy-3">
  {#if flights.length === 0}
    <p class="text-muted">Noch keine Flüge vorhanden.</p>
  {:else}
    {#each flights as flight}
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{flight.flightNumber}</h5>
            <p class="card-text mb-1">
              {flight.origin} → {flight.destination}
            </p>
            <p class="card-text mb-1">
              Gate: {flight.gateId ?? "unassigned"}
            </p>
            <p class="card-text mb-3">
              Status: {flight.status}
            </p>
            <a
              href={`/flights/${flight._id}`}
              class="mt-auto btn btn-sm btn-outline-primary"
            >
              Details
            </a>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
