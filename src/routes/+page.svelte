<!-- src/routes/+page.svelte -->
<script>
  export let data;
  const recent = data.recent ?? [];
  const boarding = data.boarding ?? [];

  // Array in Gruppen (Chunks) zu jeweils 3 Einträgen teilen
  function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  const slides = chunk(recent, 2);
</script>

<div class="container my-5">
  <!-- Hero-Card -->
  <div class="card bg-dark text-white shadow-sm mb-5">
    <div class="card-body text-center py-5">
      <h1 class="display-4">GatePilot</h1>
      <p class="lead">Seamless flight & gate management</p>
    </div>
  </div>

  <!-- Feature Cards -->
  <div class="row g-4 mb-5">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm hover-scale text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-plane-fill display-4 text-primary mb-3"></i>
          <h5 class="card-title">Flights</h5>
          <p class="card-text">Übersicht aller Flüge verwalten und einsehen.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm hover-scale text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-door-open-fill display-4 text-success mb-3"></i>
          <h5 class="card-title">Gates</h5>
          <p class="card-text">Gate-Zuweisung & Monitoring in Echtzeit.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm hover-scale text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-clock-history display-4 text-warning mb-3"></i>
          <h5 class="card-title">Live-Updates</h5>
          <p class="card-text">Bleibe informiert über Ankünfte und Abflüge.</p>
        </div>
      </div>
    </div>
  </div>

  {#if boarding.length > 0}
  <section class="mb-5">
    <div
      class="card bg-dark text-light mx-auto shadow-lg"
      style="max-width: 600px; border-radius: .5rem;"
    >
      <!-- Header mit blinkender Sirene -->
      <div
        class="card-header bg-gradient-dark text-light border-0 d-flex align-items-center p-3"
      >
        <i
          class="bi bi-exclamation-triangle-fill text-warning fs-2 me-3 blink"
        ></i>
        <h5 class="mb-0 fw-bold">Now Boarding</h5>
      </div>

      <!-- Marquee-Container -->
      <div class="marquee">
        <ul>
          {#each boarding as f}
            <li
              class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"
            >
              <div class="d-flex flex-column">
                <span class="fw-semibold">{f.flight_number}</span>
                <small class="text-light-50">{f.origin}</small>
              </div>
              <span
                class="badge bg-warning text-dark py-1 px-2 rounded-pill"
              >
                Gate {f.gate_number}
              </span>
            </li>
          {/each}

          <!-- Wiederhole die gleichen Items, damit das Scrollen nahtlos ist -->
          {#each boarding as f}
            <li
              class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"
            >
              <div class="d-flex flex-column">
                <span class="fw-semibold">{f.flight_number}</span>
                <small class="text-light-50">{f.origin}</small>
              </div>
              <span
                class="badge bg-warning text-dark py-1 px-2 rounded-pill"
              >
                Gate {f.gate_number}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/if}

  <!-- Recent Arrivals Carousel mit 3 Cards pro Slide -->
  <h2 class="mb-4 text-white">Letzte Ankünfte</h2>
  {#if slides.length > 0}
    <!-- Autoplay starten, jede 3 Sekunden wechseln, nicht anhalten bei Hover -->
    <div
      id="recentCarousel"
      class="carousel slide mb-5"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="false"
    >
      <div class="carousel-inner">
        {#each slides as group, idx}
          <div class="carousel-item {idx === 0 ? 'active' : ''}">
            <!-- D-Flex-Container für zentrierte 2 Cards -->
            <div
              class="d-flex justify-content-center align-items-stretch gap-4 px-3"
            >
              {#each group as f}
                <div class="card shadow-sm hover-scale" style="width: 300px;">
                  <div class="card-body text-center py-4">
                    <h5 class="card-title">
                      {f.flight_number} – {f.airline_code}
                    </h5>
                    <p class="mb-1">{f.scheduled_arrival}</p>
                    <p class="mb-2"><strong>Gate:</strong> {f.gate_number}</p>
                    <p class="mb-2"><strong>Origin:</strong> {f.origin}</p>
                    <span class="badge bg-success">{f.status}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}

        <!-- Carousel Controls -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#recentCarousel"
          data-bs-slide="prev"
          aria-label="Vorherige"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#recentCarousel"
          data-bs-slide="next"
          aria-label="Nächste"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  {:else}
    <p class="text-muted">Noch keine Ankünfte vorhanden.</p>
  {/if}
</div>
