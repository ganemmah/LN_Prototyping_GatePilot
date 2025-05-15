<script>
  export let data;
  const { gate, flights } = data;

  // Zeit im HH:MM-Format
  const fmt = d =>
    typeof d === 'string'
      ? d
      : new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
</script>

<!-- Hero-Bar für das Gate -->
<section class="bg-primary text-white py-4 mb-4">
  <div class="container d-flex align-items-center">
    <i class="bi bi-door-open-fill display-4 me-3"></i>
    <div>
      <h1 class="h2 mb-1">Gate {gate.gate_number}</h1>
      <small class="text-light-opacity">Terminal {gate.terminal} • Jetbridge: {gate.has_jetbridge ? 'Ja' : 'Nein'}</small>
    </div>
  </div>
</section>

<div class="container">

  <!-- Status‐Badge -->
  <div class="mb-4">
    <span class="badge 
      {gate.status === 'Available' ? 'bg-success' : ''}
      {gate.status === 'Occupied'  ? 'bg-warning text-dark' : ''}
      {gate.status === 'Closed'    ? 'bg-danger' : ''}
      {gate.status === 'Maintenance' ? 'bg-secondary' : ''}"
    >
      <i class="bi bi-info-circle me-1"></i>
      {gate.status}
    </span>
  </div>

  <h2 class="h4 mb-3">Zugewiesene Flüge</h2>

  {#if flights.length === 0}
    <div class="alert alert-secondary">
      <i class="bi bi-exclamation-circle me-2"></i>
      Keine Flüge für dieses Gate.
    </div>
  {:else}
    <!-- Table mit Hover-Effekt und Icons -->
    <table class="table table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col"><i class="bi bi-clock-fill"></i> Zeit</th>
          <th scope="col"><i class="bi bi-airplane-fill"></i> Airline</th>
          <th scope="col"><i class="bi bi-geo-alt-fill"></i> Destination</th>
        </tr>
      </thead>
      <tbody>
        {#each flights as f}
          <tr>
            <td>{fmt(f.time)}</td>
            <td>{f.airline}</td>
            <td>{f.destination}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <a href="/gates" class="btn btn-outline-light mt-4">
    <i class="bi bi-arrow-left-circle me-1"></i>
    Zurück zur Gates-Übersicht
  </a>
</div>
