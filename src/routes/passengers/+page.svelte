<script>
  // Hole 'data' aus den übergebenen Props
  let { data } = $props();

  // Destrukturiere 'passengers' und 'flightMap' aus dem 'data'-Objekt
  let { passengers, flightMap } = data;

  // Zustandsvariablen als Runes deklarieren
  let query = $state("");
  let showCheckedInOnly = $state(false);

  // Dynamischer Filter als $derived-Rune
  let filtered = $derived(
    passengers.filter((p) => {
      const name = `${p.first_name} ${p.last_name}`.toLowerCase();
      const flights = p.flight_numbers.map((n) => String(n)).join(", ");
      const matchesQuery =
        name.includes(query.toLowerCase()) || flights.includes(query);
      const matchesCheckIn = !showCheckedInOnly || p.checked_in;
      return matchesQuery && matchesCheckIn;
    })
  );

  // Funktion zum Exportieren als CSV
  function exportToCSV() {
    const headers = [
      "First Name",
      "Last Name",
      "Seat",
      "Checked In",
      "Flight Numbers",
    ];
    const rows = filtered.map((p) => [
      p.first_name,
      p.last_name,
      p.seat,
      p.checked_in ? "Yes" : "No",
      p.flight_numbers.join(", "),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "passengers_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<h2 class="mb-4">Alle Passagiere</h2>

<div class="row mb-3 g-2 align-items-center">
  <div class="col-md-6">
    <input
      class="form-control"
      placeholder="Nach Name oder Flugnummer suchen..."
      bind:value={query}
    />
  </div>
  <div class="col-md-3">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        bind:checked={showCheckedInOnly}
        id="checkinOnly"
      />
      <label class="form-check-label" for="checkinOnly">
        Show only Check In
      </label>
    </div>
  </div>
  <div class="col-md-3 text-end">
    <button class="btn btn-outline-secondary" onclick={exportToCSV}>
      Export as CSV
    </button>
  </div>
</div>
<a class="btn btn-primary mb-3" href="/passengers/create">+ Insert New Passenger</a>

{#if filtered.length === 0}
  <div class="alert alert-warning">Keine passenden Passagiere gefunden.</div>
{:else}
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Seat</th>
          <th>Check-in</th>
          <th>Flights</th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as p}
          <tr>
            <td>
              <a href={`/passengers/${p._id}`} class="text-decoration-none">
                {p.first_name}
                {p.last_name}
              </a>
            </td>
            <td>{p.seat}</td>
            <td>{p.checked_in ? "Yes" : "No"}</td>
            <td>
              {#each p.flight_numbers as fn}
                <span class="badge bg-primary me-1">
                  <a
                    class="text-white text-decoration-none"
                    href={`/flights/${flightMap.get(fn)}`}
                  >
                    #{fn}
                  </a>
                </span>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}