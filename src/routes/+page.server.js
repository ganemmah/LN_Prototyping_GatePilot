// src/routes/+page.server.js
import { getFlights } from '$lib/db';

export async function load() {
  const all = await getFlights();
  const recent = all
    .filter(f => f.actualArrival)                         // nur gelandete Flüge
    .sort((a,b) => new Date(b.actualArrival) - new Date(a.actualArrival))
    .slice(0,5);                                           // Top 5

  return { recent };
}
