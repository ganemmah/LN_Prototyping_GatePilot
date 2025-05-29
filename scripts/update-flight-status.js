// scripts/update-flight-status.js
import dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import { MongoClient } from 'mongodb';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

const ZONE = 'Europe/Zurich';
const URI  = process.env.DB_URI;

if (!URI) {
  console.error('❌ DB_URI ist nicht definiert. Bitte .env prüfen.');
  process.exit(1);
}

async function updateStatuses() {
  const client = new MongoClient(URI);
  await client.connect();

  console.log('⚙️ Connected to', client.db().databaseName, '→ flights');
  const col     = client.db('airportDB').collection('flights');
  const flights = await col.find({}).toArray();
  console.log(`🔍 Found ${flights.length} flights`);

  const now = dayjs().tz(ZONE);
  const ops = [];

  for (const f of flights) {
    // 1) Erzeuge heutige Dep/Arr Datetime
    const today = now.format('YYYY-MM-DD');
    let dep      = dayjs(`${today}T${f.scheduled_departure}:00`).tz(ZONE);
    let arr      = dayjs(`${today}T${f.scheduled_arrival}:00`).tz(ZONE);
    if (arr.isBefore(dep)) arr = arr.add(1, 'day');
    const nextDep = dep.add(1, 'day');

    // 2) Zeit-Punkte definieren
    const gateOpenStart   = dep.subtract(2, 'hour');
    const boardingStart   = dep.subtract(1, 'hour');
    const finalCallStart  = dep.subtract(30, 'minute');
    const gateClosedStart = dep.subtract(10, 'minute');
    const departedTime    = dep;
    const taxiTime        = dep.add(5, 'minute');
    const enrouteTime     = dep.add(10, 'minute');
    const arrivalTime     = arr;
    const nextGateOpen    = nextDep.subtract(2, 'hour');

    // 3) Status-Logik
    let target = f.status;
    if (now.isBefore(gateOpenStart)) {
      target = 'Scheduled';
    } else if (now.isBetween(gateOpenStart, boardingStart, null, '[)')) {
      target = 'Gate Open';
    } else if (now.isBetween(boardingStart, finalCallStart, null, '[)')) {
      target = 'Boarding';
    } else if (now.isBetween(finalCallStart, gateClosedStart, null, '[)')) {
      target = 'Final Call';
    } else if (now.isBetween(gateClosedStart, departedTime, null, '[)')) {
      target = 'Gate Closed';
    } else if (now.isBetween(departedTime, taxiTime, null, '[)')) {
      target = 'Departed';
    } else if (now.isBetween(taxiTime, enrouteTime, null, '[)')) {
      target = 'Taxiing to Runway';
    } else if (now.isBetween(enrouteTime, arrivalTime, null, '[)')) {
      target = 'En Route';
    } else if (now.isBefore(arrivalTime.add(1, 'minute'))) {
      target = 'Landed';
    } else if (now.isAfter(nextGateOpen)) {
      target = 'Gate Open';
    }

    // 4) Nur bei Abweichung updaten
    if (target !== f.status) {
      ops.push(
        col.updateOne(
          { _id: f._id },
          { $set: { status: target } }
        ).then(res => {
          if (res.modifiedCount) {
            console.log(` ↪ [${f.flight_number}] ${f.status} → ${target}`);
          }
        })
      );
    }
  }

  // 5) Updates ausführen
  if (ops.length) {
    await Promise.all(ops);
    console.log(`✅ ${ops.length} flight(s) updated at ${now.format()}\n`);
  } else {
    console.log(`ℹ️  No changes at ${now.format()}\n`);
  }

  await client.close();
}

// Cronjob: jede Minute
cron.schedule('* * * * *', () => {
  console.log('🔄 Running update at', dayjs().tz(ZONE).format());
  updateStatuses().catch(err => console.error('❌', err));
});
