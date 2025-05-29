import { insertPassenger } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const first_name = formData.get('first_name')?.trim();
    const last_name = formData.get('last_name')?.trim();
    const passport_number = formData.get('passport_number')?.trim();
    const seat = formData.get('seat')?.trim();
    const flight_number_raw = formData.get('flight_number')?.trim();
    const photo_url = formData.get('photo_url')?.trim();
    const checked_in = formData.get('checked_in') === 'on';

    const errors = {};

    if (!first_name) errors.first_name = 'Vorname ist erforderlich';
    if (!last_name) errors.last_name = 'Nachname ist erforderlich';
    if (!passport_number) errors.passport_number = 'Passnummer ist erforderlich';
    if (!seat) errors.seat = 'Sitzplatz ist erforderlich';

    let flight_number;
    if (!flight_number_raw) {
      errors.flight_number = 'Flugnummer ist erforderlich';
    } else if (!/^\d+$/.test(flight_number_raw)) {
      errors.flight_number = 'Flugnummer muss eine gültige Zahl sein';
    } else {
      flight_number = Number(flight_number_raw);
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        error: 'Bitte alle Pflichtfelder korrekt ausfüllen.',
        values: {
          first_name,
          last_name,
          passport_number,
          seat,
          flight_number: flight_number_raw,
          photo_url,
          checked_in
        },
        errors
      });
    }

    const newId = await insertPassenger({
      first_name,
      last_name,
      passport_number,
      seat,
      checked_in,
      flight_numbers: [flight_number],
      photo_url
    });

    return {
      status: 'success',
      newId
    };
  }
};
