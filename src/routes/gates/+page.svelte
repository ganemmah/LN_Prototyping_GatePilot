<!-- src/routes/gates/+page.svelte -->
<script>
  // Daten via load()
  export let data;
  const { gates } = data;
</script>

<div class="container my-5">
  <h1 class="mb-4 text-white">Gates</h1>

  {#if gates.length === 0}
    <div class="alert alert-secondary">
      Keine Gates gefunden.
    </div>
  {:else}
    <div class="row g-4">
      {#each gates as gate}
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm hover-scale d-flex flex-column">
            
            <div class="card-body">
              <h5 class="card-title">Gate {gate.gate_number}</h5>
              <p class="card-text mb-1">
                <strong>Terminal:</strong> {gate.terminal}
              </p>
              <p class="card-text mb-1">
                <strong>Status:</strong> 
                <span class="badge 
                  {gate.status === 'Available'    ? 'bg-success' : ''}
                  {gate.status === 'Occupied'     ? 'bg-warning text-dark' : ''}
                  {gate.status === 'Closed'       ? 'bg-danger' : ''}
                  {gate.status === 'Maintenance'  ? 'bg-secondary' : ''}"
                >
                  {gate.status}
                </span>
              </p>
              <p class="card-text mb-3">
                <strong>Jetbridge:</strong> {gate.has_jetbridge ? 'Ja' : 'Nein'}
              </p>
            </div>

            <div class="card-footer bg-transparent mt-auto">
              <a href={`/gates/${gate._id}`} class="btn btn-outline-primary w-100">
                Details
              </a>
            </div>

          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
