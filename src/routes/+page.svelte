<script>
  // Wenn du später die letzten Flüge per load() holst, bekommst du sie hier in `data.recent`
  export let data;
  const recent = data?.recent ?? [];
</script>

<!-- Hero-Sektion mit Titel & Subtitle -->
<section class="py-5 text-center bg-dark text-light">
  <div class="container">
    <h1 class="display-4">GatePilot</h1>
    <p class="lead">Seamless flight & gate management</p>
    <hr class="my-4" />
    <p>Diese App bietet:</p>
    <ul class="text-start mx-auto" style="max-width:600px">
      <li>Übersicht aller Flüge</li>
      <li>Gate-Zuweisung & Monitoring</li>
      <li>Live-Status und Historie</li>
    </ul>
  </div>
</section>

<!-- Beispiel-Carousel für „Recent Arrivals“ -->
<section class="container my-5">
  <h2 class="mb-4">Letzte Ankünfte</h2>

  {#if recent.length}
    <div id="recentFlights" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        {#each recent as f, i}
          <div class="carousel-item {i === 0 ? 'active' : ''}">
            <div class="card p-3">
              <h5>{f.flightNumber} – {f.airline}</h5>
              <p>
                Aus {f.origin} • Gelandet: {new Date(f.actualArrival).toLocaleTimeString()}
              </p>
              <p>Gate: {f.gateId ?? '–'} | Status: {f.status}</p>
            </div>
          </div>
        {/each}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#recentFlights" data-bs-slide="prev" aria-label="Vorheriger">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#recentFlights" data-bs-slide="next" aria-label="Nächste">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  {:else}
    <p class="text-muted">Noch keine Ankünfte vorhanden.</p>
  {/if}
</section>