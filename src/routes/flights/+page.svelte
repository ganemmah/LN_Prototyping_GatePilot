<script>
  // Daten aus load()
  export let data;
  const { flights } = data;

  // Status-Badge-Klassen
  function statusBadgeCls(status) {
    switch (status) {
      case 'Gate Open':     return 'bg-secondary text-light';
      case 'Boarding':      return 'bg-primary';
      case 'Final Call':    return 'bg-danger text-light blink';
      case 'Gate Closed':   return 'bg-dark text-light';
      case 'Departed':      return 'bg-info text-dark';
      case 'Taxiing to Runway': return 'bg-warning text-dark';
      case 'En Route':      return 'bg-warning text-dark';
      case 'Landed':       return 'bg-success';
      default:              return 'bg-light text-dark';
    }
  }
</script>

<div class="container my-5">
  <!-- Header und Add-Button -->
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-auto text-white">Flights</h1>
    <a href="/flights/new" class="btn btn-lg btn-primary">Add New Flight</a>
  </div>

  {#if flights.length === 0}
    <div class="alert alert-secondary">
      <i class="bi bi-exclamation-circle me-2"></i>
      No flights available.
    </div>
  {:else}
    <div class="row g-4">
      {#each flights as flight}
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm hover-scale d-flex flex-column">
            
            <div class="card-body d-flex flex-column">
              <!-- Route -->
              <h5 class="card-title">
                <i class="bi bi-arrow-right-short me-1"></i>
                {flight.origin} → {flight.destination}
              </h5>

              <!-- Gate -->
              <p class="mb-2">
                <strong>Gate:</strong> {flight.gateNumber}
              </p>

              <!-- Status Badge -->
              <p class="mb-3">
                <span class={`badge ${statusBadgeCls(flight.status)}`}>
                  {flight.status}
                </span>
              </p>

              <!-- Details-Button -->
              <a
                href={`/flights/${flight._id}`}
                class="mt-auto btn btn-outline-primary w-100"
              >
                Details
              </a>
            </div>

          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
