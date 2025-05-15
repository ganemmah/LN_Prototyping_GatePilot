// src/routes/+page.server.js
import { getFlights } from '$lib/db.js';

export async function load() {
  const all = await getFlights();
  // nur gelandene Flüge, absteigend sortiert, Top 5
  const recent = all
    .filter(f => f.status === 'Landed')
    .sort((a,b) => new Date(b.scheduled_arrival) - new Date(a.scheduled_arrival))
    .slice(0,5);

    // NEU: alle Boarding‐Flüge
  const boarding = all.filter(f => f.status === 'Boarding');

  return { recent, boarding };
}
