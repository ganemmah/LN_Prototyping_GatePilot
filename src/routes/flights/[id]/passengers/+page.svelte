<script>
  // Daten aus load() werden als Props empfangen
  let { data } = $props();

  // Destrukturiere 'passengers' und 'flightNumber' aus den empfangenen Daten.
  // Diese sind automatisch reaktiv, falls sich die übergeordneten Daten ändern.
  let { passengers, flightNumber } = data;
</script>

<h2>Passengers in Flight {flightNumber}</h2>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Photo</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Seat</th>
      <th>Check-in</th>
    </tr>
  </thead>
  <tbody>
    {#each passengers as p}
      <tr>
        <td>
          {#if p.photo_url}
            <img
              src={p.photo_url}
              alt="Foto"
              class="rounded-circle"
              width="40"
              height="40"
            />
          {:else}
            <span class="text-muted">–</span>
          {/if}
        </td>

        <td>{p.first_name}</td>
        <td>{p.last_name}</td>
        <td>{p.seat}</td>
        <td>
          {#if p.checked_in}
            Yes
          {:else}
            No
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>