// src/routes/gates/[id]/+page.server.js
import { getGate, getFlights } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // 1) Gate‐Meta laden
  const gate = await getGate(params.id);
  if (!gate) throw error(404, 'Gate nicht gefunden');

  // 2) Alle Flüge holen und nur die filtern, deren `gate_number` zum Gate passt
  const allFlights = await getFlights();
  const assigned = allFlights.filter(
    f => f.gate_number === gate.gate_number
  );

  // 3) Auf die Felder reduzieren, die du anzeigen willst
  const flights = assigned.map(f => ({
    id:          f._id,
    time:        f.scheduled_departure ?? f.scheduled_arrival,
    airline:     f.airline_code,
    destination: f.destination
  }));

  return { gate, flights };
}
