<script>
  import { onMount } from 'svelte';
  

  const { data } = $props();
  const recent = data.recent ?? [];
  const boarding = data.boarding ?? [];
  const finalCallPassengers = data.finalCallPassengers ?? [];
  const finalCallFlights = data.finalCallFlights ?? [];

  function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  const slides = chunk(recent, 2);

  let now = new Date();
  let scrollFinalCall;
  let scrollBoarding;

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 60000);

    const scrollInterval1 = setInterval(() => {
      if (scrollFinalCall) {
        // @ts-ignore
        scrollFinalCall.scrollTop += 1;
      }
    }, 60);

    const scrollInterval2 = setInterval(() => {
      if (scrollBoarding) {
        // @ts-ignore
        scrollBoarding.scrollTop += 1;
      }
    }, 60);

    return () => {
      clearInterval(interval);
      clearInterval(scrollInterval1);
      clearInterval(scrollInterval2);
    };
  });

  function timeUntil(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const target = new Date(now);
    target.setHours(hours, minutes, 0, 0);
    let diff = Math.round((target - now) / 60000);
    if (diff < 0) diff += 1440;
    return diff;
  }

  const finalCallRows = finalCallPassengers.map((p) => {
    const flights = finalCallFlights.filter((f) =>
      p.flight_numbers.includes(f.flight_number)
    );
    return {
      ...p,
      flights,
    };
  }).sort((a, b) => timeUntil(a.flights[0]?.scheduled_departure ?? "23:59") - timeUntil(b.flights[0]?.scheduled_departure ?? "23:59")).slice(0, 12);
</script>

<div class="container my-5">
  <!-- Hero -->
  <div class="card bg-dark text-white shadow-sm mb-5">
    <div class="card-body text-center py-5">
      <h1 class="display-4">GatePilot</h1>
      <p class="lead">Seamless flight & gate management</p>
    </div>
  </div>

  <!-- Feature Cards -->
  <div class="row g-4 mb-5">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-plane-fill display-4 text-primary mb-3"></i>
          <h5 class="card-title">Flights</h5>
          <p class="card-text">View an overview of all flights.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-door-open-fill display-4 text-success mb-3"></i>
          <h5 class="card-title">Gates</h5>
          <p class="card-text">Gate Allocation and Monitoring of flights in Real Time</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm text-center">
        <div class="card-body d-flex flex-column justify-content-center">
          <i class="bi bi-clock-history display-4 text-warning mb-3"></i>
          <h5 class="card-title">Live-Updates</h5>
          <p class="card-text">Stay updated about the Departing and Arriving flights and also their respective Gates and Passengers</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-4 mb-5">
    <div class="col-lg-6">
      <div class="card bg-dark text-light shadow-lg animate__animated animate__fadeIn h-100" style="border-radius: .5rem;">
        <div class="card-header bg-danger text-white fw-bold d-flex align-items-center p-3 animate__animated animate__flash animate__infinite">
          <i class="bi bi-megaphone-fill me-2"></i>
          Final Call – Please proceed to the gate immediately!
        </div>
        <div bind:this={scrollFinalCall} style="max-height: 360px; overflow-y: auto;">
          {#if finalCallRows.length > 0}
            <ul class="list-group list-group-flush">
              {#each finalCallRows as p}
                <li class="list-group-item py-2 px-3 d-flex justify-content-between align-items-center">
                  <div>
                    <strong class="fw-semibold">{p.first_name} {p.last_name}</strong>
                    <div class="text-muted small">Passport Number: {p.passport_number}</div>
                  </div>
                  <div class="text-end">
                    {#each p.flights as f}
                      <div class="mb-1">
                        <span class="badge bg-dark rounded-pill">Flight: {f.flight_number}</span>
                        <span class="badge bg-secondary ms-1 rounded-pill">Gate {f.gate_number}</span>
                        {#if timeUntil(f.scheduled_departure) < 10}
                          <span class="badge bg-danger ms-1 rounded-pill">{timeUntil(f.scheduled_departure)} Min</span>
                        {:else}
                          <span class="badge bg-info text-dark ms-1 rounded-pill">{timeUntil(f.scheduled_departure)} Min</span>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </li>
              {/each}
            </ul>
          {:else}
            <div class="text-center text-muted p-4">
              <i class="bi bi-info-circle me-2"></i>No passengers currently at final call.
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      {#if boarding.length > 0}
        <div class="card bg-dark text-light shadow-lg h-100" style="border-radius: .5rem;">
          <div class="card-header bg-gradient-dark text-light border-0 d-flex align-items-center p-3">
            <i class="bi bi-exclamation-triangle-fill text-warning fs-2 me-3 blink"></i>
            <h5 class="mb-0 fw-bold">Now Boarding</h5>
          </div>
          <div bind:this={scrollBoarding} style="max-height: 360px; overflow-y: auto;">
            <ul class="mb-0 list-group list-group-flush">
              {#each boarding as f}
                <li class="list-group-item bg-dark text-light px-4 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <div class="d-flex flex-column">
                    <span class="fw-semibold">{f.flight_number}</span>
                    <small class="text-light-50">{f.origin}</small>
                  </div>
                  <span class="badge bg-warning text-dark py-1 px-2 rounded-pill">
                    Gate {f.gate_number}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Recent Arrivals -->
  <h2 class="mb-4 text-white">Recent Arrivals</h2>
  {#if slides.length > 0}
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
            <div class="d-flex justify-content-center align-items-stretch gap-4 px-3">
              {#each group as f}
                <div class="card shadow-sm hover-scale" style="width: 300px;">
                  <div class="card-body text-center py-4">
                    <h5 class="card-title">{f.flight_number} – {f.airline_code}</h5>
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
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#recentCarousel"
          data-bs-slide="prev"
          aria-label="Previous slide"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#recentCarousel"
          data-bs-slide="next"
          aria-label="Next slide"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  {:else}
    <p class="text-muted">No Arrivals</p>
  {/if}
</div>