<script>
  export let data;
  const { airline, flights } = data;
</script>

<div class="container my-5">
  <!-- Header Card -->
  <div class="card shadow-lg mb-5">
    <div class="row g-0 align-items-center">
      <div class="col-md-2 text-center p-4">
        <img
          src={airline.logo_url}
          alt="{airline.name} Logo"
          class="img-fluid"
          style="max-height: 100px; object-fit: contain;"
        />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <h2 class="card-title">{airline.name}</h2>
          <p class="card-text text-muted">Herkunft: {airline.country}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Flights-Tabelle -->
  <h3 class="mb-3">Flüge von {airline.name}</h3>
  {#if flights.length === 0}
    <div class="alert alert-secondary">Keine Flüge gefunden.</div>
  {:else}
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Flight #</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Dep</th>
            <th>Arr</th>
            <th>Status</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {#each flights as f}
            <tr>
              <td>{f.flight_number}</td>
              <td>{f.origin}</td>
              <td>{f.destination}</td>
              <td>{f.scheduled_departure}</td>
              <td>{f.scheduled_arrival}</td>
              <td>
                <span class="badge bg-info text-dark">{f.status}</span>
              </td>
              <td>{f.gate_number}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <a href="/airlines" class="btn btn-secondary mt-4">
    ← Zurück zur Airlines-Übersicht
  </a>
</div>
