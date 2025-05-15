// src/routes/flights/+page.server.js
import { getFlights } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // 1) Alle Flüge laden (inkl. gate_number-Feld)
  const flights = await getFlights();

  // 2) gate_number → gateNumber umbenennen für’s Frontend
  const enriched = flights.map(f => ({
    ...f,
    gateNumber: f.gate_number   // direkt aus der flights-Collection
  }));

  // 3) Ergebnis zurückgeben
  return { flights: enriched };
}





// // src/routes/flights/+page.server.js
// import { getFlights, getGates } from '$lib/db.js';

// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
//   const [flights, gates] = await Promise.all([
//     getFlights(),
//     getGates()
//   ]);

//   // Pools erstellen
//   const closedGates   = gates.filter(g => g.status === 'Closed');
//   const activeGates   = gates.filter(g => ['Available','Occupied'].includes(g.status));
  
//   const group1 = flights.filter(f => ['Departed','En Route'].includes(f.status));
//   const group2 = flights.filter(f => ['Boarding','Delayed','Scheduled','Landed'].includes(f.status));

//   // Fisher–Yates Shuffle
//   function shuffle(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
//   }

//   const closedShuffled = shuffle([...closedGates]);
//   const activeShuffled = shuffle([...activeGates]);

//   // Zuordnungen
//   const assignment = new Map();

//   group1.forEach(f => {
//     const gate = closedShuffled.shift();
//     if (gate) assignment.set(f._id, gate.gate_number);
//   });

//   group2.forEach(f => {
//     const gate = activeShuffled.shift();
//     if (gate) assignment.set(f._id, gate.gate_number);
//   });

//   // Enriched Flights
//   const enriched = flights.map(f => ({
//     ...f,
//     gateNumber: assignment.get(f._id) ?? 'unassigned'
//   }));

//   return { flights: enriched };
// }



