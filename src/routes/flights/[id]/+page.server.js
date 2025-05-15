// src/routes/flights/[id]/+page.server.js
import { getFlight } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // 1) Einzelnen Flight laden
  const f = await getFlight(params.id);
  if (!f) throw error(404, 'Flight nicht gefunden');
  // 2) Strings bleiben Strings, kein extra mapping nötig
  return { flight: f };
}
