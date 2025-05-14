// src/routes/flights/+page.server.js
import { getFlights } from "$lib/db";

export async function load() {
  return { flights: await getFlights() };
}
