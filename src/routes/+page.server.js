import { getFlights, getAllPassengers } from '$lib/db.js';

export async function load() {
  const allFlights = await getFlights();
  const allPassengers = await getAllPassengers();

  // Letzte gelandete Flüge (max 5)
  const recent = allFlights
    .filter(f => f.status === 'Landed')
    .sort((a, b) => new Date(b.scheduled_arrival) - new Date(a.scheduled_arrival))
    .slice(0, 5);

  // Boarding-Flüge
  const boarding = allFlights.filter(f => f.status === 'Boarding');

  // Final Call Flüge
  const finalCallFlights = allFlights.filter(f => f.status === 'Final Call');
  const finalCallFlightNumbers = finalCallFlights.map(f => f.flight_number);

  // Alle Passagiere, die auf Final Call-Flügen sind
  const finalCallPassengers = allPassengers.filter(p =>
    p.flight_numbers.some(fn => finalCallFlightNumbers.includes(fn))
  );

  return {
    recent,
    boarding,
    finalCallPassengers,
    finalCallFlights
  };
}
