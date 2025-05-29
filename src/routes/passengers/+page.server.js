import { getAllPassengers, getFlights } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const passengers = await getAllPassengers();
  const flights = await getFlights();

  const flightMap = new Map(flights.map(f => [f.flight_number, f._id]));
  return { passengers, flightMap };
}
