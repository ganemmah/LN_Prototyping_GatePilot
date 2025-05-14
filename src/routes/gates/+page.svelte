<script>
  let { data } = $props();
  let { gates } = data;
</script>

<h1 class="mb-4">Gates</h1>

{#if gates.length === 0}
  <p class="text-muted">Keine Gates gefunden.</p>
{:else}
  <div class="row gy-4">
    {#each gates as gate}
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">Gate {gate.gate_number}</h5>
            <p class="mb-1"><strong>Terminal:</strong> {gate.terminal}</p>
            <p class="mb-1"><strong>Status:</strong> {gate.status}</p>
            <p class="mb-3">
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
