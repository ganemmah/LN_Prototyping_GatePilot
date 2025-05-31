<script>
  // Der 'data'-Rune empfängt Props.
  // Hole zuerst 'data' aus den übergebenen Props.
  let { data } = $props();

  // Dann destrukturiere 'airlines' aus dem 'data'-Objekt.
  // Dies stellt sicher, dass 'airlines' reaktiv bleibt,
  // falls sich die übergeordneten Daten ändern.
  let { airlines } = data;
</script>

<div class="container my-5">
  <h1 class="mb-4 text-white">Airlines</h1>

  {#if airlines.length === 0}
    <div class="alert alert-secondary">Keine Airlines vorhanden.</div>
  {:else}
    <div class="row g-4">
      {#each airlines as a}
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm hover-scale d-flex flex-column">
            <img
              src={a.logo_url}
              alt="{a.name} Logo"
              class="card-img-top p-3"
              style="object-fit: contain; height: 100px;"
            />
            <div class="card-body text-center">
              <h5 class="card-title">{a.name}</h5>
              <p class="card-text text-muted">{a.country}</p>
            </div>
            <div class="card-footer bg-transparent mt-auto">
              <a
                href={`/airlines/${a.airline_code}`}
                class="btn btn-outline-primary w-100"
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