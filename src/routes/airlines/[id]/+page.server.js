import { getAirline, getFlights } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const airline = await getAirline(params.id);
  if (!airline) throw error(404, 'Airline nicht gefunden');

  const all = await getFlights();
  // nur die Flüge, deren airline_code passen
  const flights = all.filter(f => f.airline_code === params.id);

  return { airline, flights };
}
