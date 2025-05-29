// src/routes/flights/[id]/passengers/+page.server.js
import { getFlight, getPassengersByFlightNumber, getPassenger } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const flight = await getFlight(params.id); // params.id ist _id (MongoDB)
  if (!flight) {
    return {
      status: 404,
      error: new Error("Flug nicht gefunden")
    };
  }
  

  const passengers = await getPassengersByFlightNumber(flight.flight_number);
  return {
    passengers,
    flight
  };
}

