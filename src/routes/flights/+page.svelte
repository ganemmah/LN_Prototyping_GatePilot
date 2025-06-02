<script>
  // Hole 'data' aus den übergebenen Props
  let { data } = $props();

  // Destrukturiere 'flights' aus dem 'data'-Objekt.
  // 'flights' ist automatisch reaktiv, wenn sich 'data' ändert.
  let { flights } = data;

  // Status-Badge-Klassen als normale Funktion beibehalten
  function statusBadgeCls(status) {
    switch (status) {
      case "Gate Open":
        return "bg-secondary text-light";
      case "Boarding":
        return "bg-primary";
      case "Final Call":
        return "bg-danger text-light blink";
      case "Gate Closed":
        return "bg-dark text-light";
      case "Departed":
        return "bg-info text-dark";
      case "Taxiing to Runway":
        return "bg-warning text-dark";
      case "En Route":
        return "bg-warning text-dark";
      case "Landed":
        return "bg-success";
      default:
        return "bg-light text-dark";
    }
  }
</script>

<div class="container my-5">
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-auto text-white">Flights</h1>
    
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
              <h5 class="card-title">
                <i class="bi bi-arrow-right-short me-1"></i>
                {flight.origin} → {flight.destination}
              </h5>

              <p class="mb-2">
                <strong>Gate:</strong>
                {flight.gateNumber}
              </p>

              <p class="mb-3">
                <span class={`badge ${statusBadgeCls(flight.status)}`}>
                  {flight.status}
                </span>
              </p>

              <a
                href={`/flights/${flight._id}`}
                class="mt-auto btn btn-outline-primary w-100"
              >
                Details of the Flight
              </a>
              <a
                href={`flights/${flight._id}/passengers`}
                class="mt-auto btn btn-outline-primary w-100"
              >
                Passenger List
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>