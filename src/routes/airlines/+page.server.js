import { getAirlines } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const airlines = await getAirlines();
  return { airlines };
}
