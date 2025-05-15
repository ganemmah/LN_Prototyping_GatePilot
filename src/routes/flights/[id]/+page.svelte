<!-- src/routes/flights/[id]/+page.svelte -->
<script>
  export let data;
  const { flight } = data;

  // Badge-Klasse je nach Status
  function statusBadgeCls(status) {
    switch (status) {
      case 'Scheduled': return 'bg-info text-dark';
      case 'Boarding':  return 'bg-primary';
      case 'En Route':  return 'bg-warning text-dark';
      case 'Landed':    return 'bg-success';
      case 'Delayed':   return 'bg-danger';
      case 'Cancelled': return 'bg-secondary';
      default:          return 'bg-light text-dark';
    }
  }
</script>

<div class="container my-5">
  <div class="card shadow-lg">
    <!-- Header -->
    <div class="card-header bg-dark text-white d-flex align-items-center">
      <i class="bi bi-geo-alt-fill me-2 display-6"></i>
      <h2 class="mb-0">Flight {flight.flight_number}</h2>
    </div>

    <!-- Body -->
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

    <!-- Footer -->
    <div class="card-footer bg-light d-flex justify-content-end">
      <a href="/flights" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left-circle me-1"></i>
        Zurück zur Übersicht
      </a>
    </div>
  </div>
</div>
