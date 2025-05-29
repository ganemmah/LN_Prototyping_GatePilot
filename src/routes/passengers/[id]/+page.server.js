import { getPassenger, getFlights } from "$lib/db.js";

export async function load({ params }) {
  const passenger = await getPassenger(params.id);
  if (!passenger) {
    return { status: 404 };
  }

  const flights = await getFlights();
  const flightMap = new Map(flights.map((f) => [f.flight_number, f._id]));

  return {
    passenger,
    flightMap,
  };
}
