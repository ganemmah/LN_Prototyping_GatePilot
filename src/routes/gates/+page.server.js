// src/routes/gates/+page.server.js
import { getGates } from '$lib/db';

 /** @type {import('./$types').PageServerLoad} */
export async function load() {
  const gates = await getGates();
  return { gates };
}


//Beim Aufruf von /gates lädt SvelteKit alle Dokumente aus Deiner gates-Collection und stellt sie als data.gates dem Page-Component zur Verfügung.