<!-- src/routes/flights/[id]/+page.svelte -->
<script>
  // Daten aus load() werden als Props empfangen
  let { data } = $props();

  // Destrukturiere das 'flight'-Objekt aus den empfangenen Daten.
  // Das 'flight'-Objekt ist automatisch reaktiv, falls sich die übergeordneten Daten ändern.
  let { flight } = data;

  // Die Funktion zum Bestimmen der Status-Badge-Klasse bleibt unverändert,
  // da sie keine Svelte-Reaktivität benötigt.
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
  <div class="card shadow-lg">
    <div class="card-header bg-dark text-white d-flex align-items-center">
      <i class="bi bi-geo-alt-fill me-2 display-6"></i>
      <h2 class="mb-0">Flight {flight.flight_number}</h2>
    </div>

    <div class="card-body">
      <div class="row gy-3">
        <div class="col-sm-6">
          <h6 class="text-muted">Airline</h6>
          <p>{flight.airline_code}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="text-muted">Route</h6>
          <p>{flight.origin} <i class="bi bi-arrow-right-short"></i> {flight.destination}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="text-muted">
            <i class="bi bi-clock-fill me-1"></i> Scheduled Departure
          </h6>
          <p>{flight.scheduled_departure}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="text-muted">
            <i class="bi bi-clock-history me-1"></i> Scheduled Arrival
          </h6>
          <p>{flight.scheduled_arrival}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="text-muted">Gate</h6>
          <p>{flight.gate_number}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="text-muted">Status</h6>
          <span class={`badge ${statusBadgeCls(flight.status)} py-2 px-3`}>
            {flight.status}
          </span>
        </div>
      </div>
    </div>

    <div class="card-footer bg-light d-flex justify-content-end">
      <a href="/flights" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left-circle me-1"></i>
        Zurück zur Übersicht
      </a>
    </div>
  </div>
</div>